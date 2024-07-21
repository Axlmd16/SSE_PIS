class Ciclo:
    """
    Representa un ciclo académico con su identificador y nombre.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self):
        """
        Inicializa una nueva instancia de la clase Ciclo.
        """
        self.__id = None
        self.__ciclo = ""

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _ciclo(self):
        return self.__ciclo

    @_ciclo.setter
    def _ciclo(self, value):
        self.__ciclo = value

    def serializable(self):
        """
        Convierte la instancia de Ciclo en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Ciclo.
        """
        return {
            "id": self.__id,
            "ciclo": self.__ciclo,
        }

    def __str__(self):
        """
        Devuelve una representación en cadena de la instancia de Ciclo.

        :returns: Una cadena que representa el id y el ciclo.
        """
        return f"{self.__id} --> {self.__ciclo}\n"

    @staticmethod
    def deserializable(data: dict):
        """
        Crea una instancia de Ciclo a partir de un diccionario.

        :param data: Diccionario con los datos del ciclo.
        :returns: Una instancia de Ciclo.
        """
        ciclo = Ciclo()
        ciclo._id = data["id"]
        ciclo._ciclo = data["ciclo"]
        return ciclo
