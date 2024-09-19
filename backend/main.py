from flask import Flask, jsonify, request
from flask_cors import CORS
from config import Config
from db import db, Base
from app import models
from app.blueprints import register_blueprints



app = Flask(__name__, template_folder='app/templates')
CORS(app)


#CARGAR LA CONFIGURACION
app.config.from_object('config.Config')

#INICIALIZAR LA BASE DE DATOS
db.init_app(app)

#Registrar blueprints
register_blueprints(app) 

with app.app_context():
    Base.metadata.create_all(bind=db.engine)

if __name__=='__main__':
    app.run(debug=True)

