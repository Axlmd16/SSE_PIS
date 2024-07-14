from controls.dao.data_access_object import Data_Access_Object
from models.nota_criterio import Nota_Criterio


class NotaCriterioControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Nota_Criterio)
        self.__nota_criterio = None

    @property
    def _nota_criterio(self):
        if self.__nota_criterio is None:
            self.__nota_criterio = Nota_Criterio()
        return self.__nota_criterio

    @_nota_criterio.setter
    def _nota_criterio(self, value):
        self.__nota_criterio = value

    def save(self) -> bool:
        try:
            self._save(self._nota_criterio)
            return True
        except Exception as e:
            print(f"Error al guardar la nota del criterio: {e}")
            return False

    def update(self, id) -> bool:
        try:
            self._merge(id, self._nota_criterio)
            return True
        except Exception as e:
            print(f"Error al actualizar la nota del criterio: {e}")

    def list(self):
        return self._list()
