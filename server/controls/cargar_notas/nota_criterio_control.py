from controls.dao.data_access_object import Data_Access_Object
from models.nota_criterio import Nota_Criterio


class NotaCriterioControl(Data_Access_Object):
    """
    Controlador para gestionar las notas de los criterios.

    Hereda de Data_Access_Object para realizar operaciones de base de datos.
    """
    def __init__(self):
        """
        Inicializa una nueva instancia de NotaCriterioControl.
        """
        super().__init__(Nota_Criterio)
        self.__nota_criterio = None

    @property
    def _nota_criterio(self):
        """
        Obtiene la nota del criterio actual. Si no hay una nota de criterio actual, se crea una nueva.
        
        Returns:
            Nota_Criterio: La nota del criterio actual.
        """
        if self.__nota_criterio is None:
            self.__nota_criterio = Nota_Criterio()
        return self.__nota_criterio

    @_nota_criterio.setter
    def _nota_criterio(self, value):
        """
        Establece la nota del criterio actual.
        
        Args:
            value (Nota_Criterio): La nota del criterio a establecer.
        """
        self.__nota_criterio = value

    def save(self) -> bool:
        """
        Guarda la nota del criterio actual en la base de datos.
        
        Returns:
            bool: True si la operación fue exitosa, False en caso contrario.
        """
        try:
            self._save(self._nota_criterio)
            return True
        except Exception as e:
            print(f"Error al guardar la nota del criterio: {e}")
            return False

    def update(self, id) -> bool:
        """
        Actualiza la nota del criterio con el ID proporcionado.
        
        Args:
            id (int): El ID de la nota del criterio a actualizar.
        
        Returns:
            bool: True si la operación fue exitosa, False en caso contrario.
        """
        try:
            self._merge(id, self._nota_criterio)
            return True
        except Exception as e:
            print(f"Error al actualizar la nota del criterio: {e}")

    def list(self):
        """
        Lista todas las notas de los criterios.
        
        Returns:
            list: Lista de todas las notas de los criterios.
        """
        return self._list()
