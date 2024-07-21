from controls.dao.data_access_object import Data_Access_Object
from models.estudiante_cursa import Estudiante_Cursa
from controls.cargar_notas.cursaControlDao import CursaControl
from controls.academic.estudiante_control import EstudianteControl
from controls.tda.list.utilidades import binary_search
import asyncio
import colorama
import time


class EstudianteCursaControl(Data_Access_Object):
    """
    Controlador para gestionar las inscripciones de estudiantes en cursas.

    Hereda de Data_Access_Object para realizar operaciones de base de datos.
    """
    def __init__(self):
        """
        Inicializa una nueva instancia de EstudianteCursaControl.
        
        Inicializa los controladores necesarios para gestionar estudiantes y cursas.
        """
        super().__init__(Estudiante_Cursa)
        self.__estudiante_cursa = None
        self.__estudiante_control = EstudianteControl()
        self.__cursa_control = CursaControl()

    @property
    def _estudiante_control(self):
        """
        Obtiene el controlador de estudiante actual.
        """
        return self.__estudiante_control

    @_estudiante_control.setter
    def _estudiante_control(self, value):
        """
        Establece el controlador de estudiante.
        """
        self.__estudiante_control = value

    @property
    def _cursa_control(self):
        """
        Obtiene el controlador de cursa actual.
        """
        return self.__cursa_control

    @_cursa_control.setter
    def _cursa_control(self, value):
        """
        Establece el controlador de cursa.
        """
        self.__cursa_control = value

    @property
    def _estudiante_cursa(self):
        """
        Obtiene la inscripción de estudiante en cursa actual. Si no hay una inscripción actual, se crea una nueva.
        """
        if self.__estudiante_cursa is None:
            self.__estudiante_cursa = Estudiante_Cursa()
        return self.__estudiante_cursa

    @_estudiante_cursa.setter
    def _estudiante_cursa(self, value):
        """
        Establece la inscripción de estudiante en cursa actual.
        """
        self.__estudiante_cursa = value

    def save(self):
        """
        Guarda la inscripción de estudiante en cursa actual en la base de datos.
        
        Returns:
            int: El ID de la inscripción guardada.
        """
        try:
            id = self._save_id(self._estudiante_cursa)
            return id
        except Exception as e:
            print(f"Error al guardar la estudiante_cursa: {e}")

    def update(self, id):
        """
        Actualiza la inscripción de estudiante en cursa con el ID proporcionado.
        
        Args:
            id (int): El ID de la inscripción a actualizar.
        
        Returns:
            bool: True si la actualización fue exitosa, False en caso contrario.
        """
        try:
            self._merge(id, self._estudiante_cursa)
            return True
        except Exception as e:
            print(f"Error actualizando la estudiante_cursa: {e}")
            return False

    def list(self):
        """
        Lista todas las inscripciones de estudiantes en cursas.
        
        Returns:
            list: Lista de todas las inscripciones de estudiantes en cursas.
        """
        return self._list()

    def get_estudiante_cursa_info_completa(self):
        """
        Obtiene la información completa de todas las inscripciones de estudiantes en cursas.
        
        Returns:
            list: Lista con la información completa de todas las inscripciones de estudiantes en cursas.
        """
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
