#Este archivo init se utiliza para crear clases y funciones que luego vamos a importar en otros archivos
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    #CARGAR LA CONFIGURACION
    app.config.from_object('config.Config')

    #INICIALIZAR LA BASE DE DATOS
    db.init_app(app)

    #Registrar blueprints
    from .blueprints import register_blueprints
    register_blueprints(app)

    return app