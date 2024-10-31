#En este archivo es donde importamos los archivos de python creados en la carpeta de routes
from .routes.home import home_bp
from .routes.recepcion import recepcion_bp
from .routes.login import login_blueprint
from .routes.registro import registro_blueprint

#Y en esta parte es donde debemos registrar los blueprints

def register_blueprints(app):
    app.register_blueprint(home_bp)
    app.register_blueprint(recepcion_bp)
    app.register_blueprint(login_blueprint)
    app.register_blueprint(registro_blueprint)