#En este archivo es donde importamos los archivos de python creados en la carpeta de routes
from .routes.home import home_bp
from .routes.recepcion import recepcion_bp


#Y en esta parte es donde debemos registrar los blueprints

def register_blueprints(app):
    app.register_blueprint(home_bp)
    app.register_blueprint(recepcion_bp)