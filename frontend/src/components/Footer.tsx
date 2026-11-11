import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="bg-dark-green text-white pt-5 pb-3 border-top border-success border-4 mt-auto">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-md-6 text-center text-md-start">
            <h4 className="fw-bold text-warning mb-3 fs-5">LIF Chile</h4>
            <p className="small text-white-50 pe-md-5">
              Promoviendo el fútbol amateur con estándares profesionales. Mantente al día con
              nuestro fixture y compra tus entradas de forma digital.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <h4 className="fw-bold mb-3 fs-5">Información</h4>
            <ul className="list-unstyled small d-flex flex-column gap-2 text-white-50">
              <li>📍 Complejo Deportivo Principal</li>
              <li>✉️ soporte@lifchile.cl</li>
              <li>
                <Link to="/contacto" className="text-success text-decoration-none fw-bold">
                  Contacto y Soporte
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center border-top border-secondary pt-3 extra-small text-white-50">
          <p className="mb-0">© 2026 LIF - Liga Independiente de Fútbol. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}