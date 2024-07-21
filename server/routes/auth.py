from flask import Blueprint, request, jsonify

from controls.inicio_sesion.cuenta_control import CuentaControl
from controls.inicio_sesion.rol_control import RolControl
from controls.inicio_sesion.persona_control import PersonaControl

from flask_jwt_extended import create_access_token, jwt_required
from controls.inicio_sesion.utils import Util
from controls.inicio_sesion.permiso_control import PermisoControl
from controls.inicio_sesion.permiso_rol_control import RolPermisoControl
from controls.inicio_sesion.rol_persona_control import RolPersonaControl

from controls.tda.list.utilidades import verify_password

auth = Blueprint("auth", __name__)

rc = RolControl()
cc = CuentaControl()
pc = PersonaControl()
ppc = PermisoControl()
rpc = RolPermisoControl()
prc = RolPersonaControl()


@auth.route("/obtener_correo_docente", methods=["POST"])
def obtener_correo_docente():
    """
    Obtiene el correo electrónico de un docente basado en su ID.

    :param id_docente: ID del docente cuyo correo se desea obtener.
    :returns: Correo electrónico del docente en formato JSON.
    :raises Exception: Si ocurre un error al obtener el correo del docente.
    """
    try:
        data = request.get_json()
        id_docente = int(data)
        docente_encontrado = cc._list().search_models_binary("persona_id", id_docente)
        correo_docente = docente_encontrado._usuario
        return jsonify(correo_docente), 200
    except Exception as e:
        print(f"Error al obtener el correo del docente: {e}"), 404


@auth.route("/login", methods=["POST"])
def login():
    """
    Autentica a un usuario y genera un token de acceso.

    :param usuario: Nombre de usuario.
    :param clave: Contraseña del usuario.
    :returns: Token de acceso JWT en formato JSON.
    :raises Exception: Si ocurre un error al buscar el usuario o la contraseña no coincide.
    """
    username = request.json.get("usuario", None)
    password = request.json.get("clave", None)

    try:
        user_found = cc._list().search_models_binary("usuario", username)
        persona_found = pc._list().search_models_binary("id", user_found._persona_id)
    except Exception as e:
        print(e)
        return jsonify({"msg": "Error al buscar el usuario"}), 500

    # Verificar si el usuario está activo
    if user_found._estado == 0:
        return jsonify({"msg": "La cuenta está desactivada"}), 403

    if (user_found._usuario == username and user_found._clave == password) or (
        user_found._usuario == username and verify_password(password, user_found._clave)
    ):

        permisos = Util().get_permisos(user_found._persona_id)
        roles = Util().get_roles(user_found._persona_id)

        additional_claims = {
            "permisos": permisos,
            "roles": roles,
            "persona": persona_found.serializable(),
        }

        access_token = create_access_token(
            identity=username, additional_claims=additional_claims
        )
        return jsonify(access_token=access_token), 200

    return jsonify({"msg": "Bad username or password"}), 401


@auth.route("/accounts/<int:id>", methods=["PUT"])
def actualizar_cuenta(id):
    """
    Actualiza el estado de una cuenta de usuario.

    :param id: ID de la cuenta a actualizar.
    :returns: Mensaje de éxito en formato JSON.
    :raises Exception: Si ocurre un error al actualizar la cuenta.
    """
    data = request.get_json()
    estado = data.get("estado")

    try:
        cuenta = cc._find(id)
        cc._cuenta._usuario = cuenta["usuario"]
        cc._cuenta._clave = cuenta["clave"]
        cc._cuenta._persona_id = cuenta["persona_id"]
        cc._cuenta._estado = estado
        cc.update(id)
        return (
            jsonify(
                {"msg": f"Cuenta {'activada' if estado else 'desactivada'} con éxito"}
            ),
            200,
        )
    except Exception as e:
        print(f"Error al actualizar la cuenta: {e}")
        return jsonify({"msg": "Error al actualizar la cuenta"}), 500


@auth.route("/roles", methods=["POST"])
def create_rol():
    """
    Crea un nuevo rol.

    :returns: Datos del rol creado en formato JSON.
    :raises Exception: Si ocurre un error al guardar el rol.
    """
    data = request.json
    rc._rol._nombre = data["nombre"]
    rc._rol._descripcion = data["descripcion"]
    if rc.save():
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al guardar el rol"}), 500


@jwt_required
@auth.route("/roles", methods=["GET"])
def get_rols():
    """
    Obtiene todos los roles.

    :returns: Datos de los roles en formato JSON.
    :raises Exception: Si ocurre un error al obtener los roles.
    """
    data = rc._to_dict()
    return jsonify(data), 201


@auth.route("/roles/<int:id>", methods=["GET"])
def get_rol(id):
    """
    Obtiene un rol basado en su ID.

    :param id: ID del rol a obtener.
    :returns: Datos del rol en formato JSON.
    :raises Exception: Si ocurre un error al obtener el rol.
    """
    rol = rc._find(id)
    return jsonify(rol), 201


@auth.route("/roles/<int:id>", methods=["DELETE"])
def delete_rol():
    """
    Elimina un rol basado en su ID.

    :param id: ID del rol a eliminar.
    :returns: Mensaje de éxito en formato JSON.
    :raises Exception: Si ocurre un error al eliminar el rol.
    """

    return "recieved request to delete user"


@auth.route("/roles/<int:id>", methods=["PUT"])
def update_rol(id):
    """
    Actualiza un rol basado en su ID.

    :param id: ID del rol a actualizar.
    :returns: Datos del rol actualizado en formato JSON.
    :raises Exception: Si ocurre un error al actualizar el rol.
    """
    data = request.json

    rc._rol._nombre = data["nombre"]
    rc._rol._descripcion = data["descripcion"]

    if rc.update(id):
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al actualizar el rol"}), 500


@auth.route("/roles/<int:id>/permissions", methods=["GET"])
def get_permisos_by_rol(id):
    """
    Obtiene los permisos asignados a un rol basado en su ID.

    :param id: ID del rol cuyos permisos se desean obtener.
    :returns: Datos de los permisos en formato JSON.
    :raises Exception: Si ocurre un error al obtener los permisos.
    """

    permisos = Util().get_permisos_by_rol(id)
    return jsonify(permisos), 201


@auth.route("/roles/<int:id>/permissions", methods=["POST"])
def add_permiso_to_rol(id):
    """
    Asigna un permiso a un rol.

    :param id: ID del rol al que se le asignará el permiso.
    :returns: Datos del permiso asignado en formato JSON.
    :raises Exception: Si ocurre un error al asignar el permiso al rol.
    """
    data = request.json
    print(f"Data: {data}")
    rpc._rol_permiso._rol_id = id
    rpc._rol_permiso._permiso_id = data["permission_id"]
    if rpc.save():
        return jsonify(data), 201
    else:
        print("Error al asignar el permiso al rol")
        return jsonify({"msg": "Error al asignar el permiso al rol"}), 500


@auth.route("/roles/<int:id>/permissions/<int:permiso_id>", methods=["DELETE"])
def delete_permiso_from_rol(id, permiso_id):
    """
    Elimina un permiso de un rol.

    :param id: ID del rol al que se le eliminará el permiso.
    :param permiso_id: ID del permiso a eliminar.
    :returns: Mensaje de éxito en formato JSON.
    :raises Exception: Si ocurre un error al eliminar el permiso del rol.
    """
    primary_keys = {"rol_id": id, "permiso_id": permiso_id}
    if rpc.delete(primary_keys):
        return jsonify({"msg": "Permiso eliminado del rol"}), 201
    else:
        print("Error al eliminar el permiso del rol")
        return jsonify({"msg": "Error al eliminar el permiso del rol"}), 500


@auth.route("/roles/<int:id>/person", methods=["POST"])
def add_rol_to_person(id):
    """
    Asigna un rol a una persona.

    :param id: ID del rol a asignar.
    :returns: Datos de la asignación en formato JSON.
    :raises Exception: Si ocurre un error al asignar el rol a la persona.
    """
    data = request.json
    prc._rol_persona._rol_id = id
    prc._rol_persona._persona_id = data["persona_id"]
    if prc.save():
        return jsonify(data), 201
    else:
        print("Error al asignar el rol a la persona")
        return jsonify({"msg": "Error al asignar el rol a la persona"}), 500


@auth.route("/roles/<int:id>/person/<int:persona_id>", methods=["DELETE"])
def delete_rol_from_person(id, persona_id):
    """
    Elimina un rol de una persona.

    :param id: ID del rol a eliminar.
    :param persona_id: ID de la persona a la que se le eliminará el rol.
    :returns: Mensaje de éxito en formato JSON.
    :raises Exception: Si ocurre un error al eliminar el rol de la persona.
    """
    primary_keys = {"rol_id": id, "persona_id": persona_id}
    if prc.delete(primary_keys):
        return jsonify({"msg": "Permiso eliminado del rol"}), 201
    else:
        print("Error al eliminar el permiso del rol")
        return jsonify({"msg": "Error al eliminar el permiso del rol"}), 500


@auth.route("/users/<int:id>/roles", methods=["GET"])
def get_rols_by_user(id):
    """
    Obtiene los roles asignados a una persona basada en su ID.

    :param id: ID de la persona cuyos roles se desean obtener.
    :returns: Datos de los roles en formato JSON.
    :raises Exception: Si ocurre un error al obtener los roles.
    """
    roles = Util().get_roles(id)
    return jsonify(roles), 201


# * --------------------------------------------------------------------------------------------


# CRUD para personas
@auth.route("/users", methods=["POST"])
def create_user():
    """
    Crea una nueva persona.

    :returns: Datos de la persona creada en formato JSON.
    :raises Exception: Si ocurre un error al guardar la persona.
    """
    data = request.json
    pc._persona._nombres = data["nombres"]
    pc._persona._apellidos = data["apellidos"]
    pc._persona._email = data["email"]
    pc._persona._telefono = data["telefono"]
    pc._persona._direccion = data["direccion"]
    pc._persona._dni = data["dni"]
    pc._persona._fecha_de_nacimiento = data["fecha_nacimiento"]
    pc._persona._genero = data["genero"]
    pc._persona._tipo_de_identificacion = data["tipo_identificacion"]
    pc._persona._id_rol = data["id_rol"]
    pc.save()

    return jsonify(data), 201


@auth.route("/users", methods=["GET"])
def get_users():
    """
    Obtiene todas las personas.

    :returns: Datos de las personas en formato JSON.
    :raises Exception: Si ocurre un error al obtener las personas.
    """
    data = pc._to_dict()
    return jsonify(data), 201


@auth.route("/users/<int:id>", methods=["GET"])
def get_user(id):
    """
    Obtiene una persona basada en su ID.

    :param id: ID de la persona a obtener.
    :returns: Datos de la persona en formato JSON.
    :raises Exception: Si ocurre un error al obtener la persona.
    """
    person = pc._list().get(id)
    # TODO: Buscar por id en la lista de personas y retornar el objeto
    return "recieved request to get user"


@auth.route("/users/<int:id>", methods=["DELETE"])
def delete_user():
    """
    Elimina una persona basada en su ID.

    :param id: ID de la persona a eliminar.
    :returns: Mensaje de éxito en formato JSON.
    :raises Exception: Si ocurre un error al eliminar la persona.
    """
    # TODO: Buscar por id en la lista de personas y eliminar el objeto
    return "recieved request to delete user"


# * --------------------------------------------------------------------------------------------


# CRUD para cuentas
@auth.route("/accounts", methods=["POST"])
def create_account():
    """
    Crea una nueva cuenta de usuario.

    :returns: Datos de la cuenta creada en formato JSON.
    :raises Exception: Si ocurre un error al guardar la cuenta.
    """
    data = request.json
    cc._cuenta._usuario = data["usuario"]
    cc._cuenta._clave = data["clave"]
    cc._cuenta._id_persona = data["persona_id"]
    cc.save()

    return jsonify(data), 201


@auth.route("/accounts", methods=["GET"])
def get_accounts():
    """
    Obtiene todas las cuentas de usuario.

    :returns: Datos de las cuentas en formato JSON.
    :raises Exception: Si ocurre un error al obtener las cuentas.
    """
    data = cc._to_dict()
    ids_personas = [i["persona_id"] for i in data if "persona_id" in i.keys()]

    personas_list = pc.list()
    personas_data = []
    for i in ids_personas:
        personas = personas_list.search_models("id", i)
        personas_data.append(personas[0].serializable())

    response = {"data": data, "personas": personas_data}
    return jsonify(response), 201


@auth.route("/accounts/<int:id>", methods=["GET"])
def get_account(id):
    """
    Obtiene una cuenta de usuario basada en su ID.

    :param id: ID de la cuenta a obtener.
    :returns: Datos de la cuenta en formato JSON.
    :raises Exception: Si ocurre un error al obtener la cuenta.
    """
    account = cc._list().get(id)
    # TODO: Buscar por id en la lista de cuentas y retornar el objeto
    return "recieved request to get user"


@auth.route("/accounts/<int:id>", methods=["DELETE"])
def delete_account():
    """
    Elimina una cuenta de usuario basada en su ID.

    :param id: ID de la cuenta a eliminar.
    :returns: Mensaje de éxito en formato JSON.
    :raises Exception: Si ocurre un error al eliminar la cuenta.
    """
    # TODO: Buscar por id en la lista de cuentas y eliminar el objeto
    return "recieved request to delete user"


# * --------------------------------------------------------------------------------------------


@auth.route("/permisos", methods=["POST"])
def create_permiso():
    """
    Crea un nuevo permiso.

    :returns: Datos del permiso creado en formato JSON.
    :raises Exception: Si ocurre un error al guardar el permiso.
    """
    data = request.json
    ppc._permiso._nombre = data["nombre"]
    ppc._permiso._descripcion = data["descripcion"]
    if ppc.save():
        return jsonify(data), 201
    else:
        print("Error al guardar el permiso")
        return jsonify({"msg": "Error al guardar el permiso"}), 500


@auth.route("/permisos", methods=["GET"])
def get_permisos():
    """
    Obtiene todos los permisos.

    :returns: Datos de los permisos en formato JSON.
    :raises Exception: Si ocurre un error al obtener los permisos.
    """
    data = ppc._to_dict()
    return jsonify(data), 201


@auth.route("/permisos/<int:id>", methods=["GET"])
def get_permiso(id):
    """
    Obtiene un permiso basado en su ID.

    :param id: ID del permiso a obtener.
    :returns: Datos del permiso en formato JSON.
    :raises Exception: Si ocurre un error al obtener el permiso.
    """
    permiso = ppc._find(id)
    return jsonify(permiso), 201


@auth.route("/permisos/<int:id>", methods=["PUT"])
def update_permiso(id):
    """
    Actualiza un permiso basado en su ID.

    :param id: ID del permiso a actualizar.
    :returns: Datos del permiso actualizado en formato JSON.
    :raises Exception: Si ocurre un error al actualizar el permiso.
    """
    data = request.json
    ppc._permiso._nombre = data["nombre"]
    ppc._permiso._descripcion = data["descripcion"]
    if ppc.update(id):
        return jsonify(data), 201
    else:
        print("Error al actualizar el permiso")
        return jsonify({"msg": "Error al actualizar el permiso"}), 500
