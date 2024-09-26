import React from 'react';
import { Link } from 'react-router-dom';

export const PrimerComponente = () => {
  return (
    <div className='sidebar'>
      <h2>HOTEL GARRAX</h2>
      <ul>
        <li><Link to="/recepcion">Recepción</Link></li>
        <li><Link to="/salida">Salida</Link></li>
        <li><Link to="/configuracion">Configuración</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>
      </ul>
    </div>
  );
}
