from controls.dao.data_access_object import Data_Access_Object
from models.criterio import Criterio


class CriterioEvaluacionControl(Data_Access_Object):
    """
    Controlador para gestionar operaciones relacionadas con los criterios evaluacion.

    Hereda de Data_Access_Object para realizar operaciones de base de datos.
    """
    def __init__(self):
        """
        Inicializa una nueva instancia de CriterioEvaluacionControl.
        """
        super().__init__(Criterio)
        self.__criterio = None

    @property
    def _criterio(self):
        """
        Obtiene el criterio actual. Si no hay un criterio actual, se crea uno nuevo.

        Returns:
            Retorna la instancia actual de criterio.
        """
        if self.__criterio is None:
            self.__criterio = Criterio()
        return self.__criterio

    @_criterio.setter
    def _criterio(self, value):
        """
        Establece el criterio actual.
        
        Args:
            value (criterio): La instancia de criterio a establecer.
        """
        self.__criterio = value

    def save(self):
        """
        Guarda un nuevo criterio evaluacion en la base de datos.

        Returns:
            bool: True si se guarda correctamente, False en caso contrario.
        """
        try:
            self._save(self._criterio)
            return True
        except Exception as e:
            print(f"Error guardando el criterio evaluacion: {e}")
            return False

    def update(self, id):
        """
        Actualiza el criterio con el ID proporcionado.

        Args:
            id (int): El ID del criterio a actualizar.

        Returns:
            bool: True si se actualiza correctamente, False en caso contrario.
        """
        try:
            print(f"\n\n\nid: {id}")
            self._merge(id, self._criterio)
            return True
        except Exception as e:
            print(f"Error actualizando el criterio evaluacion: {e}")
            return False

    def list(self):
        """
        Lista todas los criterios evaluacion.
        
        Returns:
            list: Lista de todas los criterios evaluacion.
        """
        return self._list()
