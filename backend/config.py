import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "mysql+pymysql://root:MsQl2003@localhost/proyecto1")
    SQLALCHEMY_TRACK_MODIFICATIONS = False