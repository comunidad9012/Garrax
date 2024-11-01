from flask import Blueprint, request, jsonify
from app.models import Cliente
from db import db

listaclientes_bp = Blueprint('listaclientes_bp', __name__)

@listaclientes_bp.route('/api/listaclientes', methods=['GET'])
def obtener_clientes():
    clientes=db.session.query(Cliente).all()
    clientes_lista=[
        {"id_cliente":h.id_cliente,
        "DNI":h.DNI,
        "nombre":h.nombre,
        "direccion":h.direccion,
        "telefono":h.telefono,
        "email":h.email,
        }
        for h in clientes
    ]
    return jsonify({"clientes":clientes_lista})


