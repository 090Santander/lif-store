import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import RutaAdmin from './components/RutaAdmin'
import Home from './pages/Home'
import Partidos from './pages/Partidos'
import Posiciones from './pages/Posiciones'
import Noticias from './pages/Noticias'
import Jugadores from './pages/Jugadores'
import Entradas from './pages/Entradas'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Admin from './pages/Admin'
import Pendiente from './pages/Pendiente'
import Perfil from './pages/Perfil'
import Contacto from './pages/Contacto'
import Complejos from './pages/Complejos'
import Actas from './pages/Actas'

const paginasPendientes = [
  { path: 'solicitud', titulo: 'Solicitud' },
]

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="partidos" element={<Partidos />} />
        <Route path="posiciones" element={<Posiciones />} />
        <Route path="noticias" element={<Noticias />} />
        <Route path="jugadores" element={<Jugadores />} />
        <Route path="entradas" element={<Entradas />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="complejos" element={<Complejos />} />
        <Route path="actas" element={<Actas />} />
        <Route element={<RutaAdmin />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        {paginasPendientes.map((p) => (
          <Route key={p.path} path={p.path} element={<Pendiente titulo={p.titulo} />} />
        ))}
        <Route path="*" element={<Pendiente titulo="404 - Página no encontrada" />} />
      </Route>
    </Routes>
  )
}

export default App