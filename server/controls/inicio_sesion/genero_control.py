from controls.dao.data_access_object import Data_Access_Object
from models.genero import Genero


class GeneroControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Genero)
        self.__genero = None

    @property
    def _genero(self):
        if self.__genero is None:
            self.__genero = Genero()
        return self.__genero

    @_genero.setter
    def _genero(self, value):
        self.__genero = value

    def save(self):
        try:
            self._save(self._genero)
            return True
        except Exception as e:
            print(f"Error guardando el genero: {e}")
            return False

    def update(self, pos):
        try:
            self._merge(self._genero)
            return True
        except Exception as e:
            print(f"Error actualizando el genero: {e}")
            return False

    def list(self):
        return self._list()
