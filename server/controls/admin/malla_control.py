from controls.dao.data_access_object import Data_Access_Object
from models.malla import Malla


class MallaControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Malla)
        self.__malla = None

    @property
    def _malla(self):
        if self.__malla is None:
            self.__malla = Malla()
        return self.__malla

    @_malla.setter
    def _malla(self, value):
        self.__malla = value

    def save(self) -> bool:
        try:
            self._save(self._malla)
            return True
        except:
            return False

    def update(self, id) -> bool:
        try:
            self._merge(id, self._malla)
            return True
        except:
            return False

    def list(self):
        return self._list()
