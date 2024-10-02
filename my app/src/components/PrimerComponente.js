import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const PrimerComponente = () => {
  const location = useLocation();  // Obtiene la ubicación actual

  return (
    <div className='sidebar'>
      <h2>HOTEL GARRAX</h2>
      <ul>
        <li><Link to="/recepcion">Recepción</Link></li>
        <li><Link to="/salida">Salida</Link></li>
        <li><Link to="/configuracion">Configuración</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>
        {location.pathname === '/clientes' && (  // Muestra "Cargar Usuarios" solo si estás en la página de Clientes
          <li><Link to="/registrar-cliente">Cargar Usuarios</Link></li>
        )}
      </ul>
    </div>
  );
}
