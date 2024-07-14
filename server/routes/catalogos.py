from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from controls.inicio_sesion.genero_control import GeneroControl
from controls.inicio_sesion.tipo_ide_control import TipoIdeControl
from controls.academic.periodo_academico_control import PeriodoAcademicoControl
from controls.catalogo.ciclo_control import CicloControl
from controls.catalogo.criterio_evaluacion_control import CriterioEvaluacionControl
from asyncio import run


catalogos = Blueprint("catalogos", __name__)

genero_control = GeneroControl()
periodo_academico_control = PeriodoAcademicoControl()
tipo_identificacion_control = TipoIdeControl()
genero_control = GeneroControl()
ciclo_control = CicloControl()
criterio_evaluacion_control = CriterioEvaluacionControl()

#* --------------GENEROS----------------

# ? OBTENER TODOS LOS GENEROS
@jwt_required()
@catalogos.route("/generos", methods=["GET"])
def get_generos():
    data = genero_control._to_dict()
    return jsonify(data), 200

@jwt_required
@catalogos.route("/generos", methods=["POST"])
def create_genero():
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
    data = request.json
    genero_control._genero._nombre = data["nombre"]
    if genero_control.update(id):
        return jsonify({"msg": "Genero actualizado correctamente"}), 201
    else:
        return jsonify({"msg": "Error al actualizar el genero"}), 500

#* --------------CICLOS----------------

# ? OBTENER TODOS LOS CICLOS
@jwt_required()
@catalogos.route("/ciclos", methods=["GET"])
def get_ciclos():
    data = ciclo_control._to_dict()
    return jsonify(data), 200

@jwt_required
@catalogos.route("/ciclos", methods=["POST"])
def create_ciclo():
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
    data = request.json
    # print(f"Data: {data}")
    ciclo_control._ciclo._nombre = data["ciclo"]
    if ciclo_control.update(id):
        return jsonify({"msg": "Ciclo actualizado correctamente"}), 201
    else:
        return jsonify({"msg": "Error al actualizar el ciclo"}), 500

#* --------------CRITERIOS DE EVALUACION----------------

# ? OBTENER TODOS LOS CRITERIOS DE EVALUACION
@jwt_required()
@catalogos.route("/criterioAsignaicon", methods=["GET"])
def get_criterio_asignaicon():
    data = criterio_evaluacion_control._to_dict()
    return jsonify(data), 200

@jwt_required
@catalogos.route("/criterioAsignaicon", methods=["POST"])
def create_criterio_asignaicon():
    try:
        data = request.json
        print(f"Data: {data}")
        criterio_evaluacion_control._criterio._nombre = data["nombre"]
        criterio_evaluacion_control._criterio._porcentaje = data["porcentaje"]
        criterio_evaluacion_control.save()
        return jsonify("msg: Criterio de evaluacion creado correctamente"), 201
    except Exception as e:
        return jsonify({"msg": "Error al crear el criterio de evaluacion"}), 500

@jwt_required
@catalogos.route("/criterioAsignaicon/<int:id>", methods=["PUT"])
def update_criterio_asignaicon(id):
    data = request.json
    print(f"Data: {data}")
    print(id)
    criterio_evaluacion_control._criterio._nombre = data["nombre"]
    criterio_evaluacion_control._criterio._porcentaje = data["porcentaje"]
    if criterio_evaluacion_control.update(id):
        return jsonify({"msg": "Criterio de evaluacion actualizado correctamente"}), 201
    else:
        return jsonify({"msg": "Error al actualizar el criterio de evaluacion"}), 500

#* -----------------TIPO DE IDENTIFICACION-----------------


# ? OBTENER TODOS LOS TIPO DE IDENTIFICACION
@jwt_required()
@catalogos.route("/tipo_identificacion", methods=["GET"])
def get_tipo_identificacion():
    data = tipo_identificacion_control._to_dict()
    return jsonify(data), 200

#* -----------------PERIODOS ACADEMICOS-----------------

# ? OBTENER TODOS LOS PERIODOS ACADEMICOS
@jwt_required()
@catalogos.route("/periodos_academicos", methods=["GET"])
def get_periodos_academicos():
    data = periodo_academico_control._to_dict()
    for periodo in data:
        periodo["fecha_inicio"] = periodo["fecha_inicio"].strftime("%d/%m/%Y")
        periodo["fecha_fin"] = periodo["fecha_fin"].strftime("%d/%m/%Y")

    return jsonify(data), 200


