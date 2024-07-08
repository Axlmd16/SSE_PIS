from controls.dao.data_access_object import Data_Access_Object
from models.criterio import Criterio


class CriterioControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Criterio)
        self.__criterio = None

    @property
    def _criterio(self):
        if self.__criterio is None:
            self.__criterio = Criterio()
        return self.__criterio

    @_criterio.setter
    def _criterio(self, value):
        self.__criterio = value

    def save(self) -> bool:
        try:
            self._save(self._criterio)
            return True
        except Exception as e:
            print(f"Error al guardar el criterio: {e}")
            return False

    def update(self, id) -> bool:
        try:
            self._merge(id, self._criterio)
            return True
        except Exception as e:
            print(f"Error al actualizar el criterio: {e}")

    def list(self):
        return self._list()
