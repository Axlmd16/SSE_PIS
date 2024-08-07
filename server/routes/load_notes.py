import datetime
from flask import Blueprint
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from controls.cargar_notas.cursaControlDao import CursaControl
from controls.cargar_notas.estudiante_cursa_control import EstudianteCursaControl
from asyncio import run
import asyncio

from controls.cargar_notas.matricula_control import MatriculaControl
from controls.cargar_notas.nota_criterio_control import NotaCriterioControl
from controls.admin.asignatura_control import AsignaturaControl
from controls.cargar_notas.cursaControlDao import CursaControl
from controls.academic.asignacion_control import AsignacionControl
from controls.admin.unidad_control import UnidadControl
from controls.tda.list.linked_list import Linked_List
from controls.cargar_notas.unidad_estudiante_control import UnidadEstudianteControl
from controls.admin.criterio_control import CriterioControl

load_notes = Blueprint("load_notes", __name__)

cursa_control = CursaControl()
estudiante_cursa_control = EstudianteCursaControl()
mc = MatriculaControl()
ncc = NotaCriterioControl()
ac = AsignacionControl()
asigc = AsignaturaControl()
uc = UnidadControl()
ue = UnidadEstudianteControl()
crc = CriterioControl()


@jwt_required
@load_notes.route("/cursa", methods=["GET"])
def get_info_cursa():
    """
    Obtiene la lista de diccionarios de cursas.

    Returns:
        Response: JSON con la lista de diccionarios de cursas y un código de estado HTTP 200.
    """
    cursa_info_completa = cursa_control.get_cursa_info_completa()
    return jsonify(cursa_info_completa), 200


@jwt_required
@load_notes.route("/cursa", methods=["POST"])
def guardar_cursa():
    """
    Guarda una nueva cursa.

    Esta solicitud POST recibe los datos de la cursa en formato JSON. Los datos 
    necesarios incluyen paralelo, id_docente_asignatura e id_ciclo.

    Returns:
        Response:
                - Si la cursa se guarda correctamente, se devuelve un mensaje de éxito con un código de estado HTTP 201.
                - Si ocurre un error al guardar la cursa, se devuelve un mensaje de error con un código de estado HTTP 500.
    """
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
    """
    Actualiza una cursa existente.

    Esta solicitud PUT recibe los datos actualizados de la cursa en formato JSON.
    Se requiere que el identificador de la cursa se pase como un parámetro en la URL.
    Los datos a actualizar incluyen id_docente_asignatura, paralelo e id_ciclo.

    Args:
        id (int): Identificador de la cursa a actualizar.

    Returns:
        Response: Un objeto de respuesta JSON con un mensaje de éxito o error y un código de estado HTTP 201 o 500.
    """
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
    """
    Obtiene la lista de diccionarios de estudiantes en cursa.

    Returns:
        Response: JSON con la lista de diccionarios de estudiantes en cursa y un código de estado HTTP 200.
    """
    estudiante_cursa_info_completa = (
        estudiante_cursa_control.get_estudiante_cursa_info_completa()
    )
    return jsonify(estudiante_cursa_info_completa), 200


@jwt_required()
@load_notes.route("/estudiante_cursa", methods=["POST"])
def guardar_estudiante_cursa():
    """
    Guarda un nuevo estudiante en cursa.

    Esta solicitud POST recibe los datos del estudiante en cursa en formato JSON. Los datos 
    necesarios incluyen id_estudiante, id_cursa y nro_de_matricula.

    Returns:
        Response:
                - Si el estudiante en cursa se guarda correctamente, se devuelve un mensaje de éxito con un código de estado HTTP 201.
                - Si ocurre un error al guardar el estudiante en cursa, se devuelve un mensaje de error con un código de estado HTTP 500.
    """
    try:
        data = request.json
        estudiante_id = int(data["id_estudiante"])
        cursa_id = int(data["id_cursa"])

        # Guardar estudiante en cursa
        estudiante_cursa_control._estudiante_cursa._estudiante_id = estudiante_id
        estudiante_cursa_control._estudiante_cursa._cursa_id = cursa_id
        id_estudiante_cursa = estudiante_cursa_control.save()

        # Guardar matrícula
        mc._matricula._estudiante_cursa_id = id_estudiante_cursa
        mc._matricula._codigo_matricula = mc.generate_cod_matricula()
        mc._matricula._nro_de_matricula = data["nro_de_matricula"]
        mc._matricula._fecha_matricula = datetime.datetime.now()
        mc.save()

        # Obtener cursa y asignatura
        cursa = cursa_control._find(cursa_id)
        asignacion = ac._find(cursa["asignacion_id"])
        asignatura = asigc._find(asignacion["asignatura_id"])

        # Obtener unidades de la asignatura
        unidades = [
            unidad for unidad in uc.list() if unidad._asignatura_id == asignatura["id"]
        ]

        # Guardar unidad_estudiante y notas de criterio si hay unidades
        if unidades:
            criterios = crc._to_dict()
            for unidad in unidades:
                ue._unidad_estudiante._unidad_id = unidad._id
                ue._unidad_estudiante._estudiante_cursa_id = int(id_estudiante_cursa)
                id_unidad_estudiante = ue.save()

                for criterio in criterios:
                    ncc._nota_criterio._unidad_estudiante_id = id_unidad_estudiante
                    ncc._nota_criterio._criterio_id = int(criterio["id"])
                    ncc._nota_criterio._nota_criterio = 0
                    ncc.save()

        return jsonify({"msg": "Estudiante cursa guardado correctamente"}), 201

    except Exception as e:
        return jsonify({"msg": f"Error al guardar el Estudiante cursa: {str(e)}"}), 500


@jwt_required
@load_notes.route("/estudiante_cursa/<int:id>", methods=["PUT"])
def actualizar_estudiante_cursa(id):
    """
    Actualiza un estudiante en cursa existente.

    Esta solicitud PUT recibe los datos actualizados del estudiante en cursa en formato JSON.
    Se requiere que el identificador del estudiante en cursa se pase como un parámetro en la URL.
    Los datos a actualizar incluyen id_estudiante e id_cursa.

    Args:
        id (int): Identificador del estudiante en cursa a actualizar.

    Returns:
        Response: Un objeto de respuesta JSON con un mensaje de éxito o error y un código de estado HTTP 201 o 500.
    """
    try:
        data = request.json

        # Actualizar estudiante en cursa
        estudiante_cursa_control._estudiante_cursa._estudiante_id = data[
            "id_estudiante"
        ]
        estudiante_cursa_control._estudiante_cursa._cursa_id = data["id_cursa"]
        estudiante_cursa_control.update(id)

        # Actualizar matrícula
        mc._matricula._estudiante_cursa_id = id
        mc._matricula._codigo_matricula = mc.generate_cod_matricula()
        mc._matricula._nro_de_matricula = data["nro_de_matricula"]
        mc._matricula._fecha_matricula = datetime.datetime.now()
        mc.update(id)

        return jsonify({"msg": "Estudiante cursa actualizado correctamente"}), 201
    except Exception as e:
        return jsonify({"msg": "Error al guardar el Cursa"}), 500


# TODO: Implementar la actualización de la matrícula

@jwt_required
@load_notes.route("/notas_criterio/<int:id>", methods=["PUT"])
def actualizar_nota_criterio(id):
    """
    Actualiza una nota de criterio existente.

    Esta solicitud PUT recibe los datos actualizados de la nota de criterio en formato JSON.
    Se requiere que el identificador de la nota de criterio se pase como un parámetro en la URL.
    Los datos a actualizar incluyen unidad_estudiante_id, criterio_id y nota_criterio.

    Args:
        id (int): Identificador de la nota de criterio a actualizar.

    Returns:
        Response: Un objeto de respuesta JSON con un mensaje de éxito o error y un código de estado HTTP 201 o 500.
    """
    try:
        data = request.json

        ncc._nota_criterio._unidad_estudiante_id = data["unidad_estudiante_id"]
        ncc._nota_criterio._criterio_id = data["criterio_id"]
        ncc._nota_criterio._nota_criterio = data["nota_criterio"]

        if ncc.update(id):
            return jsonify({"msg": "Nota criterio actualizada correctamente"}), 201
        else:
            return jsonify({"msg": "Error al guardar la nota criterio"}), 500

        # return jsonify({"msg": "Nota criterio actualizada correctamente"}), 201

    except Exception as e:
        return jsonify({"msg": "Error al guardar la nota criterio"}), 500
