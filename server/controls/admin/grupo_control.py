from controls.dao.data_access_object import Data_Access_Object
from models.grupo import Grupo


class GrupoControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Grupo)
        self.__grupo = None

    @property
    def _grupo(self):
        if self.__grupo is None:
            self.__grupo = Grupo()
        return self.__grupo

    @_grupo.setter
    def _grupo(self, value):
        self.__grupo = value

    def save(self) -> bool:
        try:
            self._save(self._grupo)
            return True
        except Exception as e:
            print(f"Error al guardar Grupo: {e}")
            return False

    def update(self, id) -> bool:
        try:
            self._merge(id, self._grupo)
            return True
        except Exception as e:
            print(f"Error al actualizar el grupo: {e}")
            return False

    def list(self):
        return self._list()
