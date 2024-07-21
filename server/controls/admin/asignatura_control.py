from controls.dao.data_access_object import Data_Access_Object
from models.asignatura import Asignatura


class AsignaturaControl(Data_Access_Object):
    """
    Controlador para manejar operaciones de la entidad Asignatura.

    Hereda de Data_Access_Object para utilizar sus métodos genéricos de acceso a datos,
    adaptándolos a las necesidades específicas de la entidad Asignatura.
    """

    def __init__(self):
        """
        Inicializa el controlador para Asignatura.

        Establece la entidad Asignatura como el modelo base para operaciones de acceso a datos.
        """
        super().__init__(Asignatura)
        self.__asignatura = None

    @property
    def _asignatura(self):
        """
        Propiedad _asignatura (getter).

        :return: Instancia actual de Asignatura. Si no existe, crea una nueva.
        """
        if self.__asignatura is None:
            self.__asignatura = Asignatura()
        return self.__asignatura

    @_asignatura.setter
    def _asignatura(self, value):
        """
        Propiedad _asignatura (setter).

        :param value: Instancia de Asignatura a establecer.
        """
        self.__asignatura = value

    def save(self) -> bool:
        """
        Guarda una instancia de Asignatura en la base de datos.

        :return: True si la operación es exitosa, False en caso contrario.
        """
        try:
            self._save(self._asignatura)
            return True
        except Exception as e:
            print(f"Error al guardar la asignatura: {e}")
            return False

    def update(self, id) -> bool:
        """
        Actualiza una instancia de Asignatura en la base de datos basado en su ID.

        :param id: ID de la Asignatura a actualizar.
        :return: True si la operación es exitosa, False en caso contrario.
        """
        try:
            self._merge(id, self._asignatura)
            return True
        except Exception as e:
            print(f"Error al actualizar la asignatura: {e}")
            return False

    def list(self):
        """
        Lista todas las instancias de Asignatura en la base de datos.

        :return: Lista de instancias de Asignatura.
        """
        return self._list()
