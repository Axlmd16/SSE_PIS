from controls.dao.data_access_object import Data_Access_Object
from models.estudiante import Estudiante
from controls.inicio_sesion.persona_control import PersonaControl
from controls.inicio_sesion.cuenta_control import CuentaControl
from models.persona import Persona
from controls.tda.list.linked_list import Linked_List
from controls.dao.connection import ConnectionDB
import colorama
import asyncio
import time


class EstudianteControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Estudiante)
        self.__estudiante = None
        self.__persona_control = PersonaControl()

    @property
    def _estudiante(self):
        if self.__estudiante is None:
            self.__estudiante = Estudiante()
        return self.__estudiante

    @_estudiante.setter
    def _estudiante(self, value):
        self.__estudiante = value

    def save(self, *args) -> bool:
        try:
            persona = PersonaControl()
            cuenta = CuentaControl()

            # Asignación de valores
            persona._persona._primer_nombre = args[0]
            persona._persona._segundo_nombre = args[1]
            persona._persona._primer_apellido = args[2]
            persona._persona._segundo_apellido = args[3]
            persona._persona._telefono = args[4]
            persona._persona._dni = args[5]
            persona._persona._fecha_nacimiento = args[6]
            persona._persona._email = args[7]
            persona._persona._tipo_identificacion_id = args[8]
            persona._persona._genero_id = args[9]

            # Guarda la persona y obtiene su ID
            id = persona.save()
            if not id:
                raise ValueError("No se pudo guardar la persona")

            self._estudiante._id = id
            self._estudiante._codigo_estudiante = args[10]

            # Guarda el estudiante
            if not self._save(self._estudiante):
                raise ValueError("No se pudo guardar el estudiante")

            return True
        except Exception as e:
            print(f"Error guardando el estudiante: {e}")
            return False

    def update(self, id) -> bool:
        try:
            self._merge(id, self._estudiante)
            return True
        except Exception as e:
            print(f"Error actualizando el estudiante: {e}")
            return False

    def list(self):
        return self._list()

    def list_with_person_details(self) -> list:
        try:
            return self._list_estudiante()
        except Exception as e:
            print(f"Error listando estudiantes con detalles de persona: {e}")
            return []

    # * Metodo para obtener toda la informacion de los estudiantes

    def _list_estudiante(self) -> list:
        try:
            inicio_tiempo = time.time()
            estudiante_info_completa = []

            # * Carga de datos en listas
            data_estudiantes = self.list()
            data_personas = self.__persona_control.list()

            # * Ordenamiento de datos
            data_estudiante_ordenada = data_estudiantes.quick_sort_with_attribute(
                data_estudiantes.to_array, "_id", 1
            )
            data_personas_ordenada = data_personas.quick_sort_with_attribute(
                data_personas.to_array, "_id", 1
            )

            for estudiante in data_estudiante_ordenada:
                persona_id = estudiante._id
                persona_info = data_personas.busqueda_binaria_atribute(
                    data_personas_ordenada, "_id", persona_id
                )

                if persona_info:
                    estudiante_info = {
                        # * Atributos del estudiante
                        "id": estudiante._id,
                        "codigo_estudiante": estudiante._codigo_estudiante,
                        # * Atributos de la persona ligada al estudiante
                        "primer_nombre": persona_info._primer_nombre,
                        "segundo_nombre": persona_info._segundo_nombre,
                        "primer_apellido": persona_info._primer_apellido,
                        "segundo_apellido": persona_info._segundo_apellido,
                        "telefono": persona_info._telefono,
                        "dni": persona_info._dni,
                        "fecha_nacimiento": persona_info._fecha_nacimiento,
                        "email": persona_info._email,
                        "tipo_identificacion_id": persona_info._tipo_identificacion_id,
                        "genero_id": persona_info._genero_id,
                    }
                estudiante_info_completa.append(estudiante_info)
            final_tiempo = time.time()
            # print(colorama.Fore.RED + f"\nTiempo de ejecucion busqueda estudiantes: {final_tiempo - inicio_tiempo}\n" + colorama.Fore.RESET)
            return estudiante_info_completa

        except Exception as e:
            print(f"Error en listar_estudiante: {e}")
