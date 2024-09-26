import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "mysql+pymysql://root:PROGRAMACION2023@localhost/proyecto1")
    SQLALCHEMY_TRACK_MODIFICATIONS = False