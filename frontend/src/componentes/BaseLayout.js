// frontend/src/components/BaseLayout.js
import React from 'react';
import './BaseLayout.css'; // Importar el archivo de estilos

function BaseLayout({ children }) {
  return (
    <div>
      <div className="sidebar">
        <h2>HOTEL GARRAX</h2>
        <img src="/static/images/garras.jpg" alt="GARRAS" className="profile-image" />
        <ul>
          <li><a href="/recepcion">Recepción</a></li>
          <li><a href="#">Salida</a></li>
          <li><a href="#">Configuración</a></li>
          <li><a href="#">Clientes</a></li>
        </ul>
      </div>

      <main>
        {children} {/* Aquí irán las diferentes páginas */}
      </main>
    </div>
  );
}

export default BaseLayout;
