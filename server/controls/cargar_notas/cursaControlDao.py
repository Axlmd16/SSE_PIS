
from controls.dao.data_access_object import Data_Access_Object
from controls.academic.asignacion_control import AsignacionControl
from models.cursa import Cursa

class CursaControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Cursa)
        self.__cursa = None

    @property
    def _cursa(self):
        if self.__cursa is None:
            self.__cursa = Cursa()
        return self.__cursa

    @_cursa.setter
    def _cursa(self, value):
        self.__cursa = value

    def save(self):
        self._save(self._cursa)
        self._cursa = None

    def update(self, pos):
        self._merge(self._cursa, pos)
        self._cursa = None

    def list(self):
        return self._list()

    def get_cursa_info_completa(self):
        asignacion_control = AsignacionControl()

        data_cursa = self._to_dict()
        data_asignacion = asignacion_control.get_asignacion_info_completa()

        cursa_info_completa = []

        for cursa in data_cursa:
            asignacion_id = cursa['asignacion_id']

            asignacion_info = next((a for a in data_asignacion if a['id'] == asignacion_id), None)

            if asignacion_info:
                cursa_info = {
                    'id': cursa['id'],
                    'paralelo': cursa['paralelo'],
                    'asignacion_id': asignacion_id,
                    'asignatura_nombre': asignacion_info['asignatura_nombre'],
                    'docente_nombre': asignacion_info['docente_nombre'],
                    'periodo_academico_fecha_inicio': asignacion_info['periodo_academico_fecha_inicio'],
                    'periodo_academico_fecha_fin': asignacion_info['periodo_academico_fecha_fin']
                }
                cursa_info_completa.append(cursa_info)
        return cursa_info_completa