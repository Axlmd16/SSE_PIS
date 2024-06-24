from controls.dao.data_access_object import Data_Access_Object
from models.estudiante_cursa import Estudiante_Cursa
from controls.cargar_notas.cursaControlDao import CursaControl
from controls.academic.estudiante_control import EstudianteControl

class EstudianteCursaControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Estudiante_Cursa)
        self.__estudiante_cursa = None

    @property
    def _estudiante_cursa(self):
        if self.__estudiante_cursa is None:
            self.__estudiante_cursa = Estudiante_Cursa()
        return self.__estudiante_cursa

    @_estudiante_cursa.setter
    def _estudiante_cursa(self, value):
        self.__estudiante_cursa = value

    def save(self):
        self._save(self._estudiante_cursa)
        self._estudiante_cursa = None

    def update(self, pos):
        self._merge(self._estudiante_cursa, pos)
        self._estudiante_cursa = None

    def list(self):
        return self._list()

    def get_estudiante_cursa_info_completa(self):
        cursa_control = CursaControl()
        estudiante_control = EstudianteControl()

        data_cursa_estudiante = self._to_dict()
        data_cursa = cursa_control.get_cursa_info_completa()
        data_estudiante = estudiante_control.list_with_person_details()

        estudiante_cursa_info_completa = []

        for estudiante_cursa in data_cursa_estudiante:
            estudiante_id = estudiante_cursa['estudiante_id']
            cursa_id = estudiante_cursa['cursa_id']

            estudiante_info = next((e for e in data_estudiante if e['id'] == estudiante_id), None)
            cursa_info = next((c for c in data_cursa if c['id'] == cursa_id), None)

            if estudiante_info and cursa_info:
                estudiante_cursa_info = {
                    'id': estudiante_cursa['id'],
                    'estudiante_id': estudiante_id,
                    'primer_nombre': estudiante_info['primer_nombre'],
                    'segundo_nombre': estudiante_info['segundo_nombre'],
                    'primer_apellido': estudiante_info['primer_apellido'],
                    'segundo_apellido': estudiante_info['segundo_apellido'],
                    'telefono': estudiante_info['telefono'],
                    'dni': estudiante_info['dni'],
                    'fecha_nacimiento': estudiante_info['fecha_nacimiento'].strftime("%d/%m/%Y"),
                    'email': estudiante_info['email'],
                    'tipo_identificacion_id': estudiante_info['tipo_identificacion_id'],
                    'genero_id': estudiante_info['genero_id'],
                    'nro_matricula': estudiante_info['nro_matricula'],
                    'codigo_estudiante': estudiante_info['codigo_estudiante'],
                    'cursa_id': cursa_id,
                    'paralelo': cursa_info['paralelo'],
                    'asignacion_id': cursa_info['asignacion_id'],
                    'asignatura_nombre': cursa_info['asignatura_nombre'],
                    'docente_nombre': cursa_info['docente_nombre'],
                    'periodo_academico_fecha_inicio': cursa_info['periodo_academico_fecha_inicio'],
                    'periodo_academico_fecha_fin': cursa_info['periodo_academico_fecha_fin']
                }
                estudiante_cursa_info_completa.append(estudiante_cursa_info)
        return estudiante_cursa_info_completa

        