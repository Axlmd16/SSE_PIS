from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from controls.admin.carrera_control import CarreraControl
from controls.admin.malla_control import MallaControl
from controls.admin.asignatura_control import AsignaturaControl
from controls.admin.grupo_control import GrupoControl

admin = Blueprint("admin", __name__)

cc = CarreraControl()
mc = MallaControl()
ac = AsignaturaControl()
gc = GrupoControl()


# ----------------------------------------------------------------------------------------
# CARRERAS
@jwt_required
@admin.route("/careers", methods=["POST"])
def create_career():
    data = request.json
    cc._carrera._nombre = data["nombre"]
    cc._carrera._descripcion = data["descripcion"]
    cc._carrera._duracion = data["duracion"]
    cc._carrera._titulo_otorgado = data["titulo_otorgado"]
    if cc.save():
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al guardar la carrera"}), 500


@jwt_required
@admin.route("/careers", methods=["GET"])
def get_careers():
    data = cc._to_dict()
    return jsonify(data), 201


@jwt_required
@admin.route("/careers/<int:id>", methods=["GET"])
def get_career(id):
    career = cc.get(id)
    return jsonify(career), 201


@jwt_required
@admin.route("/careers/<int:id>", methods=["PUT"])
def update_career(id):
    data = request.json
    cc._carrera._nombre = data["nombre"]
    cc._carrera._descripcion = data["descripcion"]
    cc._carrera._duracion = data["duracion"]
    cc._carrera._titulo_otorgado = data["titulo_otorgado"]
    if cc.update(id):
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al actualizar la carrera"}), 500


# @admin.route("/careers/<int:id>", methods=["DELETE"])
# def delete_career(id):
#     if cc.delete(id):
#         return jsonify({"msg": "Carrera eliminada"}), 201
#     else:
#         return jsonify({"msg": "Error al eliminar la carrera"}), 500


# ----------------------------------------------------------------------------------------
# Mallas Academicas
# @jwt_required
@admin.route("/meshes", methods=["POST"])
def create_mesh():
    try:
        data = request.json

        mc._malla._descripcion = data["descripcion"]
        mc._malla._fecha_registro = datetime.strptime(
            data["fecha_registro"], "%Y-%m-%d"
        )
        mc._malla._estado = int(data["estado"])
        mc._malla._carrera_id = int(data["carrera_id"])

        if mc.save():
            return jsonify(data), 201
        else:
            return jsonify({"msg": "Error al guardar la malla"}), 500
    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({"msg": f"Error procesando la solicitud: {e}"}), 500


@admin.route("/meshes", methods=["GET"])
def get_meshes():
    data = mc._to_dict()
    return jsonify(data), 201


@jwt_required
@admin.route("/meshes/<int:id>", methods=["GET"])
def get_mesh(id):
    mash = mc._find(id)
    return jsonify(mash), 201


@jwt_required
@admin.route("/meshes/<int:id>", methods=["PUT"])
def update_mesh(id):
    data = request.json
    print(data)
    mc._malla._descripcion = data["descripcion"]
    mc._malla._carrera_id = data["carrera_id"]
    mc._malla._estado = data["estado"]
    mc._malla._fecha_registro = datetime.strptime(data["fecha_registro"], "%Y-%m-%d")
    if mc.update(id):
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al actualizar la malla"}), 500


# ----------------------------------------------------------------------------------------
# Asignaturas


@admin.route("/subjects", methods=["GET"])
def get_subjects():
    data = ac._to_dict()
    return jsonify(data), 201


@jwt_required
@admin.route("/subjects", methods=["POST"])
def create_subject():
    data = request.json
    print(data)
    ac._asignatura._nombre = data["nombre"]
    ac._asignatura._descripcion = data["descripcion"]
    ac._asignatura._malla_id = data["malla_id"]
    ac._asignatura._grupo_id = data["grupo_id"]
    ac._asignatura._ciclo_id = data["ciclo_id"]
    ac._asignatura._total_horas = data["total_horas"]

    if ac.save():
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al guardar la asignatura"}), 500


@jwt_required
@admin.route("/subjects/<int:id>", methods=["GET"])
def get_subject(id):
    subject = ac._find(id)
    return jsonify(subject), 201


@jwt_required
@admin.route("/subjects/<int:id>", methods=["PUT"])
def update_subject(id):
    data = request.json
    ac._asignatura._nombre = data["nombre"]
    ac._asignatura._descripcion = data["descripcion"]
    ac._asignatura._malla_id = data["malla_id"]
    ac._asignatura._grupo_id = data["grupo_id"]
    ac._asignatura._ciclo_id = data["ciclo_id"]
    ac._asignatura._total_horas = data["total_horas"]
    if ac.update(id):
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al actualizar la asignatura"}), 500


# ----------------------------------------------------------------------------------------
# Grupos
@jwt_required
@admin.route("/groups", methods=["POST"])
def create_group():
    data = request.json
    gc._grupo._nombre = data["nombre"]
    gc._grupo._descripcion = data["descripcion"]

    if gc.save():
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al guardar el grupo"}), 500


@jwt_required
@admin.route("/groups", methods=["GET"])
def get_groups():
    data = gc._to_dict()
    return jsonify(data), 201


@jwt_required
@admin.route("/groups/<int:id>", methods=["GET"])
def get_group(id):
    group = gc._find(id)
    return jsonify(group), 201


@jwt_required
@admin.route("/groups/<int:id>", methods=["PUT"])
def update_group(id):
    data = request.json
    gc._grupo._nombre = data["nombre"]
    gc._grupo._descripcion = data["descripcion"]
    if gc.update(id):
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al actualizar el grupo"}), 500
