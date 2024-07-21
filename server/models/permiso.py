class Permiso:
    """
    Representa un permiso con identificador, nombre y descripción.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self) -> None:
        """
        Inicializa una nueva instancia de la clase Permiso.
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

    def __str__(self) -> str:
        """
        Devuelve una representación en cadena del nombre del permiso.

        :returns: El nombre del permiso.
        """
        return self.__nombre

    def serializable(self):
        """
        Convierte la instancia de Permiso en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Permiso.
        """
        return {
            "id": self.__id,
            "nombre": self.__nombre,
            "descripcion": self.__descripcion,
        }

    @staticmethod
    def deserializable(data: dict):
        """
        Crea una instancia de Permiso a partir de un diccionario.

        :param data: Diccionario con los datos de la instancia de Permiso.
        :returns: Una instancia de Permiso.
        """
        permiso = Permiso()
        permiso._id = data["id"]
        permiso._nombre = data["nombre"]
        permiso._descripcion = data["descripcion"]
        return permiso
