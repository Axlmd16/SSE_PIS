from controls.dao.data_access_object import Data_Access_Object
from models.genero import Genero


class GeneroControl(Data_Access_Object):
    """
    Controlador para la gestión de géneros, hereda de Data_Access_Object para utilizar sus métodos de acceso a datos.

    :param Data_Access_Object: Clase base para el acceso a datos.
    """

    def __init__(self):
        """
        Inicializa la clase GeneroControl y el género asociado a None.
        """
        super().__init__(Genero)
        self.__genero = None

    @property
    def _genero(self):
        """
        Propiedad _genero que devuelve una instancia de Genero si __genero es None.

        :returns: Instancia de la clase Genero.
        """
        if self.__genero is None:
            self.__genero = Genero()
        return self.__genero

    @_genero.setter
    def _genero(self, value):
        """
        Establece el valor de __genero.

        :param value: Valor a establecer en __genero.
        """
        self.__genero = value

    def save(self):
        """
        Guarda el género en la base de datos.

        :returns: True si el género se guardó con éxito, False en caso de error.
        :raises Exception: Si ocurre un error al guardar el género.
        """
        try:
            self._save(self._genero)
            return True
        except Exception as e:
            print(f"Error guardando el género: {e}")
            return False

    def update(self, id):
        """
        Actualiza el género en la base de datos.

        :param pos: No se utiliza en la implementación actual.
        :returns: True si el género se actualizó con éxito, False en caso de error.
        :raises Exception: Si ocurre un error al actualizar el género.
        """
        try:
            self._merge(id, self._genero)
            return True
        except Exception as e:
            print(f"Error actualizando el género: {e}")
            return False

    def list(self):
        """
        Lista todos los géneros en la base de datos.

        :returns: Lista de todos los géneros.
        """
        return self._list()
