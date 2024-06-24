from controls.dao.data_access_object import Data_Access_Object
from models.permiso import Permiso


class PermisoControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Permiso)
        self.__permiso = None

    @property
    def _permiso(self):
        if self.__permiso is None:
            self.__permiso = Permiso()
        return self.__permiso

    @_permiso.setter
    def _permiso(self, value):
        self.__permiso = value

    def save(self) -> bool:
        try:
            self._save(self._permiso)
            return True
        except Exception as e:
            print(f"Error guardando el permiso: {e}")
            return False

    def update(self, id) -> bool:
        try:
            self._merge(id, self._permiso)
            return True
        except Exception as e:
            print(f"Error actualizando el permiso: {e}")
            return False

    def list(self):
        return self._list()
