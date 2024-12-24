import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const AgregarHab = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    numero_habitacion: '',
    tipo_habitacion: '',
    capacidad: '',
    precio_noche: '',
    estado: 'Disponible',  // Solo estado disponible
    descripcion: '',
    piso: '' 
  });

  const [successMessage, setSuccessMessage] = useState(false);
  const [pisos, setPisos] = useState([]);  // Para almacenar los pisos obtenidos desde el backend

  // Obtener habitaciones y pisos desde el backend
  useEffect(() => {
    fetch('/api/habitaciones')
      .then(response => response.json())
      .then(data => {
        // Almacenar los pisos y habitaciones en el estado
        setPisos(data.pisos);
        // Si deseas también usar las habitaciones, puedes almacenarlas aquí.
      })
      .catch(error => console.error('Error al obtener habitaciones y pisos:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('/api/agregarhab', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        setSuccessMessage(true); // Mostrar mensaje de éxito
        onSave(formData); // Actualizar el componente padre con los nuevos datos
      } else {
        console.error('Error al guardar la habitación.');
      }
    })
    .catch(error => console.error('Error de red:', error));
  };

  // Maneja el clic en "Aceptar" para cerrar el modal
  const handleAccept = () => {
    setSuccessMessage(false);  // Ocultar el mensaje de éxito
    onClose();                 // Cerrar el modal
    window.location.reload();  // Recargar la página
  };

  return (
    <>
      <div className="modal-overlay d-flex align-items-center justify-content-center">
        <div className="modal-content p-4 bg-white rounded shadow-lg" style={{ width: '500px' }}>
          <h2 className="text-center mb-4">Agregar Nueva Habitación</h2>
          {!successMessage ? (
            <form onSubmit={handleSubmit}>
              {/* Formulario completo para agregar habitación */}
              <div className="form-group mb-3">
                <label htmlFor="numero_habitacion" className="form-label">Número de Habitación</label>
                <input
                  type="text"
                  className="form-control"
                  name="numero_habitacion"
                  id="numero_habitacion"
                  placeholder="Ingrese el número de habitación"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Tipo de Habitación */}
              <div className="form-group mb-3">
                <label htmlFor="tipo_habitacion" className="form-label">Tipo de Habitación</label>
                <input
                  type="text"
                  className="form-control"
                  name="tipo_habitacion"
                  id="tipo_habitacion"
                  placeholder="Ej. Individual, Doble, Suite"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Capacidad */}
              <div className="form-group mb-3">
                <label htmlFor="capacidad" className="form-label">Capacidad</label>
                <input
                  type="number"
                  className="form-control"
                  name="capacidad"
                  id="capacidad"
                  placeholder="Ingrese la capacidad de personas en la habitación"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Precio por Noche */}
              <div className="form-group mb-3">
                <label htmlFor="precio_noche" className="form-label">Precio por Noche</label>
                <input
                  type="number"
                  className="form-control"
                  name="precio_noche"
                  id="precio_noche"
                  placeholder="Ingrese el precio por noche"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Estado */}
              <div className="form-group mb-3">
                <label htmlFor="estado" className="form-label">Estado</label>
                <input
                  type="text"
                  className="form-control"
                  name="estado"
                  id="estado"
                  value="Disponible"  // Solo puede ser "Disponible"
                  readOnly
                  required
                />
              </div>

              {/* Piso */}
              <div className="form-group mb-3">
                <label htmlFor="piso" className="form-label">Piso</label>
                <select
                  className="form-select"
                  name="piso"
                  id="piso"
                  onChange={handleChange}
                  required
                >
                  <option value="" selected disabled>Seleccione un Piso</option>
                  {pisos.map((piso, index) => (
                    <option key={index} value={piso.id_piso}>{piso.numero_piso}</option>  // El valor es el ID del piso
                  ))}
                </select>
              </div>

              {/* Descripción */}
              <div className="form-group mb-4">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  name="descripcion"
                  id="descripcion"
                  rows="3"
                  placeholder="Ingrese una descripción opcional"
                  onChange={handleChange}
                />
              </div>

              {/* Botones */}
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary me-2" onClick={onClose}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar</button>
              </div>
            </form>
          ) : (
            <div className="alert alert-success text-center">
              <p>Habitación registrada exitosamente</p>
              <button onClick={handleAccept} className="btn btn-primary">Aceptar</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
