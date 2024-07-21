from controls.dao.data_access_object import Data_Access_Object
from models.ciclo import Ciclo


class CicloControl(Data_Access_Object):
    """
    Controlador para manejar operaciones de la entidad Ciclo.

    Hereda de Data_Access_Object para utilizar sus métodos genéricos de acceso a datos,
    adaptándolos a las necesidades específicas de la entidad Ciclo.
    """

    def __init__(self):
        """
        Inicializa el controlador para Ciclo.

        Establece la entidad Ciclo como el modelo base para operaciones de acceso a datos.
        """
        super().__init__(Ciclo)
        self.__ciclo = None

    @property
    def _ciclo(self):
        """
        Propiedad _ciclo (getter).

        :return: Instancia actual de Ciclo. Si no existe, crea una nueva.
        """
        if self.__ciclo is None:
            self.__ciclo = Ciclo()
        return self.__ciclo

    @_ciclo.setter
    def _ciclo(self, value):
        """
        Propiedad _ciclo (setter).

        :param value: Instancia de Ciclo a establecer.
        """
        self.__ciclo = value

    def save(self) -> bool:
        """
        Guarda una instancia de Ciclo en la base de datos.

        :return: True si la operación es exitosa, False en caso contrario.
        """
        try:
            self._save(self._ciclo)
            return True
        except Exception as e:
            print(f"Error al guardar el ciclo: {e}")
            return False

    def update(self, id) -> bool:
        """
        Actualiza una instancia de Ciclo en la base de datos basado en su ID.

        :param id: ID del Ciclo a actualizar.
        :return: True si la operación es exitosa, False en caso contrario.
        """
        try:
            self._merge(id, self._ciclo)
            return True
        except Exception as e:
            print(f"Error al actualizar el ciclo: {e}")
            return False

    def list(self):
        """
        Lista todas las instancias de Ciclo en la base de datos.

        :return: Lista de instancias de Ciclo.
        """
        return self._list()
