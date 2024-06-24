from controls.dao.connection import ConnectionDB
from controls.inicio_sesion.cuenta_control import CuentaControl
from controls.inicio_sesion.rol_persona_control import RolPersonaControl
from controls.inicio_sesion.permiso_rol_control import RolPermisoControl
from controls.tda.list.linked_list import Linked_List


class Utils_D:

    # * Funcion para obtener todos los permisos que tiene un usuario basado en sus roles

    def get_permisos_by_rols_from_user(self, id):
        cc = CuentaControl()
        rpc = RolPersonaControl()
        prc = RolPermisoControl()

        cuentaUsuario = cc._find(id)
        roles = rpc.get_roles_by_person(cuentaUsuario._persona_id)

        permisos = Linked_List()
        for rol in roles:
            permisos.add(prc.get_permisos_by_rol(rol._rol_id))

        return permisos
