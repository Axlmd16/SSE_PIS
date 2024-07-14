from controls.dao.data_access_object import Data_Access_Object
from models.carrera import Carrera
from models.ciclo import Ciclo


class CicloControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Ciclo)
        self.__ciclo = None

    @property
    def _ciclo(self):
        if self.__ciclo is None:
            self.__ciclo = Ciclo()
        return self.__ciclo

    @_ciclo.setter
    def _ciclo(self, value):
        self.__ciclo = value

    def save(self) -> bool:
        try:
            self._save(self._ciclo)
            return True
        except Exception as e:
            print(f"Error al guardar el ciclo: {e}")
            return False

    def update(self, id) -> bool:
        try:
            self._merge(id, self._ciclo)
            return True
        except Exception as e:
            print(f"Error al actualizar el ciclo: {e}")
            return False

    def list(self):
        return self._list()
