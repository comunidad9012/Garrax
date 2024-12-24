from flask import request, jsonify, Blueprint
from werkzeug.security import check_password_hash
from app.models import Usuario
from db import db

login_bp = Blueprint('login_bp', __name__)

@login_bp.route('/api/login', methods=['POST'])
def login():
    # Obtener los datos del formulario (nombre y contraseña)
    data = request.json

    if not data or 'nombre' not in data or 'contrasena' not in data:
        return jsonify({'error': 'Faltan datos'}), 400

    nombre = data['nombre']
    contrasena = data['contrasena']

    print(nombre, contrasena)

    # Verificar si el nombre de usuario es "admin" y la contraseña es "admin"
    if nombre == "admin" and contrasena == "admin":
        return jsonify({'success': True, 'mensaje': 'Inicio de sesión exitoso'}), 200
    else:
        return jsonify({'success': False, 'error': 'Usuario o contraseña incorrectos'}), 401
