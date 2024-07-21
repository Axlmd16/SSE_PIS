from flask import Blueprint, request, jsonify, send_file
from controls.proyecciones.proyeccion import calcular_proyeccion_estudiante_unidad_3
from controls.proyecciones.proyeccion import grafica_proyeccion_estudiante_unidad_3
from controls.proyecciones.proyeccion import grafica_proyeccion_estudiante_parametros
from controls.proyecciones.proyeccion import graficar_proyecciones_all_estudiantes
from controls.proyecciones.proyeccion import calcular_proyeccion_estudiante_parametros
from controls.proyecciones.proyeccion import graficar_proyecciones_all_estudiantes_parametros
from controls.proyecciones.proyeccion import llamar_calcular_proyeccion_final_supletorio
from controls.proyecciones.proyeccion import calcular_y_graficar_proyeccion_estudiantes_final_supletorio
from controls.proyecciones.proyeccion import calcular_y_graficar_proyeccion_estudiantes_supletorio

from controls.reportes.util import Util 

proyecciones = Blueprint("proyecciones", __name__) 

@proyecciones.route("/proyeccion_final_supletorio", methods=["POST"])
def proyeccion_estudiante_supletorio():
    """
    Calcula y devuelve la proyeccion final o supletoria de notas para un estudiante especifico.

    Args:
    - data (dict): Datos JSON con las notas de las tres unidades (unidad_1, unidad_2, unidad_3) y el nombre del estudiante.
    
    Returns:
    - tuple: Imagen de tipo PNG que representa el grafico generado y codigo de estado HTTP 200 si es exitoso.

    Raises:
    - KeyError: Si falta alguno de los campos requeridos en los datos recibidos.
    - ValueError: Si alguna de las notas de las unidades no esta en el rango valido de 0 a 10.
    - Exception: Si ocurre algun otro error no especificado durante el procesamiento.
    """
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
    """
    Calcula y devuelve la proyeccion de notas para un estudiante basado en las notas de las dos primeras unidades.

    Args:
    - data (dict): Datos JSON con las notas de las dos primeras unidades (unidad_1, unidad_2) y el nombre del estudiante.
    
    Returns:
    - tuple: Imagen de tipo PNG que representa el grafico generado y codigo de estado HTTP 200 si es exitoso.

    Raises:
    - KeyError: Si falta alguno de los campos requeridos en los datos recibidos.
    - ValueError: Si alguna de las notas de las unidades no es un numero valido.
    - Exception: Si ocurre algun otro error no especificado durante el procesamiento.
    """ 
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
    """
    Calcula y devuelve la proyeccion de notas para un estudiante basado en criterios de evaluacion dados.

    Args:
    - data (dict): Datos JSON con los valores de los criterios de evaluacion (criterio_1, criterio_2, criterio_3, criterio_4) y el nombre del estudiante.
    
    Returns:
    - tuple: Imagen de tipo PNG que representa el grafico generado y codigo de estado HTTP 200 si es exitoso.

    Raises:
    - KeyError: Si falta alguno de los campos requeridos en los datos recibidos.
    - ValueError: Si alguno de los criterios no es un numero valido.
    - Exception: Si ocurre algun otro error no especificado durante el procesamiento.
    """
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
    """
    Calcula y devuelve la proyeccion de notas para todos los estudiantes basado en las notas de las dos primeras unidades.

    Args:
    - data (list): Lista de diccionarios donde cada diccionario representa a un estudiante con sus respectivas notas de las dos primeras unidades (unidad_1, unidad_2).
    
    Returns:
    - tuple: Imagen de tipo PNG que representa el grafico generado y codigo de estado HTTP 200 si es exitoso.

    Raises:
    - KeyError: Si falta alguno de los campos requeridos en los datos recibidos.
    - ValueError: Si alguna de las notas de las unidades no es un numero valido.
    - Exception: Si ocurre algun otro error no especificado durante el procesamiento.
    """
    try:
        data = request.json
        imagen = graficar_proyecciones_all_estudiantes(data)
        return send_file(imagen, mimetype='image/png'), 200
      
    except Exception as e:
        return jsonify({"msg": "Bad request"}), 400

@proyecciones.route("/estudiantes_proyecciones_parametros", methods=["POST"])
def estudiantes_proyecciones_parametros():
    """
    Calcula y devuelve la proyeccion de notas para todos los estudiantes basado en criterios de evaluacion dados.

    Args:
    - data (list): Lista de diccionarios donde cada diccionario representa a un estudiante con sus respectivos valores de criterios de evaluacion (criterio_1, criterio_2, criterio_3, criterio_4).
    
    Returns:
    - tuple: Imagen de tipo PNG que representa el grafico generado y codigo de estado HTTP 200 si es exitoso.

    Raises:
    - KeyError: Si falta alguno de los campos requeridos en los datos recibidos.
    - ValueError: Si alguno de los criterios no es un numero valido.
    - Exception: Si ocurre algun otro error no especificado durante el procesamiento.
    """
    try:
        data = request.json
        imagen = graficar_proyecciones_all_estudiantes_parametros(data)
        return send_file(imagen, mimetype='image/png'), 200
      
    except Exception as e:
        return jsonify({"msg": "Bad request"}), 400

@proyecciones.route("/proyeccion_all_estudiantes_final_supletorio", methods=["POST"])
def proyeccion_all_estudiantes_final_supletorio():
    """
    Calcula y devuelve la proyeccion final o supletoria de notas para todos los estudiantes basado en las notas de tres unidades.

    Args:
    - data (list): Lista de diccionarios donde cada diccionario representa a un estudiante con sus respectivas notas de las tres unidades (unidad_1, unidad_2, unidad_3).
    
    Returns:
    - tuple: Imagen de tipo PNG que representa el grafico generado y codigo de estado HTTP 200 si es exitoso.

    Raises:
    - KeyError: Si falta alguno de los campos requeridos en los datos recibidos.
    - ValueError: Si alguna de las notas de las unidades no esta en el rango valido de 0 a 10.
    - Exception: Si ocurre algun otro error no especificado durante el procesamiento.
    """
    try:
        data = request.json
        imagen = calcular_y_graficar_proyeccion_estudiantes_final_supletorio(data)
        return send_file(imagen, mimetype='image/png'), 200
      
    except Exception as e:
        return jsonify({"msg": "Bad request"}), 400
    

@proyecciones.route("/proyeccion_estudiantes_supletorio", methods=["POST"])
def proyeccion_estudiantes_supletorio():
    """
    Calcula y devuelve la proyeccion de notas finales para estudiantes con promedio menor a 7,
    incluyendo la nota del 40% y la nota necesaria en el supletorio, si aplica. Retorna una imagen
    del grafico generado en formato PNG.

    Args:
    - request.json (dict): Un diccionario que contiene la informacion de los estudiantes, incluyendo
      las notas de las tres unidades (unidad_1, unidad_2, unidad_3) y el nombre de cada estudiante.

    Returns:
    - FileResponse: Respuesta de archivo que contiene la imagen del grafico en formato PNG.

    Raises:
    - JSONDecodeError: Si el cuerpo de la solicitud no esta en formato JSON valido.
    - ValueError: Si alguna de las notas de las unidades no esta en el rango de 0 a 10, o si no hay
      estudiantes con promedio menor a 7.
    """
    try:
        data = request.json
        imagen_grafica = calcular_y_graficar_proyeccion_estudiantes_supletorio(data)
        return send_file(imagen_grafica, mimetype='image/png'), 200
    except Exception as e:
        return jsonify({"msg": "Bad request"}), 400