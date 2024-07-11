from flask import Blueprint
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from controls.cargar_notas.cursaControlDao import CursaControl
from controls.cargar_notas.estudiante_cursa_control import EstudianteCursaControl
from asyncio import run
import asyncio

load_notes = Blueprint("load_notes", __name__)

cursa_control = CursaControl()
estudiante_cursa_control = EstudianteCursaControl()


@jwt_required
@load_notes.route("/cursa", methods=["GET"])
def get_info_cursa():
    cursa_info_completa = cursa_control.get_cursa_info_completa()
    return jsonify(cursa_info_completa), 200


@jwt_required
@load_notes.route("/cursa", methods=["POST"])
def guardar_cursa():
    try:
        data = request.json
        cursa_control._cursa._paralelo = data["paralelo"]
        cursa_control._cursa._asignacion_id = data["id_docente_asignatura"]
        cursa_control._cursa._ciclo_id = data["id_ciclo"]
        cursa_control.save()
        return jsonify({"msg": "Cursa guardada correctamente"}), 201
    except Exception as e:
        return jsonify({"msg": "Error al guardar el Cursa"}), 500


@jwt_required
@load_notes.route("/cursa/<int:id>", methods=["PUT"])
def actualizar_cursa(id):
    try:
        data = request.json
        # print("\n\n\n")
        # print(id)
        # print(data)
        # print("\n\n\n")
        cursa_control._cursa._asignacion_id = data["id_docente_asignatura"]
        cursa_control._cursa._paralelo = data["paralelo"]
        cursa_control._cursa._ciclo_id = data["id_ciclo"] 
        cursa_control.update(id)
        return jsonify({"msg": "Cursa guardada correctamente"}), 201
    except Exception as e:
        return jsonify({"msg": "Error al guardar el Cursa"}), 500


@jwt_required
@load_notes.route("/estudiante_cursa", methods=["GET"])
def get_info_estudiantes_cursa():
    estudiante_cursa_info_completa = (
        estudiante_cursa_control.get_estudiante_cursa_info_completa()
    )
    return jsonify(estudiante_cursa_info_completa), 200


@jwt_required
@load_notes.route("/estudiante_cursa", methods=["POST"])
def guardar_estudiante_cursa():
    try:
        data = request.json
        estudiante_cursa_control._estudiante_cursa._estudiante_id = data[
            "id_estudiante"
        ]
        estudiante_cursa_control._estudiante_cursa._cursa_id = data["id_cursa"]
        estudiante_cursa_control.save()
        return jsonify({"msg": "Estudiante Cursa guardado correctamente"}), 201
    except Exception as e:
        return jsonify({"msg": "Error al guardar el Curso"}), 500


@jwt_required
@load_notes.route("/estudiante_cursa/<int:id>", methods=["PUT"])
def actualizar_estudiante_cursa(id):
    try:
        data = request.json
        print("\n\n\n")
        print(id)
        print(data)
        print("\n\n\n")
        estudiante_cursa_control._estudiante_cursa._estudiante_id = data[
            "id_estudiante"
        ]
        estudiante_cursa_control._estudiante_cursa._cursa_id = data["id_cursa"]
        estudiante_cursa_control.update(id)
        return jsonify({"msg": "Cursa guardada correctamente"}), 201
    except Exception as e:
        return jsonify({"msg": "Error al guardar el Cursa"}), 500
