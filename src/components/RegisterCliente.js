import React, { useState } from 'react';
import axios from 'axios';  // Importa axios para hacer solicitudes HTTP
import './RegisterCliente.css';

export const RegisterCliente = () => {  // Exportación con nombre
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [dni, setDni] = useState('');
  const [apellido, setApellido] = useState('');   // Estado para DNI
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register_cliente', {
        nombre,
        email,
        telefono,
        direccion,
        dni,
        apellido
      });

      if (response.status === 200) {
        setMessage('Cliente registrado exitosamente!');
      }
    } catch (error) {
      setMessage('Error al registrar el cliente.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Registrar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        <input
          type="text"
          placeholder="DNI"  // Campo DNI en mayúsculas
          value={dni}
          onChange={(e) => setDni(e.target.value)}  // Captura el valor del DNI
          required
        />
        <button type="submit">Registrar Cliente</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
