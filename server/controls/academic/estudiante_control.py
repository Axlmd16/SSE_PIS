from controls.dao.data_access_object import Data_Access_Object
from models.estudiante import Estudiante
from controls.inicio_sesion.persona_control import PersonaControl
from controls.inicio_sesion.cuenta_control import CuentaControl
from models.persona import Persona
from controls.dao.connection import ConnectionDB

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
            primer_nombre = args[0]
            persona._persona._primer_nombre = primer_nombre
            persona._persona._segundo_nombre = args[1]
            primer_apellido = args[2]
            persona._persona._primer_apellido = primer_apellido
            persona._persona._segundo_apellido = args[3]
            persona._persona._telefono = args[4]
            dni = args[5]
            persona._persona._dni = dni
            fecha_nacimiento = args[6]
            persona._persona._fecha_nacimiento = fecha_nacimiento
            persona._persona._email = args[7]
            persona._persona._tipo_identificacion_id = args[8]
            persona._persona._genero_id = args[9]
            id = persona.save()
            self._estudiante._id = id
            self._estudiante._codigo_estudiante = args[10]
            self._estudiante._nro_matricula = args[11]
            self._save(self._estudiante)
            cuenta._cuenta._usuario = f"{primer_nombre}_{primer_apellido}@unl.edu.ec"
            cuenta._cuenta._clave = f"{dni}"
            cuenta._cuenta._estado = 1
            cuenta._cuenta._persona_id = self._estudiante._id
            cuenta.save()
            
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

    def list_with_person_details(self) -> list:
        try:
            return self._list_estudiante()
        except Exception as e:
            print(f"Error listando estudiantes con detalles de persona: {e}")
            return []

    def _list_estudiante(self) -> list:
        estudiante_info_completa = []
        data_estudiantes = self._to_dict()
        data_personas = self.__persona_control._to_dict()

        for estudiante in data_estudiantes:
            persona_id = estudiante['id']
            persona_info = next((p for p in data_personas if p['id'] == persona_id), None)

            if persona_info:
                estudiante_info = {
                    'id': estudiante['id'],
                    'primer_nombre': persona_info['primer_nombre'],
                    'segundo_nombre': persona_info['segundo_nombre'],
                    'primer_apellido': persona_info['primer_apellido'],
                    'segundo_apellido': persona_info['segundo_apellido'],
                    'telefono': persona_info['telefono'],
                    'dni': persona_info['dni'],
                    'fecha_nacimiento': persona_info['fecha_nacimiento'],
                    'email': persona_info['email'],
                    'tipo_identificacion_id': persona_info['tipo_identificacion_id'],
                    'genero_id': persona_info['genero_id'],
                    'nro_matricula': estudiante['nro_matricula'],
                    'codigo_estudiante': estudiante['codigo_estudiante'],
                }
                estudiante_info_completa.append(estudiante_info)

        return estudiante_info_completa
