from controls.academic.docente_control import DocenteControl
from controls.academic.periodo_academico_control import PeriodoAcademicoControl
from controls.admin.asignatura_control import AsignaturaControl

from controls.dao.data_access_object import Data_Access_Object
from models.asignacion import Asignacion

class AsignacionControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Asignacion)
        self.__asignacion = None

    @property
    def _asignacion(self):
        if self.__asignacion is None:
            self.__asignacion = Asignacion()
        return self.__asignacion

    @_asignacion.setter
    def _asignacion(self, value):
        self.__asignacion = value

    def save(self):
        self._save(self._asignacion)
        self._asignacion = None

    def update(self, pos):
        self._merge(self._asignacion, pos)
        self._asignacion = None

    def list(self):
        return self._list()
    
    def get_asignacion_info_completa(self):
        docente_control = DocenteControl()
        asignatura_control = AsignaturaControl()
        periodo_academico_control = PeriodoAcademicoControl()

        data_asignacion_docente = self._to_dict()
        data_docentes = docente_control.list_with_person_details()
        data_periodos_academicos = periodo_academico_control._to_dict()
        data_asignaturas = asignatura_control._to_dict()

        asignacion_info_completa = []

        for asignacion in data_asignacion_docente:
            docente_id = asignacion['docente_id']
            asignatura_id = asignacion['asignatura_id']
            periodo_academico_id = asignacion['periodo_academico_id']

            docente_info = next((d for d in data_docentes if d['id'] == docente_id), None)
            asignatura_info = next((a for a in data_asignaturas if a['id'] == asignatura_id), None)
            periodo_academico_info = next((p for p in data_periodos_academicos if p['id'] == periodo_academico_id), None)

            if docente_info and asignatura_info and periodo_academico_info:
                asignacion_info = {
                    'id': asignacion['id'],
                    'docente_id': docente_id,
                    'docente_nombre': f"{docente_info['primer_nombre']} {docente_info['primer_apellido']}",
                    'asignatura_id': asignatura_id,
                    'asignatura_nombre': asignatura_info['nombre'],
                    'periodo_academico_id': periodo_academico_id,
                    'periodo_academico_fecha_inicio': periodo_academico_info['fecha_inicio'].strftime("%d/%m/%Y"),
                    'periodo_academico_fecha_fin': periodo_academico_info['fecha_fin'].strftime("%d/%m/%Y")
                }
                asignacion_info_completa.append(asignacion_info)

        return asignacion_info_completa