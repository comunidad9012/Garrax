from db import db
from datetime import datetime
class Habitacion(db.Model):
    __tablename__ = 'habitacion'
    
    id_habitacion = db.Column(db.Integer, primary_key=True)
    numero_habitacion = db.Column(db.Integer, nullable=False, unique=True)
    tipo_habitacion = db.Column(db.String(50), nullable=False)
    capacidad = db.Column(db.Integer, nullable=False)
    precio_noche = db.Column(db.Float, nullable=False)
    estado = db.Column(db.Enum('Disponible', 'Ocupada', 'Mantenimiento'), nullable=False)
    descripcion = db.Column(db.String(1000), nullable=False)
    id_piso_corresp = db.Column(db.Integer, nullable=False)
    
    def to_dict(self):
        return {
            'id_habitacion': self.id_habitacion,
            'numero_habitacion': self.numero_habitacion,
            'tipo_habitacion': self.tipo_habitacion,
            'capacidad': self.capacidad,
            'precio_noche': self.precio_noche,
            'estado': self.estado,
            'descripcion': self.descripcion,
            'id_piso_corresp': self.id_piso_corresp
        }


class Cliente(db.Model):
    id_cliente = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    DNI = db.Column(db.String(20), nullable=False, unique=True)
    direccion = db.Column(db.String(200))
    telefono = db.Column(db.String(20))
    email = db.Column(db.String(100))
    razon = db.Column(db.String(200))
    fecha_hora_ingreso = db.Column(db.DateTime, nullable=False)
    id_hab_corresp = db.Column(db.Integer, db.ForeignKey('habitacion.id_habitacion'), nullable=False)
    habitacion = db.relationship('Habitacion', backref='clientes')


class Piso(db.Model):  # Cambiado de Base a db.Model
    __tablename__ = 'piso'
    id_piso = db.Column(db.Integer, primary_key=True)
    numero_piso = db.Column(db.Integer, nullable=False, unique=True)

class Usuario(db.Model):  # Cambiado de Base a db.Model
    __tablename__ = 'usuario'
    id_usuario = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    contrasena = db.Column(db.String(250), nullable=False)

class Registro(db.Model):
    __tablename__ = 'registro'
    
    id_registro = db.Column(db.Integer, primary_key=True)
    fecha_hora_salida = db.Column(db.DateTime, nullable=False)
    id_cliente_corresp = db.Column(db.Integer, db.ForeignKey('cliente.id_cliente'), nullable=False)
    cliente = db.relationship('Cliente', backref=db.backref('registros', lazy=True))
