from flask import Blueprint, request, jsonify, send_file
# from flask_jwt_extended import jwt_required
from controls.proyecciones.proyeccion import calcular_proyeccion_estudiante_unidad_3
from controls.proyecciones.proyeccion import grafica_proyeccion_estudiante_unidad_3
from io import BytesIO

from controls.reportes.util import Util 

proyecciones = Blueprint("proyecciones", __name__) 

# @jwt_required()
@proyecciones.route("/proyeccion_estudiante_unidad_3", methods=["POST"])
def proyeccion_estudiante_unidad_3():
    try:
        print("\n\n\n\n\n\n")
        data = request.json
        print(data)
        nota_unidad_1 = data["notaUnidad1"]
        print(nota_unidad_1)
        nota_unidad_2 = data["notaUnidad2"]
        print(nota_unidad_2)
        proyeccion, nota_necesaria_unidad3, suma_acumulada, color, mensaje = calcular_proyeccion_estudiante_unidad_3(nota_unidad_1, nota_unidad_2)
        imagen = grafica_proyeccion_estudiante_unidad_3(nota_unidad_1, nota_unidad_2, proyeccion, nota_necesaria_unidad3, suma_acumulada, color, mensaje)
        print("\n\n\n\n\n\n")
        # return jsonify(imagen), 200
        return send_file(imagen, mimetype='image/png'), 200

    except Exception as e:
        return jsonify({"msg": "Bad request"}), 400