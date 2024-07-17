from controls.dao.data_access_object import Data_Access_Object
from models.periodo_academico import Periodo_Academico


class PeriodoAcademicoControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Periodo_Academico)
        self.__periodo_academico = None

    @property
    def _periodo_acedemico(self):
        if self.__periodo_academico is None:
            self.__periodo_academico = Periodo_Academico()
        return self.__periodo_academico

    @_periodo_acedemico.setter
    def _periodo_acedemico(self, value):
        self.__periodo_academico = value

    def save(self):
        try:
            self._save(self._periodo_acedemico)
            return True
        except Exception as e:
            print(f"Error guardando el periodo academico: {e}")
            return False

    def update(self, id):
        try:
            # print(f"\n\n\nid: {id}")
            self._merge(id, self._periodo_acedemico)
            return True
        except Exception as e:
            print(f"Error actualizando el periodo academico: {e}")
            return False

    def list(self):
        return self._list()
