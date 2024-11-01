from flask import Blueprint, request, jsonify
from app.models import Cliente
from db import db

# Corregir el nombre de __name__
clientes_bp = Blueprint('clientes', __name__)

@clientes_bp.route('/api/clientes', methods=['POST'])
def registrar_cliente():
    data = request.get_json()
    try:
        # Crear un nuevo cliente
        nuevo_cliente = Cliente(
            DNI=data['DNI'],
            nombre=data['nombre'],
            direccion=data['direccion'],
            telefono=data['telefono'],
            email=data['email']
        )
        # Agregar y confirmar cambios en la sesión de la base de datos
        db.session.add(nuevo_cliente)
        db.session.commit()
        return jsonify({"message": "Cliente registrado exitosamente"}), 201
    except Exception as e:
        # En caso de error, revertir los cambios y mostrar el error
        db.session.rollback()
        return jsonify({"message": "Error al registrar el cliente", "error": str(e)}), 500