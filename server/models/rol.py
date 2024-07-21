class Rol:
    """
    Representa un rol dentro de un sistema, incluyendo su identificador, nombre y descripción.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self):
        """
        Inicializa una nueva instancia de la clase Rol con valores predeterminados.
        """
        self.__id = None
        self.__nombre = " "
        self.__descripcion = " "

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

    def serializable(self) -> dict:
        """
        Convierte la instancia de Rol en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Rol.
        """
        return {
            "id": self.__id,
            "nombre": self.__nombre,
            "descripcion": self.__descripcion,
        }

    def __str__(self) -> str:
        """
        Devuelve una representación en cadena del nombre del rol.

        :returns: El nombre del rol.
        """
        return self.__nombre

    @staticmethod
    def deserializable(data: dict) -> "Rol":
        """
        Crea una instancia de Rol a partir de un diccionario.

        :param data: Diccionario con los datos de la instancia de Rol.
        :returns: Una instancia de Rol.
        """
        rol = Rol()
        rol._id = data["id"]
        rol._nombre = data["nombre"]
        rol._descripcion = data["descripcion"]
        return rol
