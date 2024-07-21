from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from controls.inicio_sesion.genero_control import GeneroControl
from controls.inicio_sesion.tipo_ide_control import TipoIdeControl
from controls.academic.periodo_academico_control import PeriodoAcademicoControl
from controls.catalogo.ciclo_control import CicloControl
from controls.catalogo.criterio_evaluacion_control import CriterioEvaluacionControl
from asyncio import run
from datetime import datetime

catalogos = Blueprint("catalogos", __name__)

genero_control = GeneroControl()
periodo_academico_control = PeriodoAcademicoControl()
tipo_identificacion_control = TipoIdeControl()
genero_control = GeneroControl()
ciclo_control = CicloControl()
criterio_evaluacion_control = CriterioEvaluacionControl()

#* --------------GENEROS----------------

@jwt_required()
@catalogos.route("/generos", methods=["GET"])
def get_generos():
    """
    Obtener todos los generos.

    Returns:
        Response: Lista de todos los generos en formato JSON y un codigo de estado HTTP 200.
    """
    data = genero_control._to_dict()
    return jsonify(data), 200

@jwt_required
@catalogos.route("/generos", methods=["POST"])
def create_genero():
    """
    Crear un nuevo genero.

    Esta solicitud POST recibe el dato del genero en formato JSON. El dato necesario es el nombre

    Returns:
        Response: Mensaje de exito o error en formato JSON y un codigo de estado HTTP 201 o 500.
    """
    try:
        data = request.json
        genero_control._genero._nombre = data["nombre"]
        genero_control.save()
        return jsonify("msg: Genero creado correctamente"), 201
    except Exception as e:
        return jsonify({"msg": "Error al crear el genero"}), 500

@jwt_required
@catalogos.route("/generos/<int:id>", methods=["PUT"])
def update_gnenero(id):
    """
    Modifica los detalles de un genero.
    
    Esta solicitud PUT recibe el dato actualizado del genero en formato JSON. Se requiere que el 
    identificador del genero se pase como un parametro en la URL. El dato a modificar es el nombre.

    Args:
        id (int): ID del peirodo academico a actualizar.

    Returns:
        Response: Mensaje de exito o error en formato JSON y un codigo de estado HTTP 201 o 500.
    """
    data = request.json
    genero_control._genero._nombre = data["nombre"]
    if genero_control.update(id):
        return jsonify({"msg": "Genero actualizado correctamente"}), 201
    else:
        return jsonify({"msg": "Error al actualizar el genero"}), 500

#* --------------CICLOS----------------

@jwt_required()
@catalogos.route("/ciclos", methods=["GET"])
def get_ciclos():
    """
    Obtener todos los ciclos.

    Returns:
        Response: Lista de todos los ciclos en formato JSON y un codigo de estado HTTP 200.
    """
    data = ciclo_control._to_dict()
    return jsonify(data), 200

@jwt_required
@catalogos.route("/ciclos", methods=["POST"])
def create_ciclo():
    """
    Crear un nuevo ciclo.

    Esta solicitud POST recibe el dato del genero en formato JSON. El dato necesario es el nombre

    Returns:
        Response: Mensaje de exito o error en formato JSON y un codigo de estado HTTP 201 o 500.
    """
    try:
        data = request.json
        ciclo_control._ciclo._nombre = data["ciclo"]
        ciclo_control.save()
        return jsonify("msg: Ciclo creado correctamente"), 201
    except Exception as e:
        return jsonify({"msg": "Error al crear el ciclo"}), 500

@jwt_required
@catalogos.route("/ciclos/<int:id>", methods=["PUT"])
def update_ciclo(id):
    """
    Modifica los detalles de un ciclo. 
    
    Esta solicitud PUT recibe el dato actualizado del ciclo en formato JSON. Se requiere que el 
    identificador del ciclo se pase como un parametro en la URL. El dato a modificar es el nombre.


    Args:
        id (int): ID del ciclo a actualizar.

    Returns:
        Response: Mensaje de exito o error en formato JSON y un codigo de estado HTTP 201 o 500.
    """
    data = request.json
    # print(f"Data: {data}")
    ciclo_control._ciclo._nombre = data["ciclo"]
    if ciclo_control.update(id):
        return jsonify({"msg": "Ciclo actualizado correctamente"}), 201
    else:
        return jsonify({"msg": "Error al actualizar el ciclo"}), 500

#* --------------CRITERIOS DE EVALUACION----------------

@jwt_required()
@catalogos.route("/criterioAsignaicon", methods=["GET"])
def get_criterio_asignaicon():
    """
    Obtener todos los criterios de evaluacion.

    Returns:
        Response: Lista de todos los criterios de evaluacion en formato JSON y un codigo de estado HTTP 200.
    """
    data = criterio_evaluacion_control._to_dict()
    return jsonify(data), 200

@jwt_required
@catalogos.route("/criterioAsignaicon", methods=["POST"])
def create_criterio_asignaicon():
    """
    Crear un nuevo criterio de evaluacion

    Esta solicitud POST recibe los datos del criterio de evaluacion en formato JSON. Los datos necesarios son
    el nombre y el porcentaje.

    Returns:
        Response: Mensaje de exito o error en formato JSON y un codigo de estado HTTP 201 o 500.
    """
    try:
        data = request.json
        # print(f"Data: {data}")
        criterio_evaluacion_control._criterio._nombre = data["nombre"]
        criterio_evaluacion_control._criterio._porcentaje = data["porcentaje"]
        criterio_evaluacion_control.save()
        return jsonify("msg: Criterio de evaluacion creado correctamente"), 201
    except Exception as e:
        return jsonify({"msg": "Error al crear el criterio de evaluacion"}), 500

@jwt_required
@catalogos.route("/criterioAsignaicon/<int:id>", methods=["PUT"])
def update_criterio_asignaicon(id):
    """
    Modifica los detalles de un criterio de evaluacion. 
    
    Esta solicitud PUT recibe los datos actualizados del criterio de evaluacion en formato JSON. Se requiere 
    que el  identificador del criterio de evaluacion se pase como un parametro en la URL. Los datos a modificar 
    son el nombre y el porcentaje.

    Args:
        id (int): ID del criterio de evaluacion a actualizar.

    Returns:
        Response: Mensaje de exito o error en formato JSON y un codigo de estado HTTP 201 o 500.
    """
    data = request.json
    # print(f"Data: {data}")
    # print(id)
    criterio_evaluacion_control._criterio._nombre = data["nombre"]
    criterio_evaluacion_control._criterio._porcentaje = data["porcentaje"]
    if criterio_evaluacion_control.update(id):
        return jsonify({"msg": "Criterio de evaluacion actualizado correctamente"}), 201
    else:
        return jsonify({"msg": "Error al actualizar el criterio de evaluacion"}), 500

#* -----------------TIPO DE IDENTIFICACION-----------------


@jwt_required()
@catalogos.route("/tipo_identificacion", methods=["GET"])
def get_tipo_identificacion():
    """
    Obtener todos los tipos de identificacion.

    Returns:
        Response: Lista de todos los tipos de identificacion en formato JSON y un codigo de estado HTTP 200.
    """
    data = tipo_identificacion_control._to_dict()
    return jsonify(data), 200

#* -----------------PERIODOS ACADEMICOS-----------------

@jwt_required()
@catalogos.route("/periodos_academicos", methods=["GET"])
def get_periodos_academicos():
    """
    Obtener todos los periodos academicos.

    Returns:
        Response: Lista de todos los periodos academicos en formato JSON y un codigo de estado HTTP 200.
    """
    data = periodo_academico_control._to_dict()
    for periodo in data:
        periodo["fecha_inicio"] = periodo["fecha_inicio"].strftime("%d/%m/%Y")
        periodo["fecha_fin"] = periodo["fecha_fin"].strftime("%d/%m/%Y")
    return jsonify(data), 200


@jwt_required
@catalogos.route("/periodos_academicos", methods=["POST"])
def create_periodo_academico():
    """
    Crear un nuevo periodo academico.

    Esta solicitud POST recibe los datos del periodo academico en formato JSON. Los datos 
    necesarios son fecha_inicio y fecha_fin

    Returns:
        Response: Mensaje de exito o error en formato JSON y un codigo de estado HTTP 201 o 500.
    """
    try:
        data = request.json
        fecha_inicio_str = data["fecha_inicio"]
        fecha_fin_str = data["fecha_fin"]
        fecha_inicio = datetime.strptime(fecha_inicio_str, "%Y-%m-%d").strftime("%d/%m/%Y")
        fecha_fin = datetime.strptime(fecha_fin_str, "%Y-%m-%d").strftime("%d/%m/%Y")
        periodo_academico_control._periodo_acedemico._fecha_inicio = fecha_inicio
        periodo_academico_control._periodo_acedemico._fecha_fin = fecha_fin
        periodo_academico_control.save()
        return jsonify("msg: Periodo Academico creado correctamente"), 201
    except Exception as e:
        return jsonify({"msg": "Error al crear el periodo academico"}), 500
    
@jwt_required
@catalogos.route("/periodos_academicos/<int:id>", methods=["PUT"])
def update_periodo_academico(id):
    """
    Modifica los detalles de un periodo academico.
    
    Esta solicitud PUT recibe los datos actualizados del periodo academico en formato JSON.
    Se requiere que el identificador del periodo academico se pase como un parametro en la 
    URL. Los datos a modificar es el fecha_inicio y fecha_fin.

    Args:
        id (int): ID del peirodo academico a actualizar.

    Returns:
        Response: Mensaje de exito o error en formato JSON y un codigo de estado HTTP 201 o 500.
    """
    data = request.json
    fecha_inicio_str = data["fecha_inicio"]
    fecha_fin_str = data["fecha_fin"]
    fecha_inicio = datetime.strptime(fecha_inicio_str, "%Y-%m-%d").strftime("%d/%m/%Y")
    fecha_fin = datetime.strptime(fecha_fin_str, "%Y-%m-%d").strftime("%d/%m/%Y")
    periodo_academico_control._periodo_acedemico._fecha_inicio = fecha_inicio
    periodo_academico_control._periodo_acedemico._fecha_fin = fecha_fin
    if periodo_academico_control.update(id):
        return jsonify({"msg": "Criterio de evaluacion actualizado correctamente"}), 201
    else:
        return jsonify({"msg": "Error al actualizar el criterio de evaluacion"}), 500
    
    
    