import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const PrimerComponente = () => {
  const [subMenuVisible, setSubMenuVisible] = useState(false);
  const [clientesMenuVisible, setClientesMenuVisible] = useState(false);

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
        
        <li>
          <button className={`config-button ${clientesMenuVisible ? 'active' : ''}`} onClick={() => setClientesMenuVisible(!clientesMenuVisible)}>
            Clientes <span className="icono-flecha">&#9660;</span>
          </button>

          {clientesMenuVisible && (
            <ul className="submenu">
              <li><Link to="/clientes">▷ Lista de Clientes</Link></li>
              <li><Link to="/registro">▷ Registrar Cliente</Link></li> {/* Enlace al registro */}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};