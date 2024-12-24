from flask import Blueprint, request, jsonify
from db import db
from app.models import Habitacion, Piso
from flask_cors import CORS

agregarhab_bp = Blueprint('agregarhab_bp', __name__)

@agregarhab_bp.route('/api/agregarhab', methods=['POST'])
def agregar_habitacion():
    data = request.get_json()

    # Extraer los datos
    numero_habitacion = data.get('numero_habitacion')
    tipo_habitacion = data.get('tipo_habitacion')
    capacidad = data.get('capacidad')
    precio_noche = data.get('precio_noche')
    estado = data.get('estado')
    descripcion = data.get('descripcion', '')
    piso = data.get('piso')

    if not (numero_habitacion and tipo_habitacion and precio_noche and estado):
        return jsonify({'error': 'Todos los campos son obligatorios.'}), 400

    try:
        # Crear una nueva instancia de Habitacion
        nueva_habitacion = Habitacion(
            numero_habitacion=numero_habitacion,
            tipo_habitacion=tipo_habitacion,
            capacidad=capacidad,
            precio_noche=precio_noche,
            estado=estado,
            descripcion=descripcion,
            id_piso_corresp=piso  # Esto asume que `numero_piso` se refiere a un ID de piso válido
        )

        # Guardar la nueva habitación en la base de datos
        db.session.add(nueva_habitacion)
        db.session.commit()
        
        return jsonify({'success': 'Habitación agregada correctamente.'}), 201
    except Exception as e:
        db.session.rollback()  # Revertir cambios en caso de error
        print(e)
        return jsonify({'error': 'Error al guardar la habitación.'}), 500



@agregarhab_bp.route('/api/editarhab/<int:id_habitacion>', methods=['PUT'])
def editar_habitacion(id_habitacion):
    # Buscar la habitación por su ID
    habitacion = Habitacion.query.get(id_habitacion)
    
    if not habitacion:
        return jsonify({'message': 'Habitación no encontrada'}), 404

    # Obtener los datos enviados en el cuerpo de la solicitud
    data = request.get_json()

    # Actualizar los campos de la habitación
    habitacion.numero_habitacion = data.get('numero_habitacion', habitacion.numero_habitacion)
    habitacion.tipo_habitacion = data.get('tipo_habitacion', habitacion.tipo_habitacion)
    habitacion.capacidad = data.get('capacidad', habitacion.capacidad)
    habitacion.precio_noche = data.get('precio_noche', habitacion.precio_noche)
    habitacion.estado = data.get('estado', habitacion.estado)
    habitacion.descripcion = data.get('descripcion', habitacion.descripcion)
    habitacion.id_piso_corresp = data.get('id_piso_corresp', habitacion.id_piso_corresp)
    
    # Guardar los cambios en la base de datos
    db.session.commit()

    # Devolver la habitación actualizada como JSON
    return jsonify(habitacion.to_dict()), 200


@agregarhab_bp.route('/api/habitaciones/<int:id>', methods=['DELETE'])
def eliminar_habitacion(id):
    habitacion = Habitacion.query.get(id)
    if habitacion:
        db.session.delete(habitacion)
        db.session.commit()
        return jsonify({'message': 'Habitación eliminada exitosamente'}), 200
    else:
        return jsonify({'message': 'Habitación no encontrada'}), 404
