from controls.dao.data_access_object import Data_Access_Object
from models.matricula import Matricula
import random


class MatriculaControl(Data_Access_Object):
    """
    Controlador para gestionar las matrículas.

    Hereda de Data_Access_Object para realizar operaciones de base de datos.
    """
    def __init__(self):
        """
        Inicializa una nueva instancia de MatriculaControl.
        """
        super().__init__(Matricula)
        self.__matricula = None

    @property
    def _matricula(self):
        """
        Obtiene la matrícula actual. Si no hay una matrícula actual, se crea una nueva.
        
        Returns:
            Matricula: La matrícula actual.
        """
        if self.__matricula is None:
            self.__matricula = Matricula()
        return self.__matricula

    @_matricula.setter
    def _matricula(self, value):
        """
        Establece la matrícula actual.
        
        Args:
            value (Matricula): La matrícula a establecer.
        """
        self.__matricula = value

    def save(self) -> bool:
        """
        Guarda la matrícula actual en la base de datos.
        
        Returns:
            bool: True si la operación fue exitosa, False en caso contrario.
        """
        try:
            self._save(self._matricula)
            return True
        except Exception as e:
            print(f"Error al guardar el criterio: {e}")
            return False

    def update(self, id) -> bool:
        """
        Actualiza la matrícula con el ID proporcionado.
        
        Args:
            id (int): El ID de la matrícula a actualizar.
        
        Returns:
            bool: True si la operación fue exitosa, False en caso contrario.
        """
        try:
            self._merge(id, self._matricula)
            return True
        except Exception as e:
            print(f"Error al actualizar el criterio: {e}")

    def list(self):
        """
        Lista todas las matrículas.
        
        Returns:
            list: Lista de todas las matrículas.
        """
        return self._list()

    def generate_cod_matricula(self) -> str:
        """
        Genera un código de matrícula aleatorio.
        
        Returns:
            str: Un código de matrícula aleatorio de 10 caracteres.
        """
        return "".join(random.choices("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", k=10))
