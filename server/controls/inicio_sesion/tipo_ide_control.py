from controls.dao.data_access_object import Data_Access_Object
from models.tipo_identificacion import Tipo_Identificacion


class TipoIdeControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Tipo_Identificacion)
        self.__tipo_ide = None

    @property
    def _tipo_ide(self):
        if self.__tipo_ide is None:
            self.__tipo_ide = Tipo_Identificacion()
        return self.__tipo_ide

    @_tipo_ide.setter
    def _tipo_ide(self, value):
        self.__tipo_ide = value

    def save(self):
        try:
            self._save(self._tipo_ide)
            return True
        except Exception as e:
            print(f"Error guardando el tipo de identificación: {e}")
            return False

    def update(self, pos):
        try:
            self._merge(self._tipo_ide)
            return True
        except Exception as e:
            print(f"Error actualizando el tipo de identificación: {e}")
            return False

    def list(self):
        return self._list()
