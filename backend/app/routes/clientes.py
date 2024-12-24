from flask import render_template, Blueprint, request, jsonify
from db import db
from app.models import Habitacion, Piso, Cliente
from flask_cors import CORS

clientes_bp = Blueprint('clientes_bp', __name__)

@clientes_bp.route('/api/clientes', methods=['GET'])
def get_clientes():
    clientes = Cliente.query.all()
    clientes_data = [
        {
            'id_cliente': cliente.id_cliente,
            'nombre': cliente.nombre,
            'apellido': cliente.apellido,
            'DNI': cliente.DNI,
            'direccion': cliente.direccion,
            'telefono': cliente.telefono,
            'email': cliente.email,
            'razon': cliente.razon,
            'fecha_hora_ingreso': cliente.fecha_hora_ingreso.strftime('%Y-%m-%d %H:%M:%S'),  # Convertir a formato string
            'id_hab_corresp': cliente.id_hab_corresp,
            'habitacion': cliente.habitacion.nombre if cliente.habitacion else 'No asignada'  # Si existe la relación
        }
        for cliente in clientes
    ]
    return jsonify(clientes_data)
