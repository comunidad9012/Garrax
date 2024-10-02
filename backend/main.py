from flask import Flask, jsonify, request
from flask_cors import CORS
from config import Config
from db import db, Base
from app import models
from app.blueprints import register_blueprints



app = Flask(__name__)
CORS(app)


#CARGAR LA CONFIGURACION
app.config.from_object('config.Config')

#INICIALIZAR LA BASE DE DATOS
db.init_app(app)

#Registrar blueprints
register_blueprints(app) 

with app.app_context():
    Base.metadata.create_all(bind=db.engine)

# Ruta para registrar clientes (AGREGADA AQUÍ)
@app.route('/register_cliente', methods=['POST'])
def register_cliente():
    data = request.get_json()  # Recibe los datos en formato JSON desde el frontend
    nombre = data['nombre']
    apellido = data['apellido']
    dni = data['dni']
    email = data['email']
    telefono = data.get('telefono', None)
    direccion = data.get('direccion', None)

    # Verifica si el cliente ya existe por su email
    if models.Cliente.query.filter_by(email=email).first():
        return jsonify({"error": "Cliente already exists"}), 400

    # Crea un nuevo cliente y lo guarda en la base de datos
    nuevo_cliente = models.Cliente(nombre=nombre, apellido=apellido, dni=dni, email=email, telefono=telefono, direccion=direccion)
    db.session.add(nuevo_cliente)
    db.session.commit()

    return jsonify({"message": "Cliente creado exitosamente"}), 201

if __name__=='__main__':
    app.run(debug=True)

