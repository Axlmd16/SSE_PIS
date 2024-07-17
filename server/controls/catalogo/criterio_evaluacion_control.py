from controls.dao.data_access_object import Data_Access_Object
from models.criterio import Criterio


class CriterioEvaluacionControl(Data_Access_Object):
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

    def save(self):
        try:
            self._save(self._criterio)
            return True
        except Exception as e:
            print(f"Error guardando el criterio evaluacion: {e}")
            return False

    def update(self, id):
        try:
            print(f"\n\n\nid: {id}")
            self._merge(id, self._criterio)
            return True
        except Exception as e:
            print(f"Error actualizando el criterio evaluacion: {e}")
            return False

    def list(self):
        return self._list()
