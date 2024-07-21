class Criterio:
    """
    Representa un criterio de evaluación con su identificador, nombre y porcentaje.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self) -> None:
        """
        Inicializa una nueva instancia de la clase Criterio.
        """
        self.__id = None
        self.__nombre = " "
        self.__porcentaje = " "

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _nombre(self):
        return self.__nombre

    @_nombre.setter
    def _nombre(self, value):
        self.__nombre = value

    @property
    def _porcentaje(self):
        return self.__porcentaje

    @_porcentaje.setter
    def _porcentaje(self, value):
        self.__porcentaje = value

    def __str__(self) -> str:
        """
        Devuelve el nombre del criterio.

        :returns: El nombre del criterio.
        """
        return self.__nombre

    def serializable(self):
        """
        Convierte la instancia de Criterio en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Criterio.
        """
        return {
            "id": self.__id,
            "nombre": self.__nombre,
            "porcentaje": self.__porcentaje,
        }

    @staticmethod
    def deserializable(data: dict):
        """
        Crea una instancia de Criterio a partir de un diccionario.

        :param data: Diccionario con los datos del criterio.
        :returns: Una instancia de Criterio.
        """
        criterio = Criterio()
        criterio._id = data["id"]
        criterio._nombre = data["nombre"]
        criterio._porcentaje = data["porcentaje"]
        return criterio
