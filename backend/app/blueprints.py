# En este archivo es donde importamos los archivos de python creados en la carpeta de routes
from .routes.home import home_bp
from .routes.recepcion import recepcion_bp
from .routes.clientes import clientes_bp
from .routes.listaclientes import listaclientes_bp

# Función para registrar todos los blueprints
def register_blueprints(app):
    app.register_blueprint(home_bp)
    app.register_blueprint(recepcion_bp)
    app.register_blueprint(clientes_bp)  # Registrar el blueprint de clientes
    app.register_blueprint(listaclientes_bp)
