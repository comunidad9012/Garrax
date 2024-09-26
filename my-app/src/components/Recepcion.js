import React, {useEffect, useState} from 'react'

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
                    <div key={habitacion.id_habitacion}> 
                        <h2>{habitacion.numero_habitacion}</h2>
                        <p>Tipo: {habitacion.tipo_habitacion}</p>
                    </div>
                ))
            ) : (
                <p>No hay habitaciones disponibles.</p>
            )}
        </div>
    );
};
