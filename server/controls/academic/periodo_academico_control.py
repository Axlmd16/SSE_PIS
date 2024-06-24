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
        self._save(self._periodo_acedemico)
        self._periodo_acedemico = None

    def update(self, pos):
        self._merge(self._periodo_acedemico, pos)
        self._periodo_acedemico = None

    def list(self):
        return self._list()
