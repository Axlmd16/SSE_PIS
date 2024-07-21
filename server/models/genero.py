class Genero:
    """
    Representa un género, con un identificador y un nombre.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self):
        """
        Inicializa una nueva instancia de la clase Genero.
        """
        self.__id = None
        self.__nombre = ""

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

    def serializable(self):
        """
        Convierte la instancia de Genero en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Genero.
        """
        return {"id": self.__id, "nombre": self.__nombre}

    @staticmethod
    def deserializable(data):
        """
        Crea una instancia de Genero a partir de un diccionario.

        :param data: Diccionario con los datos de la instancia de Genero.
        :returns: Una instancia de Genero.
        """
        genero = Genero()
        genero._id = data["id"]
        genero._nombre = data["nombre"]
        return genero
