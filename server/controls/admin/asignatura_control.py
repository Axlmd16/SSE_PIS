from controls.dao.data_access_object import Data_Access_Object
from models.asignatura import Asignatura


class AsignaturaControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Asignatura)
        self.__asignatura = None

    @property
    def _asignatura(self):
        if self.__asignatura is None:
            self.__asignatura = Asignatura()
        return self.__asignatura

    @_asignatura.setter
    def _asignatura(self, value):
        self.__asignatura = value

    def save(self) -> bool:
        try:
            self._save(self._asignatura)
            return True
        except Exception as e:
            print(f"Error al guardar la asignatura: {e}")
            return False

    def update(self, id) -> bool:
        try:
            self._merge(id, self._asignatura)
            return True
        except Exception as e:
            print(f"Error al actualizar la asignatura: {e}")
            return False

    def list(self):
        return self._list()
