from flask import render_template, Blueprint, request, jsonify
from db import db
from app.models import Habitacion, Piso
from flask_cors import CORS

recepcion_bp = Blueprint('recepcion_bp', __name__)

@recepcion_bp.route('/api/habitaciones')
def lista_habitaciones():
    habitaciones = db.session.query(Habitacion).all()  
    habitaciones_list = [
        {"id_habitacion": h.id_habitacion, "numero_habitacion": h.numero_habitacion, "tipo_habitacion": h.tipo_habitacion, "precio_noche": h.precio_noche, "estado": h.estado, "descripcion": h.descripcion}
        for h in habitaciones
    ]
      
    return jsonify(habitaciones_list)