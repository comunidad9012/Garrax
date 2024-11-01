import React, { useEffect, useState } from 'react';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch('api/listaclientes')
        .then(response=>response.json())
        .then(data=>{setClientes(data.clientes);})
        .catch(error => console.error('Error fetching data:', error));
    },[]);

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Telefono</th>
            <th>Dirección</th>
            <th>Email</th>
            {/* Agrega otros encabezados según los campos */}
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id_cliente}>
              <td>{cliente.id_cliente}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.DNI}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.direccion}</td>
              <td>{cliente.email}</td>
              {/* Agrega otras columnas según los campos */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaClientes;
