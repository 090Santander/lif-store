import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Pendiente from './pages/Pendiente'

const paginasPendientes = [
  { path: 'partidos', titulo: 'Partidos' },
  { path: 'posiciones', titulo: 'Posiciones' },
  { path: 'noticias', titulo: 'Noticias' },
  { path: 'complejos', titulo: 'Complejos' },
  { path: 'entradas', titulo: 'Entradas' },
  { path: 'actas', titulo: 'Actas' },
  { path: 'jugadores', titulo: 'Jugadores' },
  { path: 'contacto', titulo: 'Contacto' },
  { path: 'solicitud', titulo: 'Solicitud' },
  { path: 'admin', titulo: 'Admin' },
  { path: 'registro', titulo: 'Registro' },
  { path: 'login', titulo: 'Ingresar' },
  { path: 'perfil', titulo: 'Mi Perfil' },
  { path: 'carrito', titulo: 'Carrito' },
]

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {paginasPendientes.map((p) => (
          <Route key={p.path} path={p.path} element={<Pendiente titulo={p.titulo} />} />
        ))}
        <Route path="*" element={<Pendiente titulo="404 - Página no encontrada" />} />
      </Route>
    </Routes>
  )
}

export default App