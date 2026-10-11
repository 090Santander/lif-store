import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import { AuthProvider } from './context/AuthContext.tsx'
import { CarritoProvider } from './context/CarritoContext.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <HashRouter>
    <AuthProvider>
      <CarritoProvider>
        <App />
        </CarritoProvider>
    </AuthProvider>
  </HashRouter>
  </StrictMode>,
)