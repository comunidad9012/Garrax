# main.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from config import Config
from db import db, Base
from app import models
from app.blueprints import register_blueprints

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas

# Cargar la configuración
app.config.from_object('config.Config')

# Inicializar la base de datos
db.init_app(app)

# Registrar los Blueprints
register_blueprints(app) 

with app.app_context():
    Base.metadata.create_all(bind=db.engine)

if __name__ == '__main__':
    app.run(debug=True)
