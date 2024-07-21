from controls.dao.data_access_object import Data_Access_Object
from models.unidad import Unidad


class UnidadControl(Data_Access_Object):
    """
    Controlador para manejar operaciones de la entidad Unidad.

    Hereda de Data_Access_Object para utilizar sus métodos genéricos de acceso a datos,
    adaptándolos a las necesidades específicas de la entidad Unidad.
    """

    def __init__(self):
        """
        Inicializa el controlador para Unidad.

        Establece la entidad Unidad como el modelo base para operaciones de acceso a datos.
        """
        super().__init__(Unidad)
        self.__unidad = None

    @property
    def _unidad(self):
        """
        Propiedad _unidad (getter).

        :return: Instancia actual de Unidad. Si no existe, crea una nueva.
        """
        if self.__unidad is None:
            self.__unidad = Unidad()
        return self.__unidad

    @_unidad.setter
    def _unidad(self, value):
        """
        Propiedad _unidad (setter).

        :param value: Instancia de Unidad a establecer.
        """
        self.__unidad = value

    def save(self) -> int:
        """
        Guarda una instancia de Unidad en la base de datos y devuelve su ID.

        :return: ID de la Unidad guardada. None si ocurre un error.
        """
        try:
            id = self._save_id(self._unidad)
            return id
        except Exception as e:
            print(f"Error al guardar la unidad: {e}")
            return None

    def update(self, id) -> bool:
        """
        Actualiza una instancia de Unidad en la base de datos basado en su ID.

        :param id: ID de la Unidad a actualizar.
        :return: True si la operación es exitosa, False en caso contrario.
        """
        try:
            self._merge(id, self._unidad)
            return True
        except Exception as e:
            print(f"Error al actualizar la unidad: {e}")
            return False

    def list(self):
        """
        Lista todas las instancias de Unidad en la base de datos.

        :return: Lista de instancias de Unidad.
        """
        return self._list()

    def delete(self, id) -> bool:
        """
        Elimina una instancia de Unidad de la base de datos basado en su ID.

        :param id: ID de la Unidad a eliminar.
        :return: True si la operación es exitosa, False en caso contrario.
        """
        try:
            self._delete(id)
            return True
        except Exception as e:
            print(f"Error al eliminar la unidad: {e}")
            return False
