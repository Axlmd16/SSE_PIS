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
    """
    Obtiene la lista de diccionarios de generos.

    Returns:
        Response: JSON con la lista de diccionarios de generos y un codigo de estado HTTP 200.
    """
    data = genero_control._to_dict()
    return jsonify(data), 200


# ? OBTENER TODOS LOS TIPO DE IDENTIFICACION
@jwt_required()
@academic.route("/tipo_identificacion", methods=["GET"])
def get_tipo_identificacion():
    """
    Obtiene la lista de diccionarios  de tipo identificacion.

    Returns:
        Response: JSON con la lista de diccionarios  de tipo identificacion y un codigo de estado HTTP 200.
    """
    data = tipo_identificacion_control._to_dict()
    return jsonify(data), 200


# ? OBTENER TODOS LAS ASIGNATURAS
@jwt_required()
@academic.route("/asignaturas", methods=["GET"])
def get_asignaturas():
    """
    Obtiene la lista de diccionarios  de generos.

    Returns:
        Response: JSON con la lista de diccionarios de generos y un codigo de estado HTTP 200.
    """
    data = asignatura_control._to_dict()
    return jsonify(data), 200

# * -----------Estudiantes------------


# ? Listar todos los estudiantes
@jwt_required
@academic.route("/estudiantes", methods=["GET"])
def get_estudiantes():
    """
    Obtiene la lista de diccionarios de estudiantes.

    Returns:
        Response: JSON con la lista de diccionarios de estudiantes y un codigo de estado HTTP 200.
    """
    data_estudiantes = estudiante_control.list_with_person_details()
    return jsonify(data_estudiantes), 200


# ? Guardar un estudiante
@jwt_required
@academic.route("/estudiantes", methods=["POST"])
def guardar_estudiante():
    """
    Guarda un nuevo estudiante en el sistema.

    Esta solicitud POST recibe los datos del estudiante en formato JSON. Los datos 
    necesarios incluyen nombres, apellidos, telefono, DNI, email, fecha de nacimiento,
    tipo de identificacion, id genero y codigo de estudiante.

    Returns:
        Response:
                - Si el estudiante se guarda correctamente, se devuelve un mensaje de exito con un codigo de estado HTTP 201.
                - Si falta algun campo, se devuelve un mensaje de error con un cdigo de estado HTTP 400.
                - Si ocurre un error al guardar el estudiante, se devuelve un mensaje de error con un cdigo de estado HTTP 500.
    """
    data = request.get_json()
    required_fields = [
        "primer_nombre",
        "segundo_nombre",
        "primer_apellido",
        "segundo_apellido",
        "telefono",
        "dni",
        "email",
        "fecha_nacimiento",
        "tipo_identificacion",
        "genero_id",
        "codigo_estudiante",
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"msg": f"Falta el campo {field}"}), 400

    saved = estudiante_control.save(
        data["primer_nombre"],
        data["segundo_nombre"],
        data["primer_apellido"],
        data["segundo_apellido"],
        data["telefono"],
        data["dni"],
        data["fecha_nacimiento"],
        data["email"],
        data["tipo_identificacion"],
        data["genero_id"],
        data["codigo_estudiante"],
    )

    if saved:
        return jsonify(message="Estudiante guardado correctamente"), 201
    else:
        return jsonify({"msg": "Error al guardar el estudiante"}), 201


# ? Modificar un estudiante
@jwt_required
@academic.route("/estudiantes/<int:id>", methods=["PUT"])
def update_estudiante(id):
    """
    Modifica los detalles de un estudiante.

    Esta solicitud PUT recibe los datos actualizados del estudiante en formato JSON.
    Se requiere que el identificador del estudiante se pase como un parametro en la URL.
    Los datos a actualizar incluyen nombres, apellidos, telefono, DNI, email, fecha de nacimiento,
    tipo de identificacion, genero y codigo de estudiante. 

    Args:
        id (int): Identificador del estudiante a modificar.

    Returns:
        Response: Un objeto de respuesta JSON con los datos actualizados del estudiante y un codigo de estado HTTP 201.
    """
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
            estudiante_control._estudiante._codigo_estudiante = data[
                "codigo_estudiante"
            ]
            if estudiante_control.update(id):
                return jsonify(data), 201

    except Exception as e:
        print(f"Error al actualizar el Estudiante: {e}")


# *--------------DOCENTES----------------


# ? Obtener un docente
@jwt_required
@academic.route("/obtener_docente", methods=["POST"])
def obtener_docente():
    """
    Obtiene la informacion de un docente mediante un ID.

    Este solicitud POST recibe el ID del docente en la solicitud en formato JSON.
    Busca en la lista de docentes y devuelve la informacion del docente si se encuentra.

    Returns:
        Response: Un objeto de respuesta JSON con la informacion del docente y un codigo de estado HTTP 200 si el docente es encontrado.
                  Si no se encuentra el docente, devuelve un mensaje de error con un codigo de estado HTTP 401.
    """
    data = request.get_json()
    # print(data)
    id_docente = int(data)
    # print("ID a buscar: ", id_docente)

    # Obtener la lista de docentes
    docentes = docente_control._list_docente()

    # Buscar el docente con el ID especificado
    docente_encontrado = None
    for docente in docentes:
        if docente["id"] == id_docente:
            docente_encontrado = docente
            break

    # Comprobar si se encontro el docente
    if docente_encontrado:
        # print("\n\n\n\nDocente Encontrado")
        # print(docente_encontrado)
        # print("\n\n\n\n")
        return jsonify(docente_encontrado), 200
    else:
        print("Docente no encontrado")
        return jsonify({"error": "Docente no encontrado"}), 400


# ? Listar todos los docentes
@jwt_required
@academic.route("/docentes", methods=["GET"])
def get_docentes():
    """
    Obtiene la lista de diccionarios de docentes.

    Returns:
        Response: JSON con la lista de diccionarios de docentes y un codigo de estado HTTP 200.
    """
    data_docentes = docente_control.list_with_person_details()
    return jsonify(data_docentes), 200


# ? Guardar un docente
@jwt_required
@academic.route("/docentes", methods=["POST"])
def guardar_docente():
    """
    Guarda un nuevo docente.

    Esta solicitud POST recibe los datos del docente en formato JSON. Los datos 
    necesarios incluyen nombres, apellidos, telefono, DNI, email, fecha de nacimiento,
    tipo de identificacion, id genero, titulo, experiencia laboral y cubiculo.

    Returns:
        Response:
                - Si el estudiante se guarda correctamente, se devuelve un mensaje de exito con un codigo de estado HTTP 201.
                - Si ocurre un error al guardar el estudiante, se devuelve un mensaje de error con un cdigo de estado HTTP 500.
    """
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
    """
    Modifica la informacion de un docente.

    Esta solicitud PUT recibe los datos actualizados del docente en formato JSON. Se requiere que 
    el identificador del estudiante se pase como un parametro en la URL. Los datos a actualizar 
    incluyen nombres, apellidos, telefono, DNI, email, fecha de nacimiento, tipo de identificacion, 
    id genero, titulo, experiencia laboral y cubiculo. 

    Args:
        id (int): Identificador del docente a modificar.

    Returns:
        Response: Un objeto de respuesta JSON con los datos actualizados del docente y un codigo de estado HTTP 201.
                  Si ocurre un error, se devuelve un mensaje de error con un codigo de estado HTTP 500.
    """
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
    """
    Obtiene la lista de diccionarios de asignaciones de docentes.

    Returns:
        Response: JSON con la lista de diccionarios de asignaciones de docentes y un codigo de estado HTTP 200.
    """
    asignacion_info_completa = run(
        asignacion_docente_control.get_asignacion_info_completa()
    )
    return jsonify(asignacion_info_completa), 200


# ? Guardar una asignaciond de un docente con una asignatura
@jwt_required
@academic.route("/asignacion_docente_asignatura", methods=["POST"])
def guardar_docente_asignado():
    """
    Guarda un nuevo asignacion de docente.

    Esta solicitud POST recibe los datos de la asignacion del docente en formato JSON. Los datos 
    necesarios incluyen id del docente, id de la asignatura, id del periodo acadademico.

    Returns:
        Response:
                - Si la asignacion docente se guarda correctamente, se devuelve un mensaje de exito con un codigo de estado HTTP 201.
                - Si ocurre un error al guardar la asignacion docente, se devuelve un mensaje de error con un cdigo de estado HTTP 500.
    """
    try:
        data = request.json
        asignacion_docente_control._asignacion._docente_id = data["id_docente"]
        asignacion_docente_control._asignacion._asignatura_id = data["id_asignatura"]
        asignacion_docente_control._asignacion._periodo_academico_id = data[
            "id_periodo_academico"
        ]
        asignacion_docente_control.save()

        return jsonify({"message": "Asignacion guardada correctamente"}), 201

    except Exception as e:
        print(f"Error al guardar el docente: {e}")
        return jsonify({"error": "Error al guardar la asignacion"}), 500


@jwt_required
@academic.route("/asignacion_docente_asignatura/<int:id>", methods=["PUT"])
def update_docente_asignado(id):
    """
    Modifica la informacion de una asignacion de docente.

    Esta solicitud PUT recibe los datos actualizados de la asignacion de docente en formato JSON.
    Se requiere que el identificador de la asignacion de docente se pase como un parametro en la URL.
    Los datos a actualizar incluyen id del docente, id de la asignatura y id del periodo acadademico. 

    Args:
        id (int): Identificador del docente a modificar.

    Returns:
        Response: Un objeto de respuesta JSON con los datos actualizados del docente y un codigo de estado HTTP 201.
                  Si ocurre un error, se devuelve un mensaje de error con un codigo de estado HTTP 500.
    """
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
        return jsonify({"message": "Asignacion guardada correctamente"}), 201

    except Exception as e:
        print(f"Error al guardar el docente_asignatura: {e}")
        return jsonify({"error": "Error al guardar la asignacion"}), 500


@jwt_required
@academic.route("/cursos_docente/<int:id>", methods=["GET"])
def get_cursos_docente(id):
    """
    Obtener la lista de cursos asociados a un docente fico.

    Esta solitud GET permite obtener todos los cursos en los que un docente,
    mediante su ID. Se requiere que el identificador se pase como un parametro 
    en la URL.

    Args:
        id (int): El identificador del docente el cual se obtendra los cursos

    Returns:
        Response: Una respuesta JSON con la lista de cursos asociados al docente y
                  un codigo de estado HTTP 200  
    """
    data = Util().get_cursos_por_docente(id)
    return jsonify(data), 200
