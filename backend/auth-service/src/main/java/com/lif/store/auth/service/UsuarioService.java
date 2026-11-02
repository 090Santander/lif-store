package com.lif.store.auth.service;

import com.lif.store.auth.dto.AutenticacionResponse;
import com.lif.store.auth.dto.LoginRequest;
import com.lif.store.auth.dto.RegistroUsuarioRequest;
import com.lif.store.auth.dto.UsuarioResponse;
import com.lif.store.auth.model.RolUsuario;
import com.lif.store.auth.model.Usuario;
import com.lif.store.auth.repository.UsuarioRepository;
import com.lif.store.shared.security.JwtTokenService;
import com.lif.store.shared.web.ApiException;
import com.lif.store.shared.web.ConflictException;
import com.lif.store.shared.web.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;

@Service
@Transactional
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;

    public UsuarioService(UsuarioRepository usuarioRepository,
                          PasswordEncoder passwordEncoder,
                          JwtTokenService jwtTokenService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenService = jwtTokenService;
    }

    public AutenticacionResponse registrar(RegistroUsuarioRequest request) {
        String correo = normalizarCorreo(request.correo());
        String run = normalizarRun(request.run());
        if (usuarioRepository.existsByCorreoIgnoreCase(correo)) {
            throw new ConflictException("Ya existe una cuenta con ese correo.");
        }
        if (usuarioRepository.existsByRun(run)) {
            throw new ConflictException("Ya existe una cuenta con ese RUN.");
        }

        Usuario usuario = new Usuario(run, correo, request.nombre().trim(), request.apellidos().trim(),
                passwordEncoder.encode(request.clave()), RolUsuario.USUARIO);
        Usuario guardado = usuarioRepository.save(usuario);
        return crearRespuestaAutenticacion(guardado);
    }

    @Transactional(readOnly = true)
    public AutenticacionResponse iniciarSesion(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByCorreoIgnoreCase(normalizarCorreo(request.correo()))
                .filter(Usuario::isActivo)
                .filter(cuenta -> passwordEncoder.matches(request.clave(), cuenta.getPasswordHash()))
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Correo o contraseña incorrectos."));
        return crearRespuestaAutenticacion(usuario);
    }

    @Transactional(readOnly = true)
    public UsuarioResponse obtenerPorCorreo(String correo) {
        return usuarioRepository.findByCorreoIgnoreCase(normalizarCorreo(correo))
                .map(this::aResponse)
                .orElseThrow(() -> new NotFoundException("No se encontró el usuario."));
    }

    @Transactional(readOnly = true)
    public UsuarioResponse obtenerPorId(Long id) {
        return usuarioRepository.findById(id)
                .map(this::aResponse)
                .orElseThrow(() -> new NotFoundException("No se encontró el usuario."));
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponse> listar() {
        return usuarioRepository.findAll().stream().map(this::aResponse).toList();
    }

    public Usuario crearAdministradorSiNoExiste(String correo, String clave) {
        String email = normalizarCorreo(correo);
        return usuarioRepository.findByCorreoIgnoreCase(email).orElseGet(() ->
                usuarioRepository.save(new Usuario(null, email, "Administrador", "LIF",
                        passwordEncoder.encode(clave), RolUsuario.ADMIN)));
    }

    private AutenticacionResponse crearRespuestaAutenticacion(Usuario usuario) {
        String nombreCompleto = (usuario.getNombre() + " " + usuario.getApellidos()).trim();
        JwtTokenService.IssuedToken token = jwtTokenService.issue(
                usuario.getCorreo(), nombreCompleto, usuario.getRol().name());
        return new AutenticacionResponse(token.value(), "Bearer", token.expiresAt(), aResponse(usuario));
    }

    private UsuarioResponse aResponse(Usuario usuario) {
        String rol = usuario.getRol() == RolUsuario.ADMIN ? "admin" : "usuario";
        return new UsuarioResponse(usuario.getId(), usuario.getRun(), usuario.getCorreo(),
                usuario.getNombre(), usuario.getApellidos(), rol, usuario.getCreadoEn());
    }

    private String normalizarCorreo(String correo) {
        return correo.trim().toLowerCase(Locale.ROOT);
    }

    private String normalizarRun(String run) {
        return run.replaceAll("[.\\-\\s]", "").toUpperCase(Locale.ROOT);
    }
}
