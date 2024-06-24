from controls.dao.data_access_object import Data_Access_Object
from models.carrera import Carrera


class CarreraControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Carrera)
        self.__carrera = None

    @property
    def _carrera(self):
        if self.__carrera is None:
            self.__carrera = Carrera()
        return self.__carrera

    @_carrera.setter
    def _carrera(self, value):
        self.__carrera = value

    def save(self) -> bool:
        try:
            self._save(self._carrera)
            return True
        except Exception as e:
            print(f"Error al guardar carrera: {e}")
            return False

    def update(self, id) -> bool:
        try:
            self._merge(id, self._carrera)
            return True
        except Exception as e:
            print(f"Error al actualizar carrera: {e}")
            return False

    def list(self):
        return self._list()
