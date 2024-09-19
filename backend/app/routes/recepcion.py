from flask import render_template, Blueprint, request, jsonify
from db import db
from app.models import Habitacion, Piso

recepcion_bp=Blueprint('recepcion_bp', __name__)

@recepcion_bp.route('/recepcion')
def lista_habitaciones():
    habitaciones = db.session.query(Habitacion).all()  # Solo consulta la tabla Habitacion

    return render_template('recepcion.html', habitaciones=habitaciones)
