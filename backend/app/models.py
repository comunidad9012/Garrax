from db import Base
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
db = SQLAlchemy()

class Habitacion(Base):
    __tablename__ = 'habitacion'
    id_habitacion = db.Column(db.Integer, primary_key=True)
    numero_habitacion = db.Column(db.String(10), nullable=False)
    tipo_habitacion = db.Column(db.String(50), nullable=False)
    capacidad = db.Column(db.Integer, nullable=False)  # Corregido 'Interger' a 'Integer'
    precio_noche = db.Column(db.Float, nullable=False)
    estado = db.Column(db.Enum('DISPONIBLE', 'Ocupada', 'Mantenimiento'), nullable=False)  # Enum definido aquí
    descripcion = db.Column(db.String(1000), nullable=False)
    id_piso_corresp = db.Column(db.Integer, nullable=False)  # Corregido 'Interger' a 'Integer'


class Cliente(Base):
    __tablename__ = 'cliente'
    id_cliente = db.Column(db.Integer, primary_key=True)
    DNI = db.Column(db.Integer, nullable=False)  # Corregido 'Interger' a 'Integer'
    nombre = db.Column(db.String(50), nullable=False)
    direccion = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(50), nullable=False)

class Piso(Base):
    __tablename__ = 'piso'
    id_piso = db.Column(db.Integer, primary_key=True)
    numero_piso = db.Column(db.Integer, nullable=False)
    


class Usuario(Base):
    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password, password)

class Registro(Base):
    __tablename__ = 'registro'  # Nombre de la tabla en la base de datos

    id = db.Column(db.Integer, primary_key=True)  # ID único para cada usuario
    email = db.Column(db.String(120), unique=True, nullable=False)  # Email del usuario
    password = db.Column(db.String(200), nullable=False)  # Contraseña hasheada

    def __init__(self, email, password):
        self.email = email
        self.password = password

    def __repr__(self):
        return f'<registro {self.email}>'