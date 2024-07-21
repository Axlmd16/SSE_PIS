from controls.dao.data_access_object import Data_Access_Object
from models.grupo import Grupo


class GrupoControl(Data_Access_Object):
    """
    Controlador para manejar operaciones de la entidad Grupo.

    Hereda de Data_Access_Object para utilizar sus métodos genéricos de acceso a datos,
    adaptándolos a las necesidades específicas de la entidad Grupo.
    """

    def __init__(self):
        """
        Inicializa el controlador para Grupo.

        Establece la entidad Grupo como el modelo base para operaciones de acceso a datos.
        """
        super().__init__(Grupo)
        self.__grupo = None

    @property
    def _grupo(self):
        """
        Propiedad _grupo (getter).

        :return: Instancia actual de Grupo. Si no existe, crea una nueva.
        """
        if self.__grupo is None:
            self.__grupo = Grupo()
        return self.__grupo

    @_grupo.setter
    def _grupo(self, value):
        """
        Propiedad _grupo (setter).

        :param value: Instancia de Grupo a establecer.
        """
        self.__grupo = value

    def save(self) -> bool:
        """
        Guarda una instancia de Grupo en la base de datos.

        :return: True si la operación es exitosa, False en caso contrario.
        """
        try:
            self._save(self._grupo)
            return True
        except Exception as e:
            print(f"Error al guardar Grupo: {e}")
            return False

    def update(self, id) -> bool:
        """
        Actualiza una instancia de Grupo en la base de datos basado en su ID.

        :param id: ID del Grupo a actualizar.
        :return: True si la operación es exitosa, False en caso contrario.
        """
        try:
            self._merge(id, self._grupo)
            return True
        except Exception as e:
            print(f"Error al actualizar el grupo: {e}")
            return False

    def list(self):
        """
        Lista todas las instancias de Grupo en la base de datos.

        :return: Lista de instancias de Grupo.
        """
        return self._list()
