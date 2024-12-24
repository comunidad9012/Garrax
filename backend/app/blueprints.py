#En este archivo es donde importamos los archivos de python creados en la carpeta de routes
from .routes.recepcion import recepcion_bp
from .routes.agregarhab import agregarhab_bp
from .routes.login import login_bp
from .routes.agregarpiso import agregarpiso_bp
from .routes.asignarhab import asignarhab_bp
from .routes.clientes import clientes_bp


#Y en esta parte es donde debemos registrar los blueprints

def register_blueprints(app):
    app.register_blueprint(recepcion_bp)
    app.register_blueprint(agregarhab_bp)
    app.register_blueprint(login_bp)
    app.register_blueprint(agregarpiso_bp)
    app.register_blueprint(asignarhab_bp)
    app.register_blueprint(clientes_bp)
    
