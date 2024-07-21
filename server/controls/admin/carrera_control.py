from controls.dao.data_access_object import Data_Access_Object
from models.carrera import Carrera


class CarreraControl(Data_Access_Object):
    """
    Controlador para manejar operaciones de la entidad Carrera.

    Hereda de Data_Access_Object para utilizar sus métodos genéricos de acceso a datos,
    adaptándolos a las necesidades específicas de la entidad Carrera.
    """

    def __init__(self):
        """
        Inicializa el controlador para Carrera.

        Establece la entidad Carrera como el modelo base para operaciones de acceso a datos.
        """
        super().__init__(Carrera)
        self.__carrera = None

    @property
    def _carrera(self):
        """
        Propiedad _carrera (getter).

        :return: Instancia actual de Carrera. Si no existe, crea una nueva.
        """
        if self.__carrera is None:
            self.__carrera = Carrera()
        return self.__carrera

    @_carrera.setter
    def _carrera(self, value):
        """
        Propiedad _carrera (setter).

        :param value: Instancia de Carrera a establecer.
        """
        self.__carrera = value

    def save(self) -> bool:
        """
        Guarda una instancia de Carrera en la base de datos.

        :return: True si la operación es exitosa, False en caso contrario.
        """
        try:
            self._save(self._carrera)
            return True
        except Exception as e:
            print(f"Error al guardar carrera: {e}")
            return False

    def update(self, id) -> bool:
        """
        Actualiza una instancia de Carrera en la base de datos basado en su ID.

        :param id: ID de la Carrera a actualizar.
        :return: True si la operación es exitosa, False en caso contrario.
        """
        try:
            self._merge(id, self._carrera)
            return True
        except Exception as e:
            print(f"Error al actualizar carrera: {e}")
            return False

    def list(self):
        """
        Lista todas las instancias de Carrera en la base de datos.

        :return: Lista de instancias de Carrera.
        """
        return self._list()
