from flask import Blueprint, request, jsonify, send_file
from controls.proyecciones.proyeccion import calcular_proyeccion_estudiante_unidad_3
from controls.proyecciones.proyeccion import grafica_proyeccion_estudiante_unidad_3
from controls.proyecciones.proyeccion import grafica_proyeccion_estudiante_parametros
from controls.proyecciones.proyeccion import graficar_proyecciones_all_estudiantes
from controls.proyecciones.proyeccion import calcular_proyeccion_estudiante_parametros
from controls.proyecciones.proyeccion import graficar_proyecciones_all_estudiantes_parametros
from controls.proyecciones.proyeccion import llamar_calcular_proyeccion_final_supletorio
from controls.proyecciones.proyeccion import calcular_y_graficar_proyeccion_estudiantes_final_supletorio

from controls.reportes.util import Util 

proyecciones = Blueprint("proyecciones", __name__) 

@proyecciones.route("/proyeccion_final_supletorio", methods=["POST"])
def proyeccion_estudiante_supletorio():
    try:
        data = request.json
        nota_unidad_1 = float(data["unidad_1"])
        nota_unidad_2 = float(data["unidad_2"])
        nota_unidad_3 = float(data["unidad_3"])
        nombre = data["nombre"]
        imagen_grafica = llamar_calcular_proyeccion_final_supletorio(nota_unidad_1, nota_unidad_2, nota_unidad_3, nombre)
        return send_file(imagen_grafica, mimetype='image/png'), 200
    except Exception as e:
        return jsonify({"msg": "Bad request"}), 400

@proyecciones.route("/proyeccion_estudiante_unidad_3", methods=["POST"])
def proyeccion_estudiante_unidad_3():
    try:
        data = request.json
        nota_unidad_1 = data["unidad_1"]
        nota_unidad_2 = data["unidad_2"]
        nombre = data["nombre"]
        proyeccion, nota_necesaria_unidad3, suma_acumulada, color, mensaje = calcular_proyeccion_estudiante_unidad_3(float(nota_unidad_1), float(nota_unidad_2))
        imagen = grafica_proyeccion_estudiante_unidad_3(float(nota_unidad_1), float(nota_unidad_2), proyeccion, nota_necesaria_unidad3, suma_acumulada, color, mensaje, nombre)
        return send_file(imagen, mimetype='image/png'), 200

    except Exception as e:
        return jsonify({"msg": "Bad request"}), 400

@proyecciones.route("/proyeccion_estudiante_parametros_evaluacion", methods=["POST"])
def proyeccion_estudiante_parametros_evaluacion():
    try:
        data = request.json
        evaluacion = float(data["criterio_1"])
        ape =float(data["criterio_2"])
        acd =float(data["criterio_3"])
        aa = float(data["criterio_4"])
        proyeccion, color, mensaje = calcular_proyeccion_estudiante_parametros(evaluacion, ape, acd, aa)
        nombre_estudiante = data["nombre"]
        imagen = grafica_proyeccion_estudiante_parametros(evaluacion, ape, acd, aa, proyeccion, color, mensaje, nombre_estudiante)
        return send_file(imagen, mimetype='image/png'), 200
    except Exception as e:
        return jsonify({"msg": "Bad request"}), 400

@proyecciones.route("/estudiantes_proyecciones_unidad_3", methods=["POST"])
def estudiantes_proyecciones_unidad_3():
    try:
        data = request.json
        imagen = graficar_proyecciones_all_estudiantes(data)
        return send_file(imagen, mimetype='image/png'), 200
      
    except Exception as e:
        return jsonify({"msg": "Bad request"}), 400

@proyecciones.route("/estudiantes_proyecciones_parametros", methods=["POST"])
def estudiantes_proyecciones_parametros():
    try:
        data = request.json
        imagen = graficar_proyecciones_all_estudiantes_parametros(data)
        return send_file(imagen, mimetype='image/png'), 200
      
    except Exception as e:
        return jsonify({"msg": "Bad request"}), 400

@proyecciones.route("/proyeccion_all_estudiantes_final_supletorio", methods=["POST"])
def proyeccion_all_estudiantes_final_supletorio():
    try:
        data = request.json
        imagen = calcular_y_graficar_proyeccion_estudiantes_final_supletorio(data)
        return send_file(imagen, mimetype='image/png'), 200
      
    except Exception as e:
        return jsonify({"msg": "Bad request"}), 400