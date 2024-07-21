from controls.dao.data_access_object import Data_Access_Object
from models.cuenta import Cuenta
import colorama


class CuentaControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Cuenta)
        self.__cuenta = None

    @property
    def _cuenta(self):
        if self.__cuenta is None:
            self.__cuenta = Cuenta()
        return self.__cuenta

    @_cuenta.setter
    def _cuenta(self, value):
        self.__cuenta = value

    def save(self):
        try:
            self._save(self._cuenta)
            return True
        except Exception as e:
            print(f"Error guardando la cuenta: {e}")
            return False

    def update(self, id):
        try:
            self._merge(id, self._cuenta)
            return True
        except Exception as e:
            print(f"Error actualizando la cuenta: {e}")
            return False

    def list(self):
        return self._list()
