from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from controls.admin.carrera_control import CarreraControl
from controls.admin.malla_control import MallaControl
from controls.admin.asignatura_control import AsignaturaControl
from controls.admin.grupo_control import GrupoControl
from controls.admin.unidad_control import UnidadControl
from controls.reportes.util import Util
from controls.cargar_notas.unidad_estudiante_control import UnidadEstudianteControl
from controls.academic.estudiante_control import EstudianteControl
from controls.admin.criterio_control import CriterioControl
from controls.cargar_notas.nota_criterio_control import NotaCriterioControl
from controls.admin.ciclo_control import CicloControl

admin = Blueprint("admin", __name__)

cc = CarreraControl()
mc = MallaControl()
ac = AsignaturaControl()
gc = GrupoControl()
uc = UnidadControl()
uec = UnidadEstudianteControl()
estudiante_control = EstudianteControl()
crc = CriterioControl()
ncc = NotaCriterioControl()
clc = CicloControl()


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


# ----------------------------------------------------------------------------------------
# Unidades
@jwt_required
@admin.route("/units/<int:curso_id>", methods=["POST"])
def create_unit(curso_id):
    try:
        data = request.json
        uc._unidad._nombre = data["nombre"]
        uc._unidad._nro_unidad = int(data["nro_unidad"])
        uc._unidad._nro_semanas = int(data["nro_semanas"])
        uc._unidad._fecha_inicio = datetime.strptime(data["fecha_inicio"], "%Y-%m-%d")
        uc._unidad._fecha_fin = datetime.strptime(data["fecha_fin"], "%Y-%m-%d")
        uc._unidad._asignatura_id = int(data["asignatura_id"])

        id_unidad = uc.save()
        estudiantes_cursas = Util().estudiantes_por_curso(curso_id)
        criterios = crc._to_dict()

        for estudiante in estudiantes_cursas:
            uec._unidad_estudiante._unidad_id = int(id_unidad)
            uec._unidad_estudiante._estudiante_cursa_id = int(
                estudiante["id_estudiante_cursa"]
            )
            id_unidad_estudiante = uec.save()

            for criterio in criterios:
                ncc._nota_criterio._unidad_estudiante_id = int(id_unidad_estudiante)
                ncc._nota_criterio._criterio_id = int(criterio["id"])
                ncc.save()

        return jsonify(data), 201

    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({"msg": f"Error procesando la solicitud: {e}"}), 500


@jwt_required
@admin.route("/units", methods=["GET"])
def get_units():
    data = uc._to_dict()
    return jsonify(data), 201


@jwt_required
@admin.route("/units/<int:id>", methods=["GET"])
def get_unit(id):
    unit = uc._find(id)
    print(unit)
    return jsonify(unit), 201


@jwt_required
@admin.route("/units/<int:id>", methods=["PUT"])
def update_unit(id):
    data = request.json
    uc._unidad._nombre = data["nombre"]
    uc._unidad._nro_unidad = data["nro_unidad"]
    uc._unidad._nro_semanas = data["nro_semanas"]
    uc._unidad._fecha_inicio = datetime.strptime(data["fecha_inicio"], "%Y-%m-%d")
    uc._unidad._fecha_fin = datetime.strptime(data["fecha_fin"], "%Y-%m-%d")
    uc._unidad._asignatura_id = data["asignatura_id"]

    if uc.update(id):
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al actualizar la unidad"}), 500


# ----------------------------------------------------------------------------------------
# Ciclos


@jwt_required
@admin.route("/cycles", methods=["POST"])
def create_cycle():
    data = request.json
    clc._ciclo._ciclo = data["ciclo"]

    if clc.save():
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al guardar el ciclo"}), 500


@jwt_required
@admin.route("/cycles", methods=["GET"])
def get_cycles():
    data = clc._to_dict()
    return jsonify(data), 201


@jwt_required
@admin.route("/cycles/<int:id>", methods=["GET"])
def get_cycle(id):
    cycle = clc._find(id)
    return jsonify(cycle), 201


@jwt_required
@admin.route("/cycles/<int:id>", methods=["PUT"])
def update_cycle(id):
    data = request.json
    clc._ciclo._ciclo = data["ciclo"]
    if clc.update(id):
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al actualizar el ciclo"}), 500
