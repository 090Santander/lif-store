// La URL de Vite se publica en el JavaScript del navegador; no es un secreto.
const raw = (process.env.VITE_API_URL || '').trim();
if (!raw) {
  console.warn('::warning::VITE_API_URL no esta configurada: Pages publicara la interfaz, pero el login necesita una API publica HTTPS.');
} else {
  let url;
  try { url = new URL(raw); } catch { throw new Error('VITE_API_URL debe ser una URL absoluta HTTPS.'); }
  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (host.endsWith('.github.io')) {
    throw new Error('VITE_API_URL apunta a GitHub Pages, que es el frontend. Configura la URL publica HTTPS del API Gateway.');
  }
  const ipv4 = host.split('.').map(Number);
  const privateV4 = ipv4.length === 4 && ipv4.every(n => Number.isInteger(n) && n >= 0 && n <= 255) &&
    (ipv4[0] === 0 || ipv4[0] === 10 || ipv4[0] === 127 ||
     (ipv4[0] === 192 && ipv4[1] === 168) || (ipv4[0] === 169 && ipv4[1] === 254) ||
     (ipv4[0] === 172 && ipv4[1] >= 16 && ipv4[1] <= 31));
  const privateV6 = host === '::' || host === '::1' || /^(fc|fd)[0-9a-f]{2}:|^fe[89ab][0-9a-f]:/i.test(host);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || privateV4 || privateV6 ||
      host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local')) {
    throw new Error('VITE_API_URL para Pages debe apuntar a una API publica HTTPS sin credenciales ni parametros. No uses localhost ni la IP privada de tu PC.');
  }
  console.log('Configuracion de API publica validada. Revisa que el backend permita el origen de Pages mediante CORS.');
}
