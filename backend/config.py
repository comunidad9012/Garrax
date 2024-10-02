import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "mysql+pymysql://root:MsQl2003@localhost/garrax")
    SQLALCHEMY_TRACK_MODIFICATIONS = False