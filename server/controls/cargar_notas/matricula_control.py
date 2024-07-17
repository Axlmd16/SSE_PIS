from controls.dao.data_access_object import Data_Access_Object
from models.matricula import Matricula


class MatriculaControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Matricula)
        self.__matricula = None

    @property
    def _matricula(self):
        if self.__matricula is None:
            self.__matricula = Matricula()
        return self.__matricula

    @_matricula.setter
    def _matricula(self, value):
        self.__matricula = value

    def save(self) -> bool:
        try:
            self._save(self._matricula)
            return True
        except Exception as e:
            print(f"Error al guardar el criterio: {e}")
            return False

    def update(self, id) -> bool:
        try:
            self._merge(id, self._matricula)
            return True
        except Exception as e:
            print(f"Error al actualizar el criterio: {e}")

    def list(self):
        return self._list()
