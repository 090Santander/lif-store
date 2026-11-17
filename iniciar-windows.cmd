@echo off
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0iniciar-windows.ps1" %*
if errorlevel 1 (
  echo.
  echo Revisa el error anterior. No se eliminaron los datos de la base.
  pause
  exit /b 1
)
