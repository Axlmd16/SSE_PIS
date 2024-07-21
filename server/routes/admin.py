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
    """
    Crea una nueva carrera en el sistema.

    :param Datos de la carrera en formato JSON.
    :returns: Datos de la carrera creada en formato JSON.
    :raises Exception: Si ocurre un error al guardar la carrera.
    """
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
    """
    Obtiene una lista de todas las carreras registradas en el sistema.

    :returns: Lista de carreras en formato JSON.
    """
    data = cc._to_dict()
    return jsonify(data), 201


@jwt_required
@admin.route("/careers/<int:id>", methods=["GET"])
def get_career(id):
    """
    Obtiene los detalles de una carrera específica por su ID.

    :param id: ID de la carrera a obtener.
    :returns: Datos de la carrera en formato JSON.
    """
    career = cc.get(id)
    return jsonify(career), 201


@jwt_required
@admin.route("/careers/<int:id>", methods=["PUT"])
def update_career(id):
    """
    Actualiza los datos de una carrera existente.

    :param id: ID de la carrera a actualizar.
    :returns: Datos actualizados de la carrera en formato JSON.
    :raises Exception: Si ocurre un error al actualizar la carrera.
    """
    data = request.json
    cc._carrera._nombre = data["nombre"]
    cc._carrera._descripcion = data["descripcion"]
    cc._carrera._duracion = data["duracion"]
    cc._carrera._titulo_otorgado = data["titulo_otorgado"]
    if cc.update(id):
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al actualizar la carrera"}), 500


# ----------------------------------------------------------------------------------------
# Mallas Academicas
@jwt_required
@admin.route("/meshes", methods=["POST"])
def create_mesh():
    """
    Crea una nueva malla académica en el sistema.

    :param Datos de la malla académica en formato JSON.
    :returns: Datos de la malla creada en formato JSON.
    :raises Exception: Si ocurre un error al guardar la malla.
    """
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
    """
    Obtiene una lista de todas las mallas académicas registradas en el sistema.

    :returns: Lista de mallas académicas en formato JSON.
    """
    data = mc._to_dict()
    return jsonify(data), 201


@jwt_required
@admin.route("/meshes/<int:id>", methods=["GET"])
def get_mesh(id):
    """
    Obtiene los detalles de una malla académica específica por su ID.

    :param id: ID de la malla académica a obtener.
    :returns: Datos de la malla académica en formato JSON.
    """
    mash = mc._find(id)
    return jsonify(mash), 201


@jwt_required
@admin.route("/meshes/<int:id>", methods=["PUT"])
def update_mesh(id):
    """
    Actualiza los datos de una malla académica existente.

    param id: ID de la malla académica a actualizar.
    param fecha_registro: Fecha de registro de la malla académica.
    returns: Datos actualizados de la malla académica en formato JSON.
    raises Exception: Si ocurre un error al actualizar la malla académica.
    """
    data = request.json
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
    """
    Obtiene una lista de todas las asignaturas registradas en el sistema.

    :returns: Lista de asignaturas en formato JSON.
    """
    data = ac._to_dict()
    return jsonify(data), 201


@jwt_required
@admin.route("/subjects", methods=["POST"])
def create_subject():
    """
    Crea una nueva asignatura en el sistema.

    param Datos de la asignatura en formato JSON.
    returns: Datos de la asignatura creada en formato JSON.
    raises Exception: Si ocurre un error al guardar la asignatura."""
    data = request.json
    ac._asignatura._nombre = data["nombre"]
    ac._asignatura._descripcion = data["descripcion"]
    ac._asignatura._malla_id = data["malla_id"]
    ac._asignatura._grupo_id = gc.list()[0]._id
    ac._asignatura._ciclo_id = data["ciclo_id"]
    ac._asignatura._total_horas = data["total_horas"]

    if ac.save():
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al guardar la asignatura"}), 500


@jwt_required
@admin.route("/subjects/<int:id>", methods=["GET"])
def get_subject(id):
    """
    Obtiene los detalles de una asignatura específica por su ID.

    param id: ID de la asignatura a obtener.
    returns: Datos de la asignatura en formato JSON.
    """
    subject = ac._find(id)
    return jsonify(subject), 201


@jwt_required
@admin.route("/subjects/<int:id>", methods=["PUT"])
def update_subject(id):
    """
    Actualiza los datos de una asignatura existente.

    param id: ID de la asignatura a actualizar.
    returns: Datos actualizados de la asignatura en formato JSON.
    raises Exception: Si ocurre un error al actualizar la asignatura."""
    data = request.json
    ac._asignatura._nombre = data["nombre"]
    ac._asignatura._descripcion = data["descripcion"]
    ac._asignatura._malla_id = data["malla_id"]
    ac._asignatura._grupo_id = gc.list()[0]._id
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
    """
    Crea un nuevo grupo en el sistema.

    param Datos del grupo en formato JSON.
    returns: Datos del grupo creado en formato JSON.
    raises Exception: Si ocurre un error al guardar el grupo."""
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
    """
    Obtiene una lista de todos los grupos registrados en el sistema.

    returns: Lista de grupos en formato JSON.
    """
    data = gc._to_dict()
    return jsonify(data), 201


@jwt_required
@admin.route("/groups/<int:id>", methods=["GET"])
def get_group(id):
    """
    Obtiene los detalles de un grupo específico por su ID.

    param id: ID del grupo a obtener.
    returns: Datos del grupo en formato JSON.
    raises Exception: Si ocurre un error al obtener el grupo."""
    group = gc._find(id)
    return jsonify(group), 201


@jwt_required
@admin.route("/groups/<int:id>", methods=["PUT"])
def update_group(id):
    """
    Actualiza los datos de un grupo existente.

    param id: ID del grupo a actualizar.
    returns: Datos actualizados del grupo en formato JSON.
    raises Exception: Si ocurre un error al actualizar el grupo."""
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
@admin.route("/units", methods=["POST"])
def create_unit():
    """
    Crea una nueva unidad en el sistema.

    param Datos de la unidad en formato JSON.
    returns: Datos de la unidad creada en formato JSON.
    raises Exception: Si ocurre un error al guardar la unidad.
    """
    try:
        data = request.json
        print("Datos recibidos del frontend:", data)
        uc._unidad._nombre = data["nombre"]
        uc._unidad._nro_unidad = int(data["nro_unidad"])
        uc._unidad._nro_semanas = int(data["nro_semanas"])
        uc._unidad._asignatura_id = int(data["asignatura_id"])
        uc._unidad._fecha_inicio = datetime.strptime(data["fecha_inicio"], "%Y-%m-%d")
        uc._unidad._fecha_fin = datetime.strptime(data["fecha_fin"], "%Y-%m-%d")

        id_unidad = uc.save()
        print("id_unidad", id_unidad)
        estudiantes_cursas = Util().get_estudiantes_por_asignatura(
            data["asignatura_id"]
        )
        criterios = crc._to_dict()

        for estudiante in estudiantes_cursas:
            uec._unidad_estudiante._unidad_id = id_unidad
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
    """
    Obtiene una lista de todas las unidades registradas en el sistema.

    returns: Lista de unidades en formato JSON.
    """
    data = uc._to_dict()
    return jsonify(data), 201


@jwt_required
@admin.route("/units/<int:id>", methods=["GET"])
def get_unit(id):
    """
    Obtiene los detalles de una unidad específica por su ID.

    param id: ID de la unidad a obtener.
    returns: Datos de la unidad en formato JSON."""
    unit = uc._find(id)
    return jsonify(unit), 201


@jwt_required
@admin.route("/units/<int:id>", methods=["PUT"])
def update_unit(id):
    """
    Actualiza los datos de una unidad existente.

    param id: ID de la unidad a actualizar.
    returns: Datos actualizados de la unidad en formato JSON.
    raises Exception: Si ocurre un error al actualizar la unidad.
    """
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


@jwt_required
@admin.route("/units/<int:id>", methods=["DELETE"])
def delete_unit(id):
    """
    Elimina una unidad existente.

    param id: ID de la unidad a eliminar.
    returns: Mensaje de confirmación en formato JSON.
    raises Exception: Si ocurre un error al eliminar la unidad."""
    if uc.delete(id):
        return jsonify({"msg": "Unidad eliminada"}), 201
    else:
        return jsonify({"msg": "Error al eliminar la unidad"}), 500


# ----------------------------------------------------------------------------------------
# Ciclos


@jwt_required
@admin.route("/cycles", methods=["POST"])
def create_cycle():
    """
    Crea un nuevo ciclo en el sistema.

    :param ciclo: Ciclo a crear.
    :returns: Datos del ciclo creado en formato JSON.
    :raises Exception: Si ocurre un error al guardar el ciclo.
    """
    data = request.json
    clc._ciclo._ciclo = data["ciclo"]

    if clc.save():
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al guardar el ciclo"}), 500


@jwt_required
@admin.route("/cycles", methods=["GET"])
def get_cycles():
    """
    Obtiene una lista de todos los ciclos registrados en el sistema.

    returns: Lista de ciclos en formato JSON.
    """
    data = clc._to_dict()
    return jsonify(data), 201


@jwt_required
@admin.route("/cycles/<int:id>", methods=["GET"])
def get_cycle(id):
    """
    Obtiene los detalles de un ciclo específico por su ID.

    :param id: ID del ciclo a obtener.
    :returns: Datos del ciclo en formato JSON.
    """
    cycle = clc._find(id)
    return jsonify(cycle), 201


@jwt_required
@admin.route("/cycles/<int:id>", methods=["PUT"])
def update_cycle(id):
    """
    Actualiza los datos de un ciclo existente.

    :param id: ID del ciclo a actualizar.
    :param ciclo: Nuevo ciclo.
    :returns: Datos actualizados del ciclo en formato JSON.
    :raises Exception: Si ocurre un error al actualizar el ciclo.
    """
    data = request.json
    clc._ciclo._ciclo = data["ciclo"]
    if clc.update(id):
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al actualizar el ciclo"}), 500
