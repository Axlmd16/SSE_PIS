from controls.dao.data_access_object import Data_Access_Object
from models.rol_permiso import Rol_Permiso


class RolPermisoControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Rol_Permiso)
        self.__rol_permiso = None

    @property
    def _rol_permiso(self):
        if self.__rol_permiso is None:
            self.__rol_permiso = Rol_Permiso()
        return self.__rol_permiso

    @_rol_permiso.setter
    def _rol_permiso(self, value):
        self.__rol_permiso = value

    def save(self) -> bool:
        try:
            self._save(self._rol_permiso)
            return True
        except Exception as e:
            print(f"Error guardando el permiso: {e}")
            return False

    def list(self):
        return self._list()

    def delete(self, primary_keys: dict) -> bool:
        try:
            self._delete_compound_key(primary_keys)
            return True
        except Exception as e:
            print(f"Error eliminando el permiso asignado al rol: {e}")
            return False

    def get_permisos_by_rol(self, id):
        lista = self._list()
        permisos = []
        for permiso in lista:
            if permiso._rol_id == id:
                permisos.append(permiso)
        return permisos
