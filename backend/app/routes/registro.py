from flask import Blueprint, request, jsonify
from db import db
from app.models import Usuario  # Asegúrate de tener un modelo de Usuario

registro_blueprint = Blueprint('registro_blueprint', __name__)

@registro_blueprint.route('/api/registro', methods=['POST'])
def registrar_usuario():
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')

    # Aquí puedes añadir validaciones como comprobar si el email ya existe
    if db.session.query(Usuario).filter_by(email=email).first():
        return jsonify({"success": False, "message": "El email ya está registrado."}), 400

    # Crea una instancia del usuario y añádelo a la base de datos
    nuevo_usuario = Usuario(email=email, password=password)  # Asegúrate de manejar el hash de la contraseña
    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({"success": True, "message": "Registro exitoso."}), 201