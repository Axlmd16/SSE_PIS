from flask import Blueprint, request, jsonify

from controls.reportes.util import Util

reports = Blueprint("reports", __name__)


@reports.route("/asig_by_curso/<int:curso_id>", methods=["GET"])
def get_asignaturas_por_curso(curso_id):
    try:
        data = Util().get_asignaturas_por_curso(curso_id)
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@reports.route("/units_by_asig/<int:asignatura_id>", methods=["GET"])
def get_units_by_asignatura(asignatura_id):
    try:
        data = Util().get_units_by_asignatura(asignatura_id)
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@reports.route("/students_by_course/<int:curso_id>", methods=["GET"])
def get_estudiantes_por_curso(curso_id):
    try:
        data = Util().get_estudiantes_por_curso(curso_id)
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@reports.route("/notes_by_criterio/<int:unidad_id>", methods=["GET"])
def get_notas_criterio_por_unidad(unidad_id):
    try:
        data = Util().get_notas_criterio_por_unidad(unidad_id)
        return jsonify(data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500
