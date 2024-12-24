from flask import Blueprint, request, jsonify
from db import db
from app.models import Habitacion, Piso
from flask_cors import CORS

agregarpiso_bp = Blueprint('agregarpiso_bp', __name__)

@agregarpiso_bp.route('/api/agregarpiso', methods=['POST'])
def agregar_piso():
    data = request.json
    numero_piso = data.get('numero_piso')

    if not numero_piso:
        return jsonify({"error": "El número de piso es obligatorio"}), 400

    # Crear y guardar el nuevo piso en la base de datos
    nuevo_piso = Piso(numero_piso=numero_piso)
    db.session.add(nuevo_piso)
    db.session.commit()

    return jsonify({"message": "Piso agregado exitosamente"}), 201