from controls.dao.data_access_object import Data_Access_Object
from models.tipo_identificacion import Tipo_Identificacion


class TipoIdeControl(Data_Access_Object):
    """
    Controlador para la gestión de tipos de identificación, hereda de Data_Access_Object para utilizar sus métodos de acceso a datos.

    :param Data_Access_Object: Clase base para el acceso a datos.
    """

    def __init__(self):
        """
        Inicializa la clase TipoIdeControl y el tipo_ide asociado a None.
        """
        super().__init__(Tipo_Identificacion)
        self.__tipo_ide = None

    @property
    def _tipo_ide(self):
        """
        Propiedad _tipo_ide que devuelve una instancia de Tipo_Identificacion si __tipo_ide es None.

        :returns: Instancia de la clase Tipo_Identificacion.
        """
        if self.__tipo_ide is None:
            self.__tipo_ide = Tipo_Identificacion()
        return self.__tipo_ide

    @_tipo_ide.setter
    def _tipo_ide(self, value):
        """
        Establece el valor de __tipo_ide.

        :param value: Valor a establecer en __tipo_ide.
        """
        self.__tipo_ide = value

    def save(self):
        """
        Guarda el tipo de identificación en la base de datos.

        :returns: True si el tipo de identificación se guardó con éxito, False en caso de error.
        :raises Exception: Si ocurre un error al guardar el tipo de identificación.
        """
        try:
            self._save(self._tipo_ide)
            return True
        except Exception as e:
            print(f"Error guardando el tipo de identificación: {e}")
            return False

    def update(self, id):
        """
        Actualiza el tipo de identificación en la base de datos basado en su ID.

        :param id: ID del tipo de identificación a actualizar.
        :returns: True si el tipo de identificación se actualizó con éxito, False en caso de error.
        :raises Exception: Si ocurre un error al actualizar el tipo de identificación.
        """
        try:
            self._merge(id, self._tipo_ide)
            return True
        except Exception as e:
            print(f"Error actualizando el tipo de identificación: {e}")
            return False

    def list(self):
        """
        Lista todos los tipos de identificación en la base de datos.

        :returns: Lista de todos los tipos de identificación.
        """
        return self._list()
