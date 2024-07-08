from controls.dao.data_access_object import Data_Access_Object
from models.unidad_estudiante import Unidad_Estudiante


class UnidadEstudianteControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Unidad_Estudiante)
        self.__unidad_estudiante = None

    @property
    def _unidad_estudiante(self):
        if self.__unidad_estudiante is None:
            self.__unidad_estudiante = Unidad_Estudiante()
        return self.__unidad_estudiante

    @_unidad_estudiante.setter
    def _unidad_estudiante(self, value):
        self.__unidad_estudiante = value

    def save(self) -> int:
        try:
            id = self._save_id(self._unidad_estudiante)
            return id
        except Exception as e:
            print(f"Error al guardar la unidad del estudiante: {e}")

    def update(self, id) -> bool:
        try:
            self._merge(id, self._unidad_estudiante)
            return True
        except Exception as e:
            print(f"Error al actualizar la unidad del estudiante: {e}")
            return False

    def list(self):
        return self._list()
