import React, { useEffect, useState } from 'react';

export const Recepcion = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [pisos, setPisos] = useState([]);
    const [pisoSeleccionado, setPisoSeleccionado] = useState(null);

    useEffect(() => {
        // Hacer una solicitud a la API
        fetch('/api/habitaciones')
            .then(response => response.json())
            .then(data => {
                setHabitaciones(data.habitaciones);
                setPisos(data.pisos);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const habitacionesFiltradas = pisoSeleccionado 
        ? habitaciones.filter(habitacion => habitacion.numero_habitacion.startsWith(pisoSeleccionado.toString())) 
        : [];

    return (
        <div>
            <div className='pisos'>
                <ul className="nav nav-underline">
                    {pisos.length > 0 ? (
                        pisos.map(piso => (
                            <li className="nav-item" key={piso.id_piso}>
                                <a 
                                    className={`nav-link ${pisoSeleccionado === piso.numero_piso ? 'active' : ''}`} 
                                    href="#" 
                                    onClick={() => setPisoSeleccionado(piso.numero_piso)}
                                >
                                    Piso {piso.numero_piso}
                                </a>
                            </li>
                        ))
                    ) : (
                        <p>No hay pisos disponibles.</p>
                    )}
                </ul>
            </div>
            
            <h1 className='titulo'>Lista de Habitaciones</h1>
            
            <div className='recepcion'>
                {pisoSeleccionado ? (
                    habitacionesFiltradas.length > 0 ? (
                        habitacionesFiltradas.map(habitacion => (
                            <div className="card mb-3 card-fixed" key={habitacion.id_habitacion}>
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
                        <p>No hay habitaciones disponibles en este piso.</p>
                    )
                ) : (
                    <p>Para ver las habitaciones disponibles, seleccione un piso.</p>
                )}
            </div>
        </div>
    );
};
