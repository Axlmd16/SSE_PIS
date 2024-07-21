from controls.dao.data_access_object import Data_Access_Object
from models.malla import Malla


class MallaControl(Data_Access_Object):
    """
    Controlador para manejar operaciones de la entidad Malla.

    Hereda de Data_Access_Object para utilizar sus métodos genéricos de acceso a datos,
    adaptándolos a las necesidades específicas de la entidad Malla.
    """

    def __init__(self):
        """
        Inicializa el controlador para Malla.

        Establece la entidad Malla como el modelo base para operaciones de acceso a datos.
        """
        super().__init__(Malla)
        self.__malla = None

    @property
    def _malla(self):
        """
        Propiedad _malla (getter).

        :return: Instancia actual de Malla. Si no existe, crea una nueva.
        """
        if self.__malla is None:
            self.__malla = Malla()
        return self.__malla

    @_malla.setter
    def _malla(self, value):
        """
        Propiedad _malla (setter).

        :param value: Instancia de Malla a establecer.
        """
        self.__malla = value

    def save(self) -> bool:
        """
        Guarda una instancia de Malla en la base de datos.

        :return: True si la operación es exitosa, False en caso contrario.
        """
        try:
            self._save(self._malla)
            return True
        except Exception as e:
            print(f"Error al guardar la malla: {e}")
            return False

    def update(self, id) -> bool:
        """
        Actualiza una instancia de Malla en la base de datos basado en su ID.

        :param id: ID de la Malla a actualizar.
        :return: True si la operación es exitosa, False en caso contrario.
        """
        try:
            self._merge(id, self._malla)
            return True
        except Exception as e:
            print(f"Error al actualizar la malla: {e}")
            return False

    def list(self):
        """
        Lista todas las instancias de Malla en la base de datos.

        :return: Lista de instancias de Malla.
        """
        return self._list()
