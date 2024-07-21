class Grupo:
    """
    Representa un grupo con un identificador, nombre y descripción.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self) -> None:
        """
        Inicializa una nueva instancia de la clase Grupo.
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

    def serializable(self):
        """
        Convierte la instancia de Grupo en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Grupo.
        """
        return {
            "id": self.__id,
            "nombre": self.__nombre,
            "descripcion": self.__descripcion,
        }

    def __str__(self):
        """
        Devuelve una representación en cadena del nombre del grupo.

        :returns: El nombre del grupo.
        """
        return self.__nombre

    @staticmethod
    def deserializable(data: dict):
        """
        Crea una instancia de Grupo a partir de un diccionario.

        :param data: Diccionario con los datos de la instancia de Grupo.
        :returns: Una instancia de Grupo.
        """
        grupo = Grupo()
        grupo._id = data["id"]
        grupo._nombre = data["nombre"]
        grupo._descripcion = data["descripcion"]
        return grupo
