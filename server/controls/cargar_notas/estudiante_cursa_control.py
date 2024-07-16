from controls.dao.data_access_object import Data_Access_Object
from models.estudiante_cursa import Estudiante_Cursa
from controls.cargar_notas.cursaControlDao import CursaControl
from controls.academic.estudiante_control import EstudianteControl
from controls.tda.list.utilidades import binary_search
import asyncio
import colorama
import time


class EstudianteCursaControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Estudiante_Cursa)
        self.__estudiante_cursa = None
        self.__estudiante_control = EstudianteControl()
        self.__cursa_control = CursaControl()

    @property
    def _estudiante_control(self):
        return self.__estudiante_control

    @_estudiante_control.setter
    def _estudiante_control(self, value):
        self.__estudiante_control = value

    @property
    def _cursa_control(self):
        return self.__cursa_control

    @_cursa_control.setter
    def _cursa_control(self, value):
        self.__cursa_control = value

    @property
    def _estudiante_cursa(self):
        if self.__estudiante_cursa is None:
            self.__estudiante_cursa = Estudiante_Cursa()
        return self.__estudiante_cursa

    @_estudiante_cursa.setter
    def _estudiante_cursa(self, value):
        self.__estudiante_cursa = value

    def save(self):
        try:
            id = self._save_id(self._estudiante_cursa)
            return id
        except Exception as e:
            print(f"Error al guardar la estudiante_cursa: {e}")

    def update(self, id):
        try:
            self._merge(id, self._estudiante_cursa)
            return True
        except Exception as e:
            print(f"Error actualizando la estudiante_cursa: {e}")
            return False

    def list(self):
        return self._list()

    def get_estudiante_cursa_info_completa(self):
        inicio = time.time()
        estudiante_cursa_info_completa = []

        data_cursa_estudiante = self.list()
        data_cursa = self._cursa_control.get_cursa_info_completa()
        data_estudiante = self._estudiante_control.list_with_person_details()

        data_cursa_estudiante_ordenada = (
            data_cursa_estudiante.quick_sort_with_attribute(
                data_cursa_estudiante.to_array, "_id", 1
            )
        )

        for estudiante_cursa in data_cursa_estudiante_ordenada:
            estudiante_id = estudiante_cursa._estudiante_id
            cursa_id = estudiante_cursa._cursa_id

            cursa_info = binary_search(data_cursa, cursa_id)
            estudiante_info = binary_search(data_estudiante, estudiante_id)

            if estudiante_info and cursa_info:
                estudiante_cursa_info = {
                    "id": estudiante_cursa._id,
                    "estudiante_id": estudiante_id,
                    "primer_nombre": estudiante_info["primer_nombre"],
                    "segundo_nombre": estudiante_info["segundo_nombre"],
                    "primer_apellido": estudiante_info["primer_apellido"],
                    "segundo_apellido": estudiante_info["segundo_apellido"],
                    "telefono": estudiante_info["telefono"],
                    "dni": estudiante_info["dni"],
                    "fecha_nacimiento": estudiante_info["fecha_nacimiento"],
                    "email": estudiante_info["email"],
                    "tipo_identificacion_id": estudiante_info["tipo_identificacion_id"],
                    "genero_id": estudiante_info["genero_id"],
                    "codigo_estudiante": estudiante_info["codigo_estudiante"],
                    "cursa_id": cursa_id,
                    "ciclo_id": cursa_info["ciclo_id"],
                    "paralelo": cursa_info["paralelo"],
                    "asignacion_id": cursa_info["asignacion_id"],
                    "asignatura_nombre": cursa_info["asignatura_nombre"],
                    "docente_nombre": cursa_info["docente_nombre"],
                    "periodo_academico_fecha_inicio": cursa_info[
                        "periodo_academico_fecha_inicio"
                    ],
                    "periodo_academico_fecha_fin": cursa_info[
                        "periodo_academico_fecha_fin"
                    ],
                }

            estudiante_cursa_info_completa.append(estudiante_cursa_info)
        # print(estudiante_cursa_info_completa)
        fin = time.time()
        # print(colorama.Fore.GREEN + f"Tiempo de ejecucion listado_estudiante_cursa: {fin - inicio}" + colorama.Fore.RESET)
        return estudiante_cursa_info_completa
