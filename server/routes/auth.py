from flask import Blueprint, request, jsonify

from controls.inicio_sesion.cuenta_control import CuentaControl
from controls.inicio_sesion.rol_control import RolControl
from controls.inicio_sesion.persona_control import PersonaControl

from flask_jwt_extended import create_access_token
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


@auth.route("/login", methods=["POST"])
def login():
    username = request.json.get("usuario", None)
    password = request.json.get("clave", None)

    try:
        user_found = cc._list().search_models_binary("usuario", username)
        persona_found = pc._list().search_models_binary("id", user_found._persona_id)
    except Exception as e:
        print(e)
        return jsonify({"msg": "Error al buscar el usuario"}), 500

    if (user_found._usuario == username and user_found._clave == password) or (user_found._usuario == username and verify_password(password, user_found._clave)):
        
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


# CRUD para roles
@auth.route("/roles", methods=["POST"])
def create_rol():
    data = request.json
    rc._rol._nombre = data["nombre"]
    rc._rol._descripcion = data["descripcion"]
    if rc.save():
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al guardar el rol"}), 500


@auth.route("/roles", methods=["GET"])
# @jwt_required
def get_rols():
    data = rc._to_dict()
    return jsonify(data), 201


@auth.route("/roles/<int:id>", methods=["GET"])
def get_rol(id):
    rol = rc._find(id)
    return jsonify(rol), 201


@auth.route("/roles/<int:id>", methods=["DELETE"])
def delete_rol():
    # TODO: Buscar por id en la lista de roles y eliminar el objeto
    return "recieved request to delete user"


@auth.route("/roles/<int:id>", methods=["PUT"])
def update_rol(id):
    data = request.json

    rc._rol._nombre = data["nombre"]
    rc._rol._descripcion = data["descripcion"]

    if rc.update(id):
        return jsonify(data), 201
    else:
        return jsonify({"msg": "Error al actualizar el rol"}), 500


@auth.route("/roles/<int:id>/permissions", methods=["GET"])
def get_permisos_by_rol(id):
    permisos = Util().get_permisos_by_rol(id)
    return jsonify(permisos), 201


@auth.route("/roles/<int:id>/permissions", methods=["POST"])
def add_permiso_to_rol(id):
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
    primary_keys = {"rol_id": id, "permiso_id": permiso_id}
    if rpc.delete(primary_keys):
        return jsonify({"msg": "Permiso eliminado del rol"}), 201
    else:
        print("Error al eliminar el permiso del rol")
        return jsonify({"msg": "Error al eliminar el permiso del rol"}), 500


@auth.route("/roles/<int:id>/person", methods=["POST"])
def add_rol_to_person(id):
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
    primary_keys = {"rol_id": id, "persona_id": persona_id}
    if prc.delete(primary_keys):
        return jsonify({"msg": "Permiso eliminado del rol"}), 201
    else:
        print("Error al eliminar el permiso del rol")
        return jsonify({"msg": "Error al eliminar el permiso del rol"}), 500


@auth.route("/users/<int:id>/roles", methods=["GET"])
def get_rols_by_user(id):
    roles = Util().get_roles(id)
    return jsonify(roles), 201


# * --------------------------------------------------------------------------------------------


# CRUD para personas
@auth.route("/users", methods=["POST"])
def create_user():
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
    data = pc._to_dict()
    return jsonify(data), 201


@auth.route("/users/<int:id>", methods=["GET"])
def get_user(id):
    person = pc._list().get(id)
    # TODO: Buscar por id en la lista de personas y retornar el objeto
    return "recieved request to get user"


@auth.route("/users/<int:id>", methods=["DELETE"])
def delete_user():
    # TODO: Buscar por id en la lista de personas y eliminar el objeto
    return "recieved request to delete user"


@auth.route("/users/<int:id>", methods=["PUT"])
def update_user():
    # TODO: Buscar por id en la lista de personas y actualizar el objeto
    return "recieved request to delete user"


# * --------------------------------------------------------------------------------------------


# CRUD para cuentas
@auth.route("/accounts", methods=["POST"])
def create_account():
    data = request.json
    cc._cuenta._usuario = data["usuario"]
    cc._cuenta._clave = data["clave"]
    cc._cuenta._id_persona = data["persona_id"]
    cc.save()

    return jsonify(data), 201


@auth.route("/accounts", methods=["GET"])
def get_accounts():
    data = cc._to_dict()
    ids_personas = [i["persona_id"] for i in data if "persona_id" in i.keys()]
    print(ids_personas)

    personas_list = pc.list()
    personas_data = []
    for i in ids_personas:
        personas = personas_list.search_models("id", i)
        personas_data.append(personas[0].serializable())

    print(personas_data)

    response = {"data": data, "personas": personas_data}
    return jsonify(response), 201


@auth.route("/accounts/<int:id>", methods=["GET"])
def get_account(id):
    account = cc._list().get(id)
    # TODO: Buscar por id en la lista de cuentas y retornar el objeto
    return "recieved request to get user"


@auth.route("/accounts/<int:id>", methods=["DELETE"])
def delete_account():
    # TODO: Buscar por id en la lista de cuentas y eliminar el objeto
    return "recieved request to delete user"


@auth.route("/accounts/<int:id>", methods=["PUT"])
def update_account():
    # TODO: Buscar por id en la lista de cuentas y actualizar el objeto
    return "recieved request to delete user"


# * --------------------------------------------------------------------------------------------


@auth.route("/permisos", methods=["POST"])
def create_permiso():
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
    data = ppc._to_dict()
    return jsonify(data), 201


@auth.route("/permisos/<int:id>", methods=["GET"])
def get_permiso(id):
    permiso = ppc._find(id)
    return jsonify(permiso), 201


@auth.route("/permisos/<int:id>", methods=["PUT"])
def update_permiso(id):
    data = request.json
    ppc._permiso._nombre = data["nombre"]
    ppc._permiso._descripcion = data["descripcion"]
    if ppc.update(id):
        return jsonify(data), 201
    else:
        print("Error al actualizar el permiso")
        return jsonify({"msg": "Error al actualizar el permiso"}), 500
