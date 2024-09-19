import React from 'react';
import BaseLayout from './BaseLayout';


export const Recepcion = ({ habitaciones }) => {
  return (
    <BaseLayout>
      <h1>Recepción</h1>
      <h1>Lista de Habitaciones</h1>

      {habitaciones && habitaciones.length > 0 ? (
        habitaciones.map((habitacion, index) => (
          <div className="card mb-3" style={{ maxWidth: "540px" }} key={index}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src="" className="img-fluid rounded-start" alt="Imagen de la habitación" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{habitacion.numero_habitacion}</h5>
                  <p className="card-text">Tipo de habitación: {habitacion.tipo_habitacion}</p>
                  <h5 className="card-title">{habitacion.estado}</h5>
                  <p className="card-text">
                    <small className="text-body-secondary">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay habitaciones disponibles.</p>
      )}
    </BaseLayout>
  );
};
export default Recepcion;