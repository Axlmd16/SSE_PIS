from controls.dao.data_access_object import Data_Access_Object
from models.criterio import Criterio


class CriterioControl(Data_Access_Object):
    """
    Controlador para manejar operaciones de la entidad Criterio.

    Hereda de Data_Access_Object para utilizar sus métodos genéricos de acceso a datos,
    adaptándolos a las necesidades específicas de la entidad Criterio.
    """

    def __init__(self):
        """
        Inicializa el controlador para Criterio.

        Establece la entidad Criterio como el modelo base para operaciones de acceso a datos.
        """
        super().__init__(Criterio)
        self.__criterio = None

    @property
    def _criterio(self):
        """
        Propiedad _criterio (getter).

        :return: Instancia actual de Criterio. Si no existe, crea una nueva.
        """
        if self.__criterio is None:
            self.__criterio = Criterio()
        return self.__criterio

    @_criterio.setter
    def _criterio(self, value):
        """
        Propiedad _criterio (setter).

        :param value: Instancia de Criterio a establecer.
        """
        self.__criterio = value

    def save(self) -> bool:
        """
        Guarda una instancia de Criterio en la base de datos.

        :return: True si la operación es exitosa, False en caso contrario.
        """
        try:
            self._save(self._criterio)
            return True
        except Exception as e:
            print(f"Error al guardar el criterio: {e}")
            return False

    def update(self, id) -> bool:
        """
        Actualiza una instancia de Criterio en la base de datos basado en su ID.

        :param id: ID del Criterio a actualizar.
        :return: True si la operación es exitosa, False en caso contrario.
        """
        try:
            self._merge(id, self._criterio)
            return True
        except Exception as e:
            print(f"Error al actualizar el criterio: {e}")
            return False

    def list(self):
        """
        Lista todas las instancias de Criterio en la base de datos.

        :return: Lista de instancias de Criterio.
        """
        return self._list()
