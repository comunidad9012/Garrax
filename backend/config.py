import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "mysql+pymysql://root:123456789@localhost/garrax")
    SQLALCHEMY_TRACK_MODIFICATIONS = False