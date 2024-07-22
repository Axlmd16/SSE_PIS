from controls.dao.data_access_object import Data_Access_Object
from models.permiso import Permiso


class PermisoControl(Data_Access_Object):
    """
    Controlador para la gestión de permisos, hereda de Data_Access_Object para utilizar sus métodos de acceso a datos.

    :param Data_Access_Object: Clase base para el acceso a datos.
    """

    def __init__(self):
        """
        Inicializa la clase PermisoControl y el permiso asociado a None.
        """
        super().__init__(Permiso)
        self.__permiso = None

    @property
    def _permiso(self):
        """
        Propiedad _permiso que devuelve una instancia de Permiso si __permiso es None.

        :returns: Instancia de la clase Permiso.
        """
        if self.__permiso is None:
            self.__permiso = Permiso()
        return self.__permiso

    @_permiso.setter
    def _permiso(self, value):
        """
        Establece el valor de __permiso.

        :param value: Valor a establecer en __permiso.
        """
        self.__permiso = value

    def save(self) -> bool:
        """
        Guarda el permiso en la base de datos.

        :returns: True si el permiso se guardó con éxito, False en caso de error.
        :raises Exception: Si ocurre un error al guardar el permiso.
        """
        try:
            self._save(self._permiso)
            return True
        except Exception as e:
            print(f"Error guardando el permiso: {e}")
            return False

    def update(self, id) -> bool:
        """
        Actualiza el permiso en la base de datos basado en su ID.

        :param id: ID del permiso a actualizar.
        :returns: True si el permiso se actualizó con éxito, False en caso de error.
        :raises Exception: Si ocurre un error al actualizar el permiso.
        """
        try:
            self._merge(id, self._permiso)
            return True
        except Exception as e:
            print(f"Error actualizando el permiso: {e}")
            return False

    def list(self):
        """
        Lista todos los permisos en la base de datos.

        :returns: Lista de todos los permisos.
        """
        return self._list()
