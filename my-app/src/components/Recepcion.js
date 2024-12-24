import React, { useEffect, useState } from 'react';

export const Recepcion = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [pisos, setPisos] = useState([]);
    const [pisoSeleccionado, setPisoSeleccionado] = useState(null);
    const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);
    const [clienteAsignado, setClienteAsignado] = useState(null);
    const [mensajeExito, setMensajeExito] = useState("");
    const [mensajeError, setMensajeError] = useState("");

    useEffect(() => {
        // Cargar habitaciones y pisos cuando el componente se monta
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
        : habitaciones;

    // Ordenar las habitaciones por número de habitación
    const habitacionesOrdenadas = habitacionesFiltradas.sort((a, b) => {
        return a.numero_habitacion - b.numero_habitacion;  // Asegura que se ordenen numéricamente
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const datosCliente = {
            nombre: e.target.nombre.value,
            apellido: e.target.apellido.value,
            dni: e.target.dni.value,
            direccion: e.target.direccion.value,
            telefono: e.target.telefono.value,
            email: e.target.email.value,
            razon: e.target.razon.value,
            fecha_hora_ingreso: e.target.fecha_hora_ingreso.value,
        };

        // Verificar si la habitación está ocupada antes de intentar asignarla
        if (habitacionSeleccionada.estado === 'Ocupada') {
            setMensajeError("La habitación ya está ocupada.");
            return;
        }

        fetch(`/api/asignarhab/${habitacionSeleccionada.id_habitacion}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosCliente),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setHabitaciones(prevHabitaciones =>
                        prevHabitaciones.map(h =>
                            h.id_habitacion === habitacionSeleccionada.id_habitacion
                                ? { ...h, estado: 'Ocupada' }
                                : h
                        )
                    );
                    setClienteAsignado({
                        ...datosCliente,
                        habitacion: habitacionSeleccionada.numero_habitacion,
                        tipo_habitacion: habitacionSeleccionada.tipo_habitacion,
                    });
                    setHabitacionSeleccionada(null);
                    setMensajeExito("Habitación registrada exitosamente!");
                    setMensajeError("");  // Limpiar el mensaje de error
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const finalizarAsignacion = () => {
        fetch(`/api/liberarhab/${habitacionSeleccionada.id_habitacion}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setHabitaciones(prevHabitaciones =>
                        prevHabitaciones.map(h =>
                            h.id_habitacion === habitacionSeleccionada.id_habitacion
                                ? { ...h, estado: 'Disponible' }
                                : h
                        )
                    );
                    setClienteAsignado(null);
                    setHabitacionSeleccionada(null); // Limpiar la selección de habitación
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const handleHabitacionSeleccionada = (habitacion) => {
        setHabitacionSeleccionada(habitacion);

        // Obtener los datos del cliente si la habitación está ocupada
        if (habitacion.estado === 'Ocupada') {
            fetch(`/api/cliente/${habitacion.id_habitacion}`)
                .then(response => response.json())
                .then(data => {
                    if (data.cliente) {
                        setClienteAsignado(data.cliente);
                    } else {
                        setClienteAsignado(null);
                    }
                })
                .catch(error => console.error('Error al obtener datos del cliente:', error));
        } else {
            setClienteAsignado(null); 
        }
    };

    const handleAccept = () => {
        setMensajeExito(""); // Limpiar mensaje de éxito
    };

    return (
        <div>
            <div className="pisos">
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
            
            <h1 className="titulo">Lista de Habitaciones</h1>
            
            <div className="recepcion">
                {mensajeExito && (
                    <div className="alert alert-success text-center">
                        <p>{mensajeExito}</p>
                        <button onClick={handleAccept} className="btn btn-primary">Aceptar</button>
                    </div>
                )}
                {mensajeError && (
                    <div className="mensaje-error">
                        <h3>{mensajeError}</h3>
                    </div>
                )}

                {/* Mostrar los datos del cliente asignado si la habitación está ocupada */}
                {clienteAsignado && habitacionSeleccionada && habitacionSeleccionada.estado === 'Ocupada' ? (
                    <div className="mensaje-asignacion">
                        <h2>Datos de habitación</h2>
                        <p><strong>Habitación:</strong> {clienteAsignado.habitacion}</p>
                        <p><strong>Tipo:</strong> {clienteAsignado.tipo_habitacion}</p>
                        <h2>Habitación asignada al Cliente:</h2>
                        <p><strong>Cliente:</strong> {clienteAsignado.nombre} {clienteAsignado.apellido}</p>
                        <p><strong>DNI:</strong> {clienteAsignado.dni}</p>
                        <p><strong>Teléfono:</strong> {clienteAsignado.telefono}</p>
                        <p><strong>Email:</strong> {clienteAsignado.email}</p>
                        <p><strong>Fecha de Ingreso:</strong> {clienteAsignado.fecha_hora_ingreso}</p>
                        <button onClick={finalizarAsignacion}>Finalizar Asignación</button>
                        <button onClick={() => setHabitacionSeleccionada(null)}>Cancelar</button>
                    </div>
                ) : habitacionSeleccionada ? (
                    <div className="formulario-asignacion">
                        <h2>Asignar habitación: {habitacionSeleccionada.numero_habitacion}</h2>
                        <p>Tipo: {habitacionSeleccionada.tipo_habitacion}</p>
                        <p>Precio por noche: {habitacionSeleccionada.precio_noche}</p>
                        <p>Estado: {habitacionSeleccionada.estado}</p>
                        <p>Descripción: {habitacionSeleccionada.descripcion}</p>

                        {habitacionSeleccionada.estado === 'Ocupada' ? (
                            <div>
                                <p>Esta habitación ya está ocupada por el siguiente cliente:</p>
                                <p><strong>Nombre:</strong> {clienteAsignado?.nombre} {clienteAsignado?.apellido}</p>
                                <p><strong>DNI:</strong> {clienteAsignado?.dni}</p>
                                <p><strong>Fecha de Ingreso:</strong> {clienteAsignado?.fecha_hora_ingreso}</p>
                                <button onClick={finalizarAsignacion}>Finalizar Asignación</button>
                                <button onClick={() => setHabitacionSeleccionada(null)} className="cancel-button">Cancelar</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="formulario-asignacion">
                                <h3>Datos del Cliente</h3>
                                <div>
                                    <label>Nombre</label>
                                    <input type="text" name="nombre" required />
                                </div>
                                <div>
                                    <label>Apellido</label>
                                    <input type="text" name="apellido" required />
                                </div>
                                <div>
                                    <label>DNI</label>
                                    <input type="text" name="dni" required />
                                </div>
                                <div>
                                    <label>Dirección</label>
                                    <input type="text" name="direccion" />
                                </div>
                                <div>
                                    <label>Teléfono</label>
                                    <input type="text" name="telefono" />
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input type="email" name="email" />
                                </div>
                                <div>
                                    <label>Razón</label>
                                    <input type="text" name="razon" />
                                </div>
                                <div>
                                    <label>Fecha y Hora de Ingreso</label>
                                    <input type="datetime-local" name="fecha_hora_ingreso" required />
                                </div>
                                <button type="submit">Asignar Habitación</button>
                                <button onClick={() => setHabitacionSeleccionada(null)} className="cancel-button">Cancelar</button>
                            </form>
                        )}
                    </div>
                ) : (
                    pisoSeleccionado ? (
                        habitacionesOrdenadas.map(habitacion => (
                            <div 
                                className="card mb-3 card-fixed" 
                                key={habitacion.id_habitacion} 
                                onClick={() => handleHabitacionSeleccionada(habitacion)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img 
                                            src={habitacion.estado === 'Disponible' 
                                                ? '/images/disponible.jpg' 
                                                : '/images/asignada.jpg'} 
                                            alt="Estado de la habitación" 
                                            className="img-fluid" 
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Habitación {habitacion.numero_habitacion}</h5>
                                            <p className="card-text">
                                                <strong>Tipo:</strong> {habitacion.tipo_habitacion}<br />
                                                <strong>Estado:</strong> {habitacion.estado}<br />
                                                <strong>Precio:</strong> {habitacion.precio_noche}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Seleccione un piso para ver las habitaciones.</p>
                    )
                )}
            </div>
        </div>
    );
};
