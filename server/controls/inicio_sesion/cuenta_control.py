from controls.dao.data_access_object import Data_Access_Object
from models.cuenta import Cuenta
import colorama


class CuentaControl(Data_Access_Object):
    """
    Controlador para la gestión de cuentas, hereda de Data_Access_Object para utilizar sus métodos de acceso a datos.

    :param Data_Access_Object: Clase base para el acceso a datos.
    """

    def __init__(self):
        """
        Inicializa la clase CuentaControl y la cuenta asociada a None.
        """
        super().__init__(Cuenta)
        self.__cuenta = None

    @property
    def _cuenta(self):
        """
        Propiedad _cuenta que devuelve una instancia de Cuenta si __cuenta es None.

        :returns: Instancia de la clase Cuenta.
        """
        if self.__cuenta is None:
            self.__cuenta = Cuenta()
        return self.__cuenta

    @_cuenta.setter
    def _cuenta(self, value):
        """
        Establece el valor de __cuenta.

        :param value: Valor a establecer en __cuenta.
        """
        self.__cuenta = value

    def save(self):
        """
        Guarda la cuenta en la base de datos.

        :returns: True si la cuenta se guardó con éxito, False en caso de error.
        :raises Exception: Si ocurre un error al guardar la cuenta.
        """
        try:
            self._save(self._cuenta)
            return True
        except Exception as e:
            print(f"Error guardando la cuenta: {e}")
            return False

    def update(self, id):
        """
        Actualiza la cuenta en la base de datos basado en su ID.

        :param id: ID de la cuenta a actualizar.
        :returns: True si la cuenta se actualizó con éxito, False en caso de error.
        :raises Exception: Si ocurre un error al actualizar la cuenta.
        """
        try:
            self._merge(id, self._cuenta)
            return True
        except Exception as e:
            print(f"Error actualizando la cuenta: {e}")
            return False

    def list(self):
        """
        Lista todas las cuentas en la base de datos.

        :returns: Lista de todas las cuentas.
        """
        return self._list()
