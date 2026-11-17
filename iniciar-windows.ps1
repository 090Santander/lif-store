param([switch]$InstalarDependencias)
$ErrorActionPreference = 'Stop'
$Root = $PSScriptRoot
$BackendEnv = Join-Path $Root 'backend/.env'
$Frontend = Join-Path $Root 'frontend'
$ComposeArgs = @('compose', '-p', 'lif-semestral', '--env-file', $BackendEnv, '-f', (Join-Path $Root 'backend/docker-compose.yml'))

function New-LocalSecret {
    $bytes = New-Object byte[] 32
    $rng = [Security.Cryptography.RandomNumberGenerator]::Create()
    try { $rng.GetBytes($bytes) } finally { $rng.Dispose() }
    return ([BitConverter]::ToString($bytes)).Replace('-', '').ToLowerInvariant()
}
function Read-LocalSetting([string]$Content, [string]$Name) {
    $match = [regex]::Match($Content, '(?m)^\s*' + [regex]::Escape($Name) + '\s*=(.*)\r?$')
    return $match.Groups[1].Value.Trim().Trim([char[]]@([char]34, [char]39))
}
try {
    foreach ($command in @('docker', 'node', 'npm.cmd')) {
        if (-not (Get-Command $command -ErrorAction SilentlyContinue)) {
            throw "Falta $command. Instala Docker Desktop y Node.js LTS; abre una ventana nueva."
        }
    }
    $nodeVersion = [version]((& node --version).Trim().TrimStart('v'))
    if ($nodeVersion -lt [version]'20.19.0' -or $nodeVersion.Major -eq 21 -or ($nodeVersion.Major -eq 22 -and $nodeVersion -lt [version]'22.12.0')) {
        throw 'Node.js incompatible. Instala Node.js LTS 22.12+ o posterior compatible.'
    }
    docker compose version | Out-Null
    if ($LASTEXITCODE -ne 0) { throw 'Falta Docker Compose v2.' }
    # PowerShell 5.1 puede tratar stderr nativo como error terminante.
    $ErrorActionPreference = 'Continue'
    $dockerType = & docker info --format '{{.OSType}}' 2>$null
    $dockerExit = $LASTEXITCODE
    $ErrorActionPreference = 'Stop'
    if ($dockerExit -ne 0) { throw 'Abre Docker Desktop, espera a que este listo y vuelve a iniciar.' }
    if ($dockerType -ne 'linux') { throw 'Selecciona contenedores Linux en Docker Desktop.' }

    if (-not (Test-Path -LiteralPath $BackendEnv)) {
        $ErrorActionPreference = 'Continue'
        & docker volume inspect --format '{{.Name}}' lif-semestral_lif_mysql_data 2>$null | Out-Null
        $volumeExists = $LASTEXITCODE -eq 0
        $ErrorActionPreference = 'Stop'
        if ($volumeExists) { throw 'Ya existe una base local. Recupera su backend/.env original antes de iniciar; no se generaron credenciales nuevas.' }
        $content = [IO.File]::ReadAllText((Join-Path $Root 'backend/.env.example'))
        $settings = @{
            MYSQL_ROOT_PASSWORD = (New-LocalSecret)
            LIF_DB_PASSWORD = (New-LocalSecret)
            JWT_SECRET = (New-LocalSecret)
            LIF_ADMIN_EMAIL = 'admin@lif.local'
            LIF_ADMIN_PASSWORD = (New-LocalSecret)
        }
        foreach ($name in $settings.Keys) {
            $pattern = '(?m)^' + [regex]::Escape($name) + '=.*$'
            if (-not [regex]::IsMatch($content, $pattern)) { throw "Falta $name en backend/.env.example." }
            $content = [regex]::Replace($content, $pattern, ($name + '=' + $settings[$name]))
        }
        # CreateNew evita reemplazar una configuracion creada en paralelo.
        $stream = [IO.File]::Open($BackendEnv, [IO.FileMode]::CreateNew)
        try {
            $bytes = [Text.UTF8Encoding]::new($false).GetBytes($content)
            $stream.Write($bytes, 0, $bytes.Length)
        } finally { $stream.Dispose() }
        Write-Host 'Configuracion local creada. Correo y clave de acceso: backend/.env (LIF_ADMIN_EMAIL y LIF_ADMIN_PASSWORD).'
    }
    $envContent = [IO.File]::ReadAllText($BackendEnv)
    foreach ($name in @('MYSQL_ROOT_PASSWORD', 'LIF_DB_PASSWORD', 'JWT_SECRET', 'LIF_ADMIN_EMAIL', 'LIF_ADMIN_PASSWORD')) {
        $value = Read-LocalSetting $envContent $name
        if (-not $value -or $value -match '^(cambia|pon-aqui)') { throw "Completa $name en backend/.env." }
    }
    if ([Text.Encoding]::UTF8.GetByteCount((Read-LocalSetting $envContent 'JWT_SECRET')) -lt 32) {
        throw 'JWT_SECRET debe tener al menos 32 bytes. Revisa backend/.env.'
    }
    $frontendEnv = Join-Path $Frontend '.env.local'
    if (-not (Test-Path -LiteralPath $frontendEnv)) { Copy-Item -LiteralPath (Join-Path $Frontend '.env.example') -Destination $frontendEnv }
    if (Get-Command Get-NetTCPConnection -ErrorAction SilentlyContinue) {
        if (Get-NetTCPConnection -State Listen -LocalPort 5173 -ErrorAction SilentlyContinue) {
            throw 'El puerto 5173 esta ocupado. Cierra la otra instancia de Vite y vuelve a iniciar.'
        }
    }
    & docker @ComposeArgs config --quiet
    if ($LASTEXITCODE -ne 0) { throw 'La configuracion de Docker no es valida.' }
    & docker @ComposeArgs up --build -d
    if ($LASTEXITCODE -ne 0) { throw 'El backend no pudo iniciar. Revisa el error de Docker; no borres los volumenes.' }
    Write-Host 'Esperando los servicios Java (hasta 3 minutos)...'
    $deadline = [DateTime]::UtcNow.AddMinutes(3)
    $ready = $false
    do {
        $ready = $true
        foreach ($port in @(8080, 8081, 8082, 8083, 8084)) {
            try {
                $health = Invoke-RestMethod -Uri "http://localhost:$port/actuator/health" -TimeoutSec 3
                if ($health.status -ne 'UP') { $ready = $false }
            } catch { $ready = $false }
        }
        if (-not $ready) { Start-Sleep -Seconds 2 }
    } while (-not $ready -and [DateTime]::UtcNow -lt $deadline)
    if (-not $ready) {
        & docker @ComposeArgs ps
        throw 'Un servicio no esta listo. Revisa los registros con el comando indicado en INICIO-WINDOWS.md.'
    }
    Push-Location $Frontend
    try {
        $lockHash = (Get-FileHash -LiteralPath 'package-lock.json' -Algorithm SHA256).Hash
        $stamp = Join-Path $Frontend 'node_modules/.lif-lock.sha256'
        $previousHash = if (Test-Path -LiteralPath $stamp) { (Get-Content -LiteralPath $stamp -Raw).Trim() } else { '' }
        if ($InstalarDependencias -or $previousHash -ne $lockHash -or -not (Test-Path 'node_modules/.bin/vite.cmd')) {
            & npm.cmd ci
            if ($LASTEXITCODE -ne 0) { throw 'No se pudieron instalar las dependencias del frontend.' }
            [IO.File]::WriteAllText($stamp, $lockHash)
        }
        Write-Host 'Backend listo. Abre http://localhost:5173/#/login cuando Vite indique ready.'
        Write-Host 'Mantiene esta ventana abierta. Ctrl+C detiene el frontend.'
        & npm.cmd run dev -- --port 5173 --strictPort
        if ($LASTEXITCODE -ne 0) { throw 'El frontend termino con error. Revisa la salida de Vite.' }
    } finally { Pop-Location }
} catch {
    Write-Host ('ERROR: ' + $_.Exception.Message) -ForegroundColor Red
    exit 1
}
