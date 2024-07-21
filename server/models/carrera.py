class Carrera:
    """
    Representa una carrera universitaria con sus atributos básicos.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self):
        """
        Inicializa una nueva instancia de la clase Carrera.
        """
        self.__id = None
        self.__nombre = " "
        self.__descripcion = " "
        self.__duracion = 0
        self.__titulo_otorgado = " "

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
    def _descripcion(self):
        return self.__descripcion

    @_descripcion.setter
    def _descripcion(self, value):
        self.__descripcion = value

    @property
    def _duracion(self):
        return self.__duracion

    @_duracion.setter
    def _duracion(self, value):
        self.__duracion = value

    @property
    def _titulo_otorgado(self):
        return self.__titulo_otorgado

    @_titulo_otorgado.setter
    def _titulo_otorgado(self, value):
        self.__titulo_otorgado = value

    def serializable(self):
        """
        Convierte la instancia de Carrera en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Carrera.
        """
        return {
            "id": self.__id,
            "nombre": self.__nombre,
            "descripcion": self.__descripcion,
            "duracion": self.__duracion,
            "titulo_otorgado": self.__titulo_otorgado,
        }

    def __str__(self):
        """
        Devuelve el nombre de la carrera.

        :returns: El nombre de la carrera.
        """
        return self.__nombre

    @staticmethod
    def deserializable(data: dict):
        """
        Crea una instancia de Carrera a partir de un diccionario.

        :param data: Diccionario con los datos de la carrera.
        :returns: Una instancia de Carrera.
        """
        carrera = Carrera()
        carrera._id = data["id"]
        carrera._nombre = data["nombre"]
        carrera._descripcion = data["descripcion"]
        carrera._duracion = data["duracion"]
        carrera._titulo_otorgado = data["titulo_otorgado"]
        return carrera
