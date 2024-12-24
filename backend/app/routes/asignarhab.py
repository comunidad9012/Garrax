from flask import Blueprint, request, jsonify
from db import db
from app.models import Habitacion, Cliente
from flask_cors import CORS
from datetime import datetime

asignarhab_bp = Blueprint('asignarhab_bp', __name__)

# Ruta para asignar una habitación a un cliente
@asignarhab_bp.route('/api/asignarhab/<int:id_habitacion>', methods=['POST'])
def asignar_habitacion(id_habitacion):

    try:
        # Obtener la habitación
        habitacion = Habitacion.query.get(id_habitacion)
        if not habitacion:
            return jsonify({"success": False, "message": "Habitación no encontrada"}), 404

        # Verificar si la habitación ya está ocupada
        if habitacion.estado == "Ocupada":
            return jsonify({"success": False, "message": "La habitación ya está ocupada"}), 400

        # Obtener los datos del cliente desde la solicitud
        datos_cliente = request.json
        print("Datos recibidos:", datos_cliente)  # Depuración

        # Crear un nuevo cliente
        nuevo_cliente = Cliente(
            
            nombre=datos_cliente.get('nombre'),
            apellido=datos_cliente.get('apellido'),
            DNI=datos_cliente.get('dni'),
            direccion=datos_cliente.get('direccion'),
            telefono=datos_cliente.get('telefono'),
            email=datos_cliente.get('email'),
            razon=datos_cliente.get('razon'),
            fecha_hora_ingreso=datetime.strptime(datos_cliente.get('fecha_hora_ingreso'), '%Y-%m-%dT%H:%M'),  # Ajuste aquí
            id_hab_corresp=id_habitacion

        )

        # Actualizar el estado de la habitación
        habitacion.estado = "Ocupada"

        # Guardar los cambios en la base de datos
        db.session.add(nuevo_cliente)
        db.session.commit()
        print("Cliente guardado en la base de datos.")  # Depuración

        return jsonify({"success": True, "message": "Habitación asignada exitosamente"}), 200

    except Exception as e:
        db.session.rollback()
        print("Error:", str(e))  # Depuración
        return jsonify({"success": False, "message": str(e)}), 500

@asignarhab_bp.route('/api/liberarhab/<int:id_habitacion>', methods=['POST'])
def liberar_habitacion(id_habitacion):
    try:
        # Obtener la habitación
        habitacion = Habitacion.query.get(id_habitacion)
        if not habitacion:
            return jsonify({"success": False, "message": "Habitación no encontrada"}), 404

        # Verificar si la habitación está ocupada
        if habitacion.estado != "Ocupada":
            return jsonify({"success": False, "message": "La habitación ya está disponible"}), 400

        # Obtener el cliente asociado
        cliente = Cliente.query.filter_by(id_hab_corresp=id_habitacion).first()
        if not cliente:
            return jsonify({"success": False, "message": "No se encontró cliente asignado a esta habitación"}), 404

        # Actualizar la fecha de salida del cliente antes de eliminarlo
        cliente.fecha_hora_salida = datetime.utcnow()  # Aquí puedes usar la fecha y hora actual

        # Eliminar al cliente de la base de datos
        db.session.delete(cliente)

        # Actualizar el estado de la habitación
        habitacion.estado = "Disponible"

        # Guardar los cambios
        db.session.commit()

        return jsonify({"success": True, "message": "Habitación liberada exitosamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": str(e)}), 500


# Ruta para obtener información del cliente asignado a una habitación

@asignarhab_bp.route('/api/cliente/<int:id_habitacion>', methods=['GET'])
def obtener_cliente_por_habitacion(id_habitacion):
    habitacion = Habitacion.query.filter_by(id_habitacion=id_habitacion).first()
    if habitacion and habitacion.estado == 'Ocupada':
        cliente = Cliente.query.filter_by(id_hab_corresp=id_habitacion).first()
        if cliente:
            return jsonify({
                'cliente': {
                    'nombre': cliente.nombre,
                    'apellido': cliente.apellido,
                    'dni': cliente.DNI,
                    'direccion': cliente.direccion,
                    'telefono': cliente.telefono,
                    'email': cliente.email,
                    'razon': cliente.razon,
                    'fecha_hora_ingreso': cliente.fecha_hora_ingreso.strftime('%Y-%m-%dT%H:%M:%S'),
                    'habitacion': habitacion.numero_habitacion,
                    'tipo_habitacion': habitacion.tipo_habitacion
                }
            }), 200

    return jsonify({'message': 'Habitación no encontrada o no ocupada'}), 404

