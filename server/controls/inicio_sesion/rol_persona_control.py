from controls.dao.data_access_object import Data_Access_Object
from models.rol_persona import Rol_Persona


class RolPersonaControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Rol_Persona)
        self.__rol_persona = None

    @property
    def _rol_persona(self):
        if self.__rol_persona is None:
            self.__rol_persona = Rol_Persona()
        return self.__rol_persona

    @_rol_persona.setter
    def _rol_persona(self, value):
        self.__rol_persona = value

    def save(self) -> bool:
        try:
            self._save(self._rol_persona)
            return True
        except Exception as e:
            print(f"Error guardando rol en la persona: {e}")
            return False

    def list(self):
        return self._list()

    def delete(self, primary_keys: dict) -> bool:
        try:
            self._delete_compound_key(primary_keys)
            return True
        except Exception as e:
            print(f"Error eliminando el rol de la persona: {e}")
            return False

    def get_roles_by_person(self, id):
        lista = self._list()
        roles = []
        for rol in lista:
            if rol._persona_id == id:
                roles.append(rol)
        return roles
