import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const AgregarPiso = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    numero_piso: ''
  });

  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/agregarpiso', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        setSuccessMessage(true); // Mostrar mensaje de éxito
        onSave(formData); // Notificar al componente padre
      } else {
        console.error('Error al guardar el piso.');
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
        <div className="modal-content p-4 bg-white rounded shadow-lg" style={{ width: '400px' }}>
          <h2 className="text-center mb-4">Agregar Nuevo Piso</h2>
          {!successMessage ? (
            <form onSubmit={handleSubmit}>
              {/* Número de Piso */}
              <div className="form-group mb-3">
                <label htmlFor="numero_piso" className="form-label">Número de Piso</label>
                <input
                  type="number"
                  className="form-control"
                  name="numero_piso"
                  id="numero_piso"
                  placeholder="Ingrese el número del piso"
                  onChange={handleChange}
                  required
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
              <p>Piso registrado exitosamente</p>
              <button onClick={handleAccept} className="btn btn-primary">Aceptar</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
