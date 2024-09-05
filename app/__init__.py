#Este archivo init se utiliza para crear clases y funciones que luego vamos a importar en otros archivos
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

def create_app():
    app = Flask(__name__)

    #Registrar blueprints
    from .blueprints import register_blueprints
    register_blueprints(app)

    return app