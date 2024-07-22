from controls.dao.data_access_object import Data_Access_Object
from models.rol_permiso import Rol_Permiso


class RolPermisoControl(Data_Access_Object):
    """
    Controlador para la gestión de permisos asignados a roles, hereda de Data_Access_Object para utilizar sus métodos de acceso a datos.

    :param Data_Access_Object: Clase base para el acceso a datos.
    """

    def __init__(self):
        """
        Inicializa la clase RolPermisoControl y el rol_permiso asociado a None.
        """
        super().__init__(Rol_Permiso)
        self.__rol_permiso = None

    @property
    def _rol_permiso(self):
        """
        Propiedad _rol_permiso que devuelve una instancia de Rol_Permiso si __rol_permiso es None.

        :returns: Instancia de la clase Rol_Permiso.
        """
        if self.__rol_permiso is None:
            self.__rol_permiso = Rol_Permiso()
        return self.__rol_permiso

    @_rol_permiso.setter
    def _rol_permiso(self, value):
        """
        Establece el valor de __rol_permiso.

        :param value: Valor a establecer en __rol_permiso.
        """
        self.__rol_permiso = value

    def save(self) -> bool:
        """
        Guarda el permiso asignado a un rol en la base de datos.

        :returns: True si el permiso se guardó con éxito, False en caso de error.
        :raises Exception: Si ocurre un error al guardar el permiso.
        """
        try:
            self._save(self._rol_permiso)
            return True
        except Exception as e:
            print(f"Error guardando el permiso: {e}")
            return False

    def list(self):
        """
        Lista todos los permisos asignados a roles en la base de datos.

        :returns: Lista de todos los permisos asignados a roles.
        """
        return self._list()

    def delete(self, primary_keys: dict) -> bool:
        """
        Elimina un permiso asignado a un rol basado en las claves primarias proporcionadas.

        :param primary_keys: Diccionario de las claves primarias para identificar el permiso a eliminar.
        :returns: True si el permiso se eliminó con éxito, False en caso de error.
        :raises Exception: Si ocurre un error al eliminar el permiso asignado al rol.
        """
        try:
            self._delete_compound_key(primary_keys)
            return True
        except Exception as e:
            print(f"Error eliminando el permiso asignado al rol: {e}")
            return False

    def get_permisos_by_rol(self, id):
        """
        Obtiene los permisos asignados a un rol específico.

        :param id: ID del rol para el cual obtener los permisos.
        :returns: Lista de permisos asignados al rol especificado.
        """
        lista = self._list()
        permisos = []
        for permiso in lista:
            if permiso._rol_id == id:
                permisos.append(permiso)
        return permisos
