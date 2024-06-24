from controls.dao.data_access_object import Data_Access_Object
from models.persona import Persona


class PersonaControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Persona)
        self.__persona = None

    @property
    def _persona(self):
        if self.__persona is None:
            self.__persona = Persona()
        return self.__persona

    @_persona.setter
    def _persona(self, value):
        self.__persona = value

    def save(self) -> bool:
        try:
            id = self._save_id(self._persona)
            return id
        except Exception as e:
            print(f"Error guardando la persona: {e}")
            return False

    def update(self, id) -> bool:
        try:
            self._merge(id, self._persona)
            return True
        except Exception as e:
            print(f"Error actualizando la persona: {e}")
            return False

    def list(self):
        return self._list()
