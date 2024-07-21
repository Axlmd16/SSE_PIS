class Unidad_Estudiante:
    """
    Representa la relación entre una unidad académica y un estudiante, incluyendo la nota obtenida.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self) -> None:
        """
        Inicializa una nueva instancia de la clase Unidad_Estudiante con valores predeterminados.
        """
        self.__id = None
        self.__unidad_id = 0
        self.__estudiante_cursa_id = 0
        self.__nota_unidad = 0.0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _unidad_id(self):
        return self.__unidad_id

    @_unidad_id.setter
    def _unidad_id(self, value):
        self.__unidad_id = value

    @property
    def _estudiante_cursa_id(self):
        return self.__estudiante_cursa_id

    @_estudiante_cursa_id.setter
    def _estudiante_cursa_id(self, value):
        self.__estudiante_cursa_id = value

    @property
    def _nota_unidad(self):
        return self.__nota_unidad

    @_nota_unidad.setter
    def _nota_unidad(self, value):
        self.__nota_unidad = value

    def __str__(self) -> str:
        """
        Devuelve una representación en cadena de la instancia de Unidad_Estudiante.

        :returns: Una cadena que representa la instancia de Unidad_Estudiante.
        """
        return f"Unidad: {self.__unidad_id} Estudiante_Cursa: {self.__estudiante_cursa_id} Nota: {self.__nota_unidad}"

    def serializable(self) -> dict:
        """
        Convierte la instancia de Unidad_Estudiante en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Unidad_Estudiante.
        """
        return {
            "id": self.__id,
            "unidad_id": self.__unidad_id,
            "estudiante_cursa_id": self.__estudiante_cursa_id,
            "nota_unidad": self.__nota_unidad,
        }

    @staticmethod
    def deserializable(data: dict) -> "Unidad_Estudiante":
        """
        Crea una instancia de Unidad_Estudiante a partir de un diccionario.

        :param data: Diccionario con los datos de la instancia de Unidad_Estudiante.
        :returns: Una instancia de Unidad_Estudiante.
        """
        unidad_estudiante = Unidad_Estudiante()
        unidad_estudiante._id = data["id"]
        unidad_estudiante._unidad_id = data["unidad_id"]
        unidad_estudiante._estudiante_cursa_id = data["estudiante_cursa_id"]
        unidad_estudiante._nota_unidad = data["nota_unidad"]
        return unidad_estudiante
