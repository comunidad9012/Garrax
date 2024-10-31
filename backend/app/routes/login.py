from flask import Blueprint, request, jsonify
from db import db  
from app.models import Usuario  
from werkzeug.security import check_password_hash  # Para comparar contraseñas

login_blueprint = Blueprint('login_blueprint', __name__)

@login_blueprint.route('/api/login', methods=['POST'])
def login_user():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Busca al usuario por correo electrónico
    user = Usuario.query.filter_by(email=email).first()
    
    if user and check_password_hash(user.password, password):  
        return jsonify({"message": "Login successful"}), 200
    
    return jsonify({"message": "Invalid credentials"}), 401
