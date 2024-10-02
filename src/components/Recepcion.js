import React, { useEffect, useState } from 'react';

export const Recepcion = () => {
    const [habitaciones, setHabitaciones] = useState([]);

    useEffect(() => {
        // Hacer una solicitud a la API
        fetch('/api/habitaciones')
            .then(response => response.json())
            .then(data => setHabitaciones(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='recepcion'>
            <h1>Lista de Habitaciones</h1>
            
            {habitaciones.length > 0 ? (
                habitaciones.map(habitacion => (
                    <div className="card mb-3" style={{ maxWidth: '540px' }} key={habitacion.id_habitacion}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                {/* Aquí puedes agregar una imagen si lo deseas */}
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h2>{habitacion.numero_habitacion}</h2>
                                    <p>Tipo: {habitacion.tipo_habitacion}</p>
                                    <p>Precio por noche: {habitacion.precio_noche}</p>
                                    <p>Estado: {habitacion.estado}</p>
                                    <p>Descripción: {habitacion.descripcion}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay habitaciones disponibles.</p>
            )}
        </div>
    );
};

