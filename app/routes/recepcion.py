from flask import render_template, Blueprint

recepcion_bp=Blueprint('recepcion_bp', __name__)

@recepcion_bp.route('/recepcion')
def home():
    
    return render_template('recepcion.html')