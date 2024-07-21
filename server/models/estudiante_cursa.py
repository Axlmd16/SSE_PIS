class Estudiante_Cursa:
    """
    Representa la relación entre un estudiante y el curso que está tomando.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self) -> None:
        """
        Inicializa una nueva instancia de la clase Estudiante_Cursa.
        """
        self.__id = None
        self.__estudiante_id = 0
        self.__cursa_id = 0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _estudiante_id(self):
        return self.__estudiante_id

    @_estudiante_id.setter
    def _estudiante_id(self, value):
        self.__estudiante_id = value

    @property
    def _cursa_id(self):
        return self.__cursa_id

    @_cursa_id.setter
    def _cursa_id(self, value):
        self.__cursa_id = value

    def __str__(self) -> str:
        """
        Devuelve una representación en cadena de la relación entre estudiante y curso.

        :returns: Una cadena que representa la relación estudiante-curso.
        """
        return f"Estudiante: {self.__estudiante_id} Cursa: {self.__cursa_id}"

    def serializable(self):
        """
        Convierte la instancia de Estudiante_Cursa en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Estudiante_Cursa.
        """
        return {
            "id": self.__id,
            "estudiante_id": self.__estudiante_id,
            "cursa_id": self.__cursa_id,
        }

    @staticmethod
    def deserializable(data: dict):
        """
        Crea una instancia de Estudiante_Cursa a partir de un diccionario.

        :param data: Diccionario con los datos de la instancia de Estudiante_Cursa.
        :returns: Una instancia de Estudiante_Cursa.
        """
        estudiante_cursa = Estudiante_Cursa()
        estudiante_cursa._id = data["id"]
        estudiante_cursa._estudiante_id = data["estudiante_id"]
        estudiante_cursa._cursa_id = data["cursa_id"]
        return estudiante_cursa
