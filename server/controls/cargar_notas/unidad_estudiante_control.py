from controls.dao.data_access_object import Data_Access_Object
from models.unidad_estudiante import Unidad_Estudiante

class UnidadEstudianteControl(Data_Access_Object):
    """
    Controlador para gestionar las unidades de los estudiantes.

    Hereda de Data_Access_Object para realizar operaciones de base de datos.
    """
    def __init__(self):
        """
        Inicializa una nueva instancia de UnidadEstudianteControl.
        """
        super().__init__(Unidad_Estudiante)
        self.__unidad_estudiante = None

    @property
    def _unidad_estudiante(self):
        """
        Obtiene la unidad del estudiante actual. Si no hay una unidad de estudiante actual, se crea una nueva.
        
        Returns:
            Unidad_Estudiante: La unidad del estudiante actual.
        """
        if self.__unidad_estudiante is None:
            self.__unidad_estudiante = Unidad_Estudiante()
        return self.__unidad_estudiante

    @_unidad_estudiante.setter
    def _unidad_estudiante(self, value):
        """
        Establece la unidad del estudiante actual.
        
        Args:
            value (Unidad_Estudiante): La unidad del estudiante a establecer.
        """
        self.__unidad_estudiante = value

    def save(self) -> int:
        """
        Guarda la unidad del estudiante actual en la base de datos y devuelve el ID generado.
        
        Returns:
            int: El ID generado para la unidad del estudiante.
        """
        try:
            id = self._save_id(self._unidad_estudiante)
            return id
        except Exception as e:
            print(f"Error al guardar la unidad del estudiante: {e}")

    def update(self, id) -> bool:
        """
        Actualiza la unidad del estudiante con el ID proporcionado.
        
        Args:
            id (int): El ID de la unidad del estudiante a actualizar.
        
        Returns:
            bool: True si la operación fue exitosa, False en caso contrario.
        """
        try:
            self._merge(id, self._unidad_estudiante)
            return True
        except Exception as e:
            print(f"Error al actualizar la unidad del estudiante: {e}")
            return False

    def list(self):
        """
        Lista todas las unidades de los estudiantes.
        
        Returns:
            list: Lista de todas las unidades de los estudiantes.
        """
        return self._list()
