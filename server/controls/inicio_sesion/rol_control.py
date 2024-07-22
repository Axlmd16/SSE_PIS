from controls.dao.data_access_object import Data_Access_Object
from models.rol import Rol


class RolControl(Data_Access_Object):
    """
    Controlador para la gestión de roles, hereda de Data_Access_Object para utilizar sus métodos de acceso a datos.

    :param Data_Access_Object: Clase base para el acceso a datos.
    """

    def __init__(self):
        """
        Inicializa la clase RolControl y el rol asociado a None.
        """
        super().__init__(Rol)
        self.__rol = None

    @property
    def _rol(self):
        """
        Propiedad _rol que devuelve una instancia de Rol si __rol es None.

        :returns: Instancia de la clase Rol.
        """
        if self.__rol is None:
            self.__rol = Rol()
        return self.__rol

    @_rol.setter
    def _rol(self, value):
        """
        Establece el valor de __rol.

        :param value: Valor a establecer en __rol.
        """
        self.__rol = value

    def save(self) -> bool:
        """
        Guarda el rol en la base de datos.

        :returns: True si el rol se guardó con éxito, False en caso de error.
        :raises Exception: Si ocurre un error al guardar el rol.
        """
        try:
            self._save(self._rol)
            return True
        except Exception as e:
            print(f"Error guardando el rol: {e}")
            return False

    def update(self, id) -> bool:
        """
        Actualiza el rol en la base de datos basado en su ID.

        :param id: ID del rol a actualizar.
        :returns: True si el rol se actualizó con éxito, False en caso de error.
        :raises Exception: Si ocurre un error al actualizar el rol.
        """
        try:
            self._merge(id, self._rol)
            return True
        except Exception as e:
            print(f"Error actualizando el rol: {e}")
            return False

    def list(self):
        """
        Lista todos los roles en la base de datos.

        :returns: Lista de todos los roles.
        """
        return self._list()
