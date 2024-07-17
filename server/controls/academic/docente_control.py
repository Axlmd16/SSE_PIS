from controls.dao.data_access_object import Data_Access_Object
from models.docente import Docente
from controls.inicio_sesion.persona_control import PersonaControl
from controls.inicio_sesion.cuenta_control import CuentaControl
from models.persona import Persona
from controls.dao.connection import ConnectionDB
from controls.inicio_sesion.rol_persona_control import RolPersonaControl
from controls.tda.list.linked_list import Linked_List
from controls.tda.list.utilidades import encrypt_password
import colorama
import asyncio
import time 

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
            cuenta._cuenta._clave = encrypt_password(dni)
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
    
    def list(self):
        return self._list()

    def list_with_person_details(self) -> list:
        try:
            lista = self._list_docente()
            lista_docentes = lista.to_array
            return lista_docentes
        except Exception as e:
            print(f"Error listando docentes con detalles de persona: {e}")
            return []
        
    def list_with_person_linked(self) -> list:
        try:
            lista = self._list_docente()
            return lista
        except Exception as e:
            print(f"Error listando estudiantes con detalles de persona: {e}")
            return []
        
    def _list_docente(self) -> list:
        try:
            inicio_tiempo = time.time()
            docente_info_completa = Linked_List()

            #* Carga de datos en listas
            data_docentes = self.list()
            data_personas = self.__persona_control.list()

            #* Ordenamiento de datos
            data_docente_ordenada = data_docentes.quick_sort_with_attribute(data_docentes.to_array, "_id", 1)
            data_personas_ordenada = data_personas.quick_sort_with_attribute(data_personas.to_array, "_id", 1)
            
            for docente in data_docente_ordenada:
                persona_id = docente._id
                persona_info = data_personas.busqueda_binaria_atribute(data_personas_ordenada,"_id", persona_id)
                
                if persona_info:
                    docente_info = {
                        #* Atributos del docente
                        "id": docente._id,
                        "titulo": docente._titulo,
                        "experiencia_laboral": docente._experiencia_laboral,
                        "cubiculo": docente._cubiculo,
                        #* Atributos de la persona ligada al docente
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
                docente_info_completa.add(docente_info)
            final_tiempo = time.time()
            # print(colorama.Fore.RED + f"\nTiempo de ejecucion busqueda docentes: {final_tiempo - inicio_tiempo}\n" + colorama.Fore.RESET)
            return docente_info_completa

        except Exception as e:
            print(f"Error en listar_estudiante: {e}")
            
 