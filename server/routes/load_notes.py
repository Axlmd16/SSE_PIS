from flask import Blueprint
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from controls.cargar_notas.cursaControlDao import CursaControl
from controls.cargar_notas.estudiante_cursa_control import EstudianteCursaControl

load_notes = Blueprint("load_notes", __name__)


cursa_control = CursaControl()
estudiante_cursa_control = EstudianteCursaControl()

@jwt_required
@load_notes.route("/cursa", methods=["GET"])
def get_info_cursa():
    cursa_info_completa =cursa_control.get_cursa_info_completa()
    return jsonify(cursa_info_completa), 200

@jwt_required
@load_notes.route('/cursa', methods=['POST'])
def guardar_cursa():
    data = request.json
    cursa_control._cursa._paralelo = data["paralelo"]
    cursa_control._cursa._asignacion_id = data["id_docente_asignatura"]
    if cursa_control.save():
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al guardar el Curso"}), 500

@jwt_required
@load_notes.route("/estudiante_cursa", methods=["GET"])
def get_info_estudiantes_cursa():
    estudiante_cursa_info_completa = estudiante_cursa_control.get_estudiante_cursa_info_completa()
    return jsonify(estudiante_cursa_info_completa), 200

@jwt_required
@load_notes.route('/estudiante_cursa', methods=['POST'])
def guardar_estudiante_cursa():
    data = request.json
    estudiante_cursa_control._estudiante_cursa._estudiante_id = data["id_estudiante"]
    estudiante_cursa_control._estudiante_cursa._cursa_id = data["id_cursa"]
    if estudiante_cursa_control.save():
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al guardar el Curso"}), 500