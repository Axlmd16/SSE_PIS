from controls.dao.data_access_object import Data_Access_Object
from models.ciclo import Ciclo


class CicloControl(Data_Access_Object):
    """
    Controlador para gestionar operaciones relacionadas con los ciclos.

    Hereda de Data_Access_Object para realizar operaciones de base de datos.
    """
    def __init__(self):
        """
        Inicializa una nueva instancia de CicloControl.
        """
        super().__init__(Ciclo)
        self.__ciclo = None

    @property
    def _ciclo(self):
        """
        Obtiene el ciclo actual. Si no hay un periodo ciclo actual, se crea uno nuevo.

        Returns:
            Retorna la instancia actual de Ciclo.
        """
        if self.__ciclo is None:
            self.__ciclo = Ciclo()
        return self.__ciclo

    @_ciclo.setter
    def _ciclo(self, value):
        """
        Establece el ciclo actual.
        
        Args:
            value (Ciclo): La instancia de Ciclo a establecer.
        """
        self.__ciclo = value

    def save(self):
        """
        Guarda un nuevo ciclo en la base de datos.

        Returns:
            bool: True si se guarda correctamente, False en caso contrario.
        """
        try:
            self._save(self._ciclo)
            return True
        except Exception as e:
            print(f"Error guardando el genero: {e}")
            return False

    def update(self, id):
        """
        Actualiza el ciclo con el ID proporcionado.

        Args:
            id (int): El ID del ciclo a actualizar.

        Returns:
            bool: True si se actualiza correctamente, False en caso contrario.
        """
        try:
            # print(f"\n\n\nid: {id}")
            self._merge(id, self._ciclo)
            return True
        except Exception as e:
            print(f"Error actualizando el genero: {e}")
            return False

    def list(self):
        """
        Lista todas los ciclos.
        
        Returns:
            list: Lista de todas los ciclos.
        """
        return self._list()
