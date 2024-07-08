from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from controls.academic.estudiante_control import EstudianteControl
from controls.academic.docente_control import DocenteControl
from controls.academic.asignacion_control import AsignacionControl
from controls.inicio_sesion.genero_control import GeneroControl
from controls.inicio_sesion.persona_control import PersonaControl
from controls.inicio_sesion.tipo_ide_control import TipoIdeControl
from controls.admin.asignatura_control import AsignaturaControl
from controls.academic.periodo_academico_control import PeriodoAcademicoControl
from asyncio import run

from controls.reportes.util import Util

academic = Blueprint("academic", __name__)

persona_control = PersonaControl()
estudiante_control = EstudianteControl()
docente_control = DocenteControl()
asignacion_docente_control = AsignacionControl()
genero_control = GeneroControl()
periodo_academico_control = PeriodoAcademicoControl()
asignatura_control = AsignaturaControl()
tipo_identificacion_control = TipoIdeControl()

# * Para formularios de Estudiante Y Docente


# ? OBTENER TODOS LOS GENEROS
@jwt_required()
@academic.route("/generos", methods=["GET"])
def get_generos_estudiantes():
    data = genero_control._to_dict()
    return jsonify(data), 200


# ? OBTENER TODOS LOS TIPO DE IDENTIFICACION
@jwt_required()
@academic.route("/tipo_identificacion", methods=["GET"])
def get_tipo_identificacion():
    data = tipo_identificacion_control._to_dict()
    return jsonify(data), 200


# ? OBTENER TODOS LAS ASIGNATURAS
@jwt_required()
@academic.route("/asignaturas", methods=["GET"])
def get_asignaturas():
    data = asignatura_control._to_dict()
    return jsonify(data), 200


# ? OBTENER TODOS LOS PERIODOS ACADEMICOS
@jwt_required()
@academic.route("/periodos_academicos", methods=["GET"])
def get_periodos_academicos():
    data = periodo_academico_control._to_dict()
    for periodo in data:
        periodo["fecha_inicio"] = periodo["fecha_inicio"].strftime("%d/%m/%Y")
        periodo["fecha_fin"] = periodo["fecha_fin"].strftime("%d/%m/%Y")

    return jsonify(data), 200


# * -----------Estudiantes------------


# ? Listar todos los estudiantes
@jwt_required
@academic.route("/estudiantes", methods=["GET"])
def get_estudiantes():
    data_estudiantes = estudiante_control.list_with_person_details()
    return jsonify(data_estudiantes), 201


# ? Guardar un estudiante
@jwt_required
@academic.route("/estudiantes", methods=["POST"])
def guardar_estudiante():
    data = request.get_json()
    primer_nombre = data["primer_nombre"]
    segundo_nombre = data["segundo_nombre"]
    primer_apellido = data["primer_apellido"]
    segundo_apellido = data["segundo_apellido"]
    telefono = data["telefono"]
    dni = data["dni"]
    email = data["email"]
    fecha_nacimiento = data["fecha_nacimiento"]
    tipo_identificacion_id = data["tipo_identificacion"]
    genero_id = data["genero_id"]
    # ? INfo Estudainte
    codigo_estudiante = data["codigo_estudiante"]
    numero_matricula = data["nro_matricula"]
    if estudiante_control.save(
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        telefono,
        dni,
        fecha_nacimiento,
        email,
        tipo_identificacion_id,
        genero_id,
        codigo_estudiante,
        numero_matricula,
    ):

        return jsonify(message="Persona guardada correctamente"), 201
    else:
        return jsonify({"msg": "Error al guardar el Estudiante"}), 500


# ? Modificar un estudiante
@jwt_required
@academic.route("/estudiantes/<int:id>", methods=["PUT"])
def update_estudiante(id):
    try:
        data = request.json
        persona_control._persona._primer_nombre = data["primer_nombre"]
        persona_control._persona._segundo_nombre = data["segundo_nombre"]
        persona_control._persona._primer_apellido = data["primer_apellido"]
        persona_control._persona._segundo_apellido = data["segundo_apellido"]
        persona_control._persona._telefono = data["telefono"]
        persona_control._persona._dni = data["dni"]
        persona_control._persona._fecha_nacimiento = data["fecha_nacimiento"]
        persona_control._persona._email = data["email"]
        persona_control._persona._tipo_identificacion_id = data[
            "tipo_identificacion_id"
        ]
        persona_control._persona._genero_id = data["genero_id"]
        if persona_control.update(id):
            estudiante_control._estudiante._nro_matricula = data["nro_matricula"]
            estudiante_control._estudiante._codigo_estudiante = data[
                "codigo_estudiante"
            ]
            if estudiante_control.update(id):
                return jsonify(data), 201
    except Exception as e:
        print(f"Error al actualizar el Estudiante: {e}")


# *--------------DOCENTES----------------


# ? Listar todos los docentes
@jwt_required
@academic.route("/docentes", methods=["GET"])
def get_docentes():
    data_docentes = docente_control.list_with_person_details()
    return jsonify(data_docentes), 201


# ? Guardar un docente
@jwt_required
@academic.route("/docentes", methods=["POST"])
def guardar_docente():
    data = request.get_json()
    primer_nombre = data["primer_nombre"]
    segundo_nombre = data["segundo_nombre"]
    primer_apellido = data["primer_apellido"]
    segundo_apellido = data["segundo_apellido"]
    telefono = data["telefono"]
    dni = data["dni"]
    email = data["email"]
    fecha_nacimiento = data["fecha_nacimiento"]
    tipo_identificacion_id = data["tipo_identificacion"]
    genero_id = data["genero_id"]
    # ? INfo Estudainte
    titulo = data["titulo"]
    experiencia_laboral = data["experiencia_laboral"]
    cubiculo = data["cubiculo"]
    if docente_control.save(
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        telefono,
        dni,
        fecha_nacimiento,
        email,
        tipo_identificacion_id,
        genero_id,
        titulo,
        experiencia_laboral,
        cubiculo,
    ):
        return jsonify(message="Persona guardada correctamente"), 201
    else:
        return jsonify({"msg": "Error al guardar el Estudiante"}), 500


# ? Modificar un docente
@jwt_required
@academic.route("/docentes/<int:id>", methods=["PUT"])
def update_docente(id):
    try:
        data = request.json
        persona_control._persona._primer_nombre = data["primer_nombre"]
        persona_control._persona._segundo_nombre = data["segundo_nombre"]
        persona_control._persona._primer_apellido = data["primer_apellido"]
        persona_control._persona._segundo_apellido = data["segundo_apellido"]
        persona_control._persona._telefono = data["telefono"]
        persona_control._persona._dni = data["dni"]
        persona_control._persona._fecha_nacimiento = data["fecha_nacimiento"]
        persona_control._persona._email = data["email"]
        persona_control._persona._tipo_identificacion_id = data[
            "tipo_identificacion_id"
        ]
        persona_control._persona._genero_id = data["genero_id"]
        if persona_control.update(id):
            docente_control._docente._titulo = data["titulo"]
            docente_control._docente._experiencia_laboral = data["experiencia_laboral"]
            docente_control._docente._cubiculo = data["cubiculo"]
            if docente_control.update(id):
                return jsonify(data), 201
    except Exception as e:
        print(f"Error al actualizar el docente: {e}")


# *--------------ASIGNACION----------------


# ? Listar todas los docentes con su asignatura
@jwt_required
@academic.route("/asignacion_docente_asignatura", methods=["GET"])
def get_asignacion_docente_info_completa():
    asignacion_info_completa = run(
        asignacion_docente_control.get_asignacion_info_completa()
    )
    return jsonify(asignacion_info_completa), 200


# ? Guardar una asignaciond de un docente con una asignatura
@jwt_required
@academic.route("/asignacion_docente_asignatura", methods=["POST"])
def guardar_docente_asignado():
    try:
        data = request.json
        asignacion_docente_control._asignacion._docente_id = data["id_docente"]
        asignacion_docente_control._asignacion._asignatura_id = data["id_asignatura"]
        asignacion_docente_control._asignacion._periodo_academico_id = data[
            "id_periodo_academico"
        ]
        asignacion_docente_control.save()

        return jsonify({"message": "Asignación guardada correctamente"}), 201

    except Exception as e:
        print(f"Error al guardar el docente: {e}")
        return jsonify({"error": "Error al guardar la asignación"}), 500


@jwt_required
@academic.route("/asignacion_docente_asignatura/<int:id>", methods=["PUT"])
def update_docente_asignado(id):
    try:
        data = request.json
        # print("\n\n\n\n")
        # print(data)
        # print(id)
        # print("\n\n\n\n")
        asignacion_docente_control._asignacion._docente_id = data["id_docente"]
        asignacion_docente_control._asignacion._asignatura_id = data["id_asignatura"]
        asignacion_docente_control._asignacion._periodo_academico_id = data[
            "id_periodo_academico"
        ]
        asignacion_docente_control.update(id)
        return jsonify({"message": "Asignación guardada correctamente"}), 201

    except Exception as e:
        print(f"Error al guardar el docente_asignatura: {e}")
        return jsonify({"error": "Error al guardar la asignación"}), 500


@jwt_required
@academic.route("/cursos_docente/<int:id>", methods=["GET"])
def get_cursos_docente(id):
    data = Util().get_cursos_por_docente(id)
    return jsonify(data), 200
