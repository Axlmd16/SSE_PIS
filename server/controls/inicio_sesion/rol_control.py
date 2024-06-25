from controls.dao.data_access_object import Data_Access_Object
from models.rol import Rol


class RolControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Rol)
        self.__rol = None

    @property
    def _rol(self):
        if self.__rol is None:
            self.__rol = Rol()
        return self.__rol

    @_rol.setter
    def _rol(self, value):
        self.__rol = value

    def save(self) -> bool:
        try:
            self._save(self._rol)
            return True
        except Exception as e:
            print(f"Error guardando el rol: {e}")
            return False

    def update(self, id) -> bool:
        try:
            self._merge(id, self._rol)
            return True
        except Exception as e:
            print(f"Error actualizando el rol: {e}")
            return False

    def list(self):
        return self._list()
