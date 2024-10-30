import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const PrimerComponente = () => {
  const [subMenuVisible, setSubMenuVisible] = useState(false);

  

  return (
    <div className='sidebar'>
      <h2>HOTEL GARRAX</h2>
      <ul>
        <li><Link to="/recepcion">Recepción</Link></li>
        <li><Link to="/salida">Salida</Link></li>
        
        <li>
        <button className={`config-button ${subMenuVisible ? 'active' : ''}`} onClick={() => setSubMenuVisible(!subMenuVisible)}>
            Configuración <span className="icono-flecha">&#9660;</span>
          </button>
          
          {subMenuVisible && (
            <ul className="submenu">
              <li><Link to="/habitaciones">▷ Habitaciones</Link></li>
              <li><Link to="/pisos">▷ Pisos</Link></li>
            </ul>
          )}
        </li>
        
        <li><Link to="/clientes">Clientes</Link></li>
      </ul>
    </div>
  );
};
