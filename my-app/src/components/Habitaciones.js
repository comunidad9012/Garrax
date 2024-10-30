import React, { useEffect, useState } from 'react';

export const Habitaciones = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    useEffect(() => {
        // Hacer una solicitud a la API
        fetch('/api/habitaciones')
            .then(response => response.json())
            .then(data => {
                setHabitaciones(data.habitaciones);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Calcular habitaciones actuales según la página
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = habitaciones.slice(indexOfFirstItem, indexOfLastItem);

    // Funciones de paginación
    const totalPages = Math.ceil(habitaciones.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Funciones CRUD (deben integrarse con la API para hacer solicitudes reales)
    const handleEdit = (id) => {
        // Lógica para editar habitación por `id`
        console.log(`Editar habitación con id: ${id}`);
    };

    const handleDelete = (id) => {
        // Lógica para eliminar habitación por `id`
        console.log(`Eliminar habitación con id: ${id}`);
    };

    return (
        <div>
            <h1>Habitaciones</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Número de Habitación</th>
                        <th>Tipo</th>
                        <th>Precio por Noche</th>
                        <th>Estado</th>
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
                                <td>{habitacion.precio_noche}</td>
                                <td>{habitacion.estado}</td>
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
                            <td colSpan="6">No hay habitaciones disponibles.</td>
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
        </div>
    );
};

