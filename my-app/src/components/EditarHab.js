import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const EditarHab = ({ habitacion, onClose, onSave }) => {
  const [formData, setFormData] = useState(habitacion);
  const [pisos, setPisos] = useState([]);  // Para almacenar los pisos obtenidos desde el backend

  // Obtener pisos desde el backend para el select
  useEffect(() => {
    fetch('/api/habitaciones')
      .then(response => response.json())
      .then(data => setPisos(data.pisos))
      .catch(error => console.error('Error al obtener pisos:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);  // Enviar los datos al componente padre
  };

  return (
    <div className="modal-overlay d-flex align-items-center justify-content-center">
      <div className="modal-content p-4 bg-white rounded shadow-lg" style={{ width: '500px' }}>
        <h2 className="text-center mb-4">Editar Habitación</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="numero_habitacion" className="form-label">Número de Habitación</label>
            <input
              type="text"
              className="form-control"
              name="numero_habitacion"
              id="numero_habitacion"
              value={formData.numero_habitacion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="tipo_habitacion" className="form-label">Tipo de Habitación</label>
            <input
              type="text"
              className="form-control"
              name="tipo_habitacion"
              id="tipo_habitacion"
              value={formData.tipo_habitacion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="capacidad" className="form-label">Capacidad</label>
            <input
              type="number"
              className="form-control"
              name="capacidad"
              id="capacidad"
              value={formData.capacidad}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="precio_noche" className="form-label">Precio por Noche</label>
            <input
              type="number"
              className="form-control"
              name="precio_noche"
              id="precio_noche"
              value={formData.precio_noche}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="estado" className="form-label">Estado</label>
            <input
              type="text"
              className="form-control"
              name="estado"
              id="estado"
              value={formData.estado}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="piso" className="form-label">Piso</label>
            <select
              className="form-select"
              name="piso"
              id="piso"
              value={formData.piso}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Seleccione un Piso</option>
              {pisos.map((piso, index) => (
                <option key={index} value={piso.id_piso}>{piso.numero_piso}</option>
              ))}
            </select>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea
              className="form-control"
              name="descripcion"
              id="descripcion"
              rows="3"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Guardar cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
};
