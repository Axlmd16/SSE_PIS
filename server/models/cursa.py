class Cursa:
    """
    Representa la asignación de un estudiante a un paralelo específico dentro de un ciclo académico.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self):
        """
        Inicializa una nueva instancia de la clase Cursa.
        """
        self.__id = None
        self.__paralelo = " "
        self.__asignacion_id = 0
        self.__ciclo_id = 0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _paralelo(self):
        return self.__paralelo

    @_paralelo.setter
    def _paralelo(self, value):
        self.__paralelo = value

    @property
    def _asignacion_id(self):
        return self.__asignacion_id

    @_asignacion_id.setter
    def _asignacion_id(self, value):
        self.__asignacion_id = value

    @property
    def _ciclo_id(self):
        return self.__ciclo_id

    @_ciclo_id.setter
    def _ciclo_id(self, value):
        self.__ciclo_id = value

    def __str__(self) -> str:
        """
        Devuelve el identificador de la instancia Cursa como cadena.

        :returns: El identificador de la instancia Cursa.
        """
        return str(self.__id)

    def serializable(self):
        """
        Convierte la instancia de Cursa en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Cursa.
        """
        return {
            "id": self.__id,
            "paralelo": self.__paralelo,
            "asignacion_id": self.__asignacion_id,
            "ciclo_id": self.__ciclo_id,
        }

    @staticmethod
    def deserializable(data: dict):
        """
        Crea una instancia de Cursa a partir de un diccionario.

        :param data: Diccionario con los datos de la instancia Cursa.
        :returns: Una instancia de Cursa.
        """
        cursa = Cursa()
        cursa._id = data["id"]
        cursa._paralelo = data["paralelo"]
        cursa._asignacion_id = data["asignacion_id"]
        cursa._ciclo_id = data["ciclo_id"]
        return cursa
