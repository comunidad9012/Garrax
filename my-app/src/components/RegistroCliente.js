import React, { useState } from 'react';
import axios from 'axios';

const RegistroCliente = () => {
  const [formData, setFormData] = useState({
    DNI: '',
    nombre: '',
    direccion: '',
    telefono: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/clientes', formData);
      alert(response.data.message); // Mostrar mensaje de éxito
      setFormData({
        DNI: '',
        nombre: '',
        direccion: '',
        telefono: '',
        email: ''
      });
    } catch (error) {
      console.error("Error registrando cliente:", error);
      alert("Hubo un error registrando el cliente.");
    }
  };

  return (
    <div>
      <h2>Registro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>DNI:</label>
          <input type="text" name="DNI" value={formData.DNI} onChange={handleChange} required />
        </div>
        <div>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div>
          <label>Dirección:</label>
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <button type="submit">Registrar Cliente</button>
      </form>
    </div>
  );
};

export default RegistroCliente;
