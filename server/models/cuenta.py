class Cuenta:
    """
    Representa una cuenta de usuario con sus atributos básicos.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self):
        """
        Inicializa una nueva instancia de la clase Cuenta.
        """
        self.__id = None
        self.__usuario = " "
        self.__clave = " "
        self.__estado = 0
        self.__persona_id = 0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _usuario(self):
        return self.__usuario

    @_usuario.setter
    def _usuario(self, value):
        self.__usuario = value

    @property
    def _clave(self):
        return self.__clave

    @_clave.setter
    def _clave(self, value):
        self.__clave = value

    @property
    def _estado(self):
        return self.__estado

    @_estado.setter
    def _estado(self, value):
        self.__estado = value

    @property
    def _persona_id(self):
        return self.__persona_id

    @_persona_id.setter
    def _persona_id(self, value):
        self.__persona_id = value

    def __str__(self) -> str:
        """
        Devuelve el nombre de usuario de la cuenta.

        :returns: El nombre de usuario de la cuenta.
        """
        return self.__usuario

    def serializable(self):
        """
        Convierte la instancia de Cuenta en un diccionario +serializable.

        :returns: Un diccionario que representa la instancia de Cuenta.
        """
        return {
            "id": self.__id,
            "usuario": self.__usuario,
            "clave": self.__clave,
            "estado": self.__estado,
            "persona_id": self.__persona_id,
        }

    @staticmethod
    def deserializable(data: dict):
        """
        Crea una instancia de Cuenta a partir de un diccionario.

        :param data: Diccionario con los datos de la cuenta.
        :returns: Una instancia de Cuenta.
        """
        cuenta = Cuenta()
        cuenta._id = data["id"]
        cuenta._usuario = data["usuario"]
        cuenta._clave = data["clave"]
        cuenta._estado = data["estado"]
        cuenta._persona_id = data["persona_id"]
        return cuenta
