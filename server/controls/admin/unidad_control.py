from controls.dao.data_access_object import Data_Access_Object
from models.unidad import Unidad


class UnidadControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Unidad)
        self.__unidad = None

    @property
    def _unidad(self):
        if self.__unidad is None:
            self.__unidad = Unidad()
        return self.__unidad

    @_unidad.setter
    def _unidad(self, value):
        self.__unidad = value

    def save(self) -> int:
        try:
            id = self._save_id(self._unidad)
            return id
        except Exception as e:
            print(f"Error al guardar la unidad: {e}")

    def update(self, id) -> bool:
        try:
            self._merge(id, self._unidad)
            return True
        except Exception as e:
            print(f"Error al actualizar la unidad: {e}")
            return False

    def list(self):
        return self._list()
