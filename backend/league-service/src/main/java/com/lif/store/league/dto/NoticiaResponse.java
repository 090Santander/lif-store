package com.lif.store.league.dto;

public record NoticiaResponse(Long id, String titulo, String categoria, String fecha, String resumen, boolean destacada) {
}
