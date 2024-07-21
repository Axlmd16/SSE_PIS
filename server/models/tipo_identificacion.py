class Tipo_Identificacion:
    """
    Representa un tipo de identificación, incluyendo un identificador único y un nombre.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self) -> None:
        """
        Inicializa una nueva instancia de la clase Tipo_Identificacion con valores predeterminados.
        """
        self.__id = None
        self.__nombre = " "

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

    def __str__(self) -> str:
        """
        Devuelve una representación en cadena del nombre del tipo de identificación.

        :returns: El nombre del tipo de identificación.
        """
        return self.__nombre

    def serializable(self) -> dict:
        """
        Convierte la instancia de Tipo_Identificacion en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Tipo_Identificacion.
        """
        return {
            "id": self.__id,
            "nombre": self.__nombre,
        }

    @staticmethod
    def deserializable(data: dict) -> "Tipo_Identificacion":
        """
        Crea una instancia de Tipo_Identificacion a partir de un diccionario.

        :param data: Diccionario con los datos de la instancia de Tipo_Identificacion.
        :returns: Una instancia de Tipo_Identificacion con el nombre en mayúsculas.
        """
        tipo_identificacion = Tipo_Identificacion()
        tipo_identificacion._id = data["id"]
        tipo_identificacion._nombre = data["nombre"].upper()
        return tipo_identificacion
