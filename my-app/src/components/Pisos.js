import React, { useEffect, useState } from 'react';
import { AgregarPiso } from './AgregarPiso';

export const Pisos = () => {
    const [pisos, setPisos] = useState([]);
    const [isFormVisible, setFormVisible] = useState(false);

    useEffect(() => {
        // Solicitar datos desde la API existente
        fetch('/api/habitaciones') // Misma ruta
            .then(response => response.json())
            .then(data => {
                setPisos(data.pisos); // Usar solo la parte de pisos del JSON
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Funciones CRUD (pueden conectarse con tu API para acciones reales)
    const handleEdit = (id) => {
        console.log(`Editar piso con id: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Eliminar piso con id: ${id}`);
    };

    return (
        <div>
            <h1>Pisos</h1>
            
            <button className="btn-agregar" onClick={() => setFormVisible(true)}>
                <i className="bi bi-plus"></i> + Agregar nuevo piso
            </button>
            
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Número de Piso</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pisos.length > 0 ? (
                        pisos.map((piso) => (
                            <tr key={piso.id_piso}>
                                <td>{piso.id_piso}</td>
                                <td>{piso.numero_piso}</td>
                                <td>
                                    <button
                                        className="btn-edit"
                                        onClick={() => handleEdit(piso.id_piso)}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => handleDelete(piso.id_piso)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No hay pisos disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* Renderizar el formulario como ventana emergente */}
            {isFormVisible && (
                <AgregarPiso 
                    onClose={() => setFormVisible(false)} 
                />
            )}
        </div>
    );
};
