from db import Base
from flask_sqlalchemy import SQLAlchemy

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
    descripcion = db.Column(db.String(100), nullable=False)

