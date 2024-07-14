from flask import Blueprint, request, jsonify

from controls.reportes.util import Util

reports = Blueprint("reports", __name__)


@reports.route("/cursos_detalle", methods=["GET"])
def get_cursa_info():
    try:
        data = Util().get_cursos()
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@reports.route("/asig_by_curso/<int:ciclo_id>/<string:paralelo>", methods=["GET"])
def get_asignaturas_por_curso(ciclo_id, paralelo):
    try:
        data = Util().get_asignaturas_por_curso(paralelo, ciclo_id)
        print(data)
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@reports.route("/units_by_asig/<int:asignatura_id>", methods=["GET"])
def get_units_by_asignatura(asignatura_id):
    try:
        data = Util().get_units_by_asignatura(asignatura_id)
        data = sorted(data, key=lambda x: x["nro_unidad"])

        return jsonify(data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@reports.route("/students_by_course/<int:curso_id>", methods=["GET"])
def get_notas_curso_estudiantes(curso_id):
    try:
        data = Util().estudiantes_por_curso(curso_id)
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@reports.route(
    "/notes_by_course_students/<int:curso_id>/<int:asignatura_id>", methods=["GET"]
)
def get_estudiantes_por_curso(curso_id, asignatura_id):
    try:
        data = Util().get_notas_por_curso_y_estudiantes(curso_id, asignatura_id)
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@reports.route("/notes_by_criterio/<int:unidad_id>/<int:cursa_id>", methods=["GET"])
def get_notas_criterio_por_unidad(unidad_id, cursa_id):
    try:
        data = Util().get_notas_criterio_por_unidad(unidad_id, cursa_id)
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500
