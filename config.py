import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "mysql+pymysql://root:PROGRAMACION2023@localhost/hotel")
    SQLALCHEMY_TRACK_MODIFICATIONS = False