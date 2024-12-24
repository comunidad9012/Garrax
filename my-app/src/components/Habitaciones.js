import React, { useEffect, useState } from 'react';
import { AgregarHab } from './AgregarHab';
import { EditarHab } from './EditarHab';

export const Habitaciones = () => {
    const [habitaciones, setHabitaciones] = useState([]); // Lista de habitaciones
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const itemsPerPage = 7; // Elementos por página
    const [isFormVisible, setFormVisible] = useState(false); // Mostrar formulario de agregar
    const [isEditFormVisible, setEditFormVisible] = useState(false); // Mostrar formulario de edición
    const [habitacionToEdit, setHabitacionToEdit] = useState(null); // Habitación a editar

    useEffect(() => {
        // Solicitud inicial para obtener las habitaciones
        fetch('/api/habitaciones')
            .then((response) => response.json())
            .then((data) => {
                setHabitaciones(data.habitaciones || []);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    // Cálculo de las habitaciones a mostrar según la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = habitaciones.slice(indexOfFirstItem, indexOfLastItem);

    // Total de páginas
    const totalPages = Math.ceil(habitaciones.length / itemsPerPage);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Manejar la edición de una habitación
    const handleEdit = (id) => {
        const habitacion = habitaciones.find((hab) => hab.id_habitacion === id);
        if (habitacion) {
            setHabitacionToEdit(habitacion);
            setEditFormVisible(true);
        } else {
            console.error('Habitación no encontrada:', id);
        }
    };

    // Manejar la eliminación de una habitación
    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta habitación?')) {
            fetch(`/api/habitaciones/${id}`, { method: 'DELETE' })
                .then((response) => {
                    if (response.ok) {
                        setHabitaciones((prev) => prev.filter((hab) => hab.id_habitacion !== id));
                        console.log('Habitación eliminada:', id);
                    } else {
                        console.error('Error al eliminar la habitación');
                    }
                })
                .catch((error) => console.error('Error al realizar la solicitud:', error));
        }
    };

    // Guardar los cambios de edición
    const handleSave = (editedHabitacion) => {
        fetch(`/api/editarhab/${editedHabitacion.id_habitacion}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedHabitacion),
        })
        .then((response) => {
            if (response.ok) {
                // Actualiza el estado de las habitaciones con los nuevos datos
                setHabitaciones((prev) =>
                    prev.map((hab) =>
                        hab.id_habitacion === editedHabitacion.id_habitacion ? editedHabitacion : hab
                    )
                );
                setEditFormVisible(false); // Cierra el formulario de edición
                console.log('Habitación actualizada exitosamente');
            } else {
                console.error('Error al actualizar la habitación');
            }
        })
        .catch((error) => console.error('Error al realizar la solicitud:', error));
    };

    return (
        <div>
            <h1>Habitaciones</h1>

            <button className="btn-agregar" onClick={() => setFormVisible(true)}>
                <i className="bi bi-plus"></i> + Agregar nueva habitación
            </button>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Número de Habitación</th>
                        <th>Tipo</th>
                        <th>Capacidad personas</th>
                        <th>Precio por Noche</th>
                        <th>Estado</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((habitacion) => (
                            <tr key={habitacion.id_habitacion}>
                                <td>{habitacion.id_habitacion}</td>
                                <td>{habitacion.numero_habitacion}</td>
                                <td>{habitacion.tipo_habitacion}</td>
                                <td>{habitacion.capacidad}</td>
                                <td>{habitacion.precio_noche}</td>
                                <td>{habitacion.estado}</td>
                                <td>{habitacion.descripcion}</td>
                                <td>
                                    <button
                                        className="btn-edit"
                                        onClick={() => handleEdit(habitacion.id_habitacion)}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => handleDelete(habitacion.id_habitacion)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No hay habitaciones disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={index + 1 === currentPage ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Formulario para agregar habitación */}
            {isFormVisible && (
                <AgregarHab
                    onClose={() => setFormVisible(false)}
                />
            )}

            {/* Formulario para editar habitación */}
            {isEditFormVisible && habitacionToEdit && (
                <EditarHab
                    habitacion={habitacionToEdit}
                    onClose={() => setEditFormVisible(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};
