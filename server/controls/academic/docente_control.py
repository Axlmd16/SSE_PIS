from controls.dao.data_access_object import Data_Access_Object
from models.docente import Docente
from controls.inicio_sesion.persona_control import PersonaControl
from controls.inicio_sesion.cuenta_control import CuentaControl
from models.persona import Persona
from controls.dao.connection import ConnectionDB
from controls.inicio_sesion.rol_persona_control import RolPersonaControl


class DocenteControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Docente)
        self.__docente = None
        self.__persona_control = PersonaControl()

    @property
    def _docente(self):
        if self.__docente is None:
            self.__docente = Docente()
        return self.__docente

    @_docente.setter
    def _docente(self, value):
        self.__docente = value

    def save(self, *args) -> bool:
        try:
            persona = PersonaControl()
            cuenta = CuentaControl()
            rpc = RolPersonaControl()
            i = 0
            for a in args:
                print(f"{i}: {a}")
                i += 1
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
            self._docente._id = id
            self._docente._titulo = args[10]
            self._docente._experiencia_laboral = args[11]
            self._docente._cubiculo = args[12]
            self._save(self._docente)
            cuenta._cuenta._usuario = f"{primer_nombre}_{primer_apellido}@unl.edu.ec"
            cuenta._cuenta._clave = f"{dni}"
            cuenta._cuenta._estado = 1
            cuenta._cuenta._persona_id = self._docente._id
            cuenta.save()
            rpc._rol_persona._rol_id = 2
            rpc._rol_persona._persona_id = id
            if rpc.save():
                print("Rol persona guardado")
                return True
        except Exception as e:
            print(f"Error guardando el docente: {e}")
            return False

    def update(self, id) -> bool:
        try:
            self._merge(id, self._docente)
            return True
        except Exception as e:
            print(f"Error actualizando el docente: {e}")
            return False

    def list_with_person_details(self) -> list:
        try:
            return self._list_docente()
        except Exception as e:
            print(f"Error listando docentes con detalles de persona: {e}")
            return []

    def _list_docente(self) -> list:
        docente_info_completa = []
        data_docentes = self._to_dict()
        data_personas = self.__persona_control._to_dict()

        for docente in data_docentes:
            persona_id = docente['id']
            persona_info = next((p for p in data_personas if p['id'] == persona_id), None)

            if persona_info:
                estudiante_info = {
                    'id': docente['id'],
                    'primer_nombre': persona_info['primer_nombre'],
                    'segundo_nombre': persona_info['segundo_nombre'],
                    'primer_apellido': persona_info['primer_apellido'],
                    'segundo_apellido': persona_info['segundo_apellido'],
                    'dni': persona_info['dni'],
                    'telefono': persona_info['telefono'],
                    'fecha_nacimiento': persona_info['fecha_nacimiento'],
                    'email': persona_info['email'],
                    'tipo_identificacion_id': persona_info['tipo_identificacion_id'],
                    'genero_id': persona_info['genero_id'],
                    'titulo': docente['titulo'],
                    'experiencia_laboral': docente['experiencia_laboral'],
                    'cubiculo': docente['cubiculo'],
                }
                docente_info_completa.append(estudiante_info)

        return docente_info_completa
    
    
 