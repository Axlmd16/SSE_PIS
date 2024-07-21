class Rol_Permiso:
    """
    Representa la relación entre un rol y un permiso, indicando qué permisos tiene asignado un rol.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self) -> None:
        """
        Inicializa una nueva instancia de la clase Rol_Permiso con valores predeterminados.
        """
        self.__rol_id = 0
        self.__permiso_id = 0

    @property
    def _rol_id(self):
        return self.__rol_id

    @_rol_id.setter
    def _rol_id(self, value):
        self.__rol_id = value

    @property
    def _permiso_id(self):
        return self.__permiso_id

    @_permiso_id.setter
    def _permiso_id(self, value):
        self.__permiso_id = value

    def __str__(self) -> str:
        """
        Devuelve una representación en cadena de la instancia de Rol_Permiso.

        :returns: Una cadena que representa la instancia de Rol_Permiso.
        """
        return f"Rol: {self.__rol_id} Permiso: {self.__permiso_id}"

    def serializable(self) -> dict:
        """
        Convierte la instancia de Rol_Permiso en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Rol_Permiso.
        """
        return {
            "rol_id": self.__rol_id,
            "permiso_id": self.__permiso_id,
        }

    @staticmethod
    def deserializable(data: dict) -> "Rol_Permiso":
        """
        Crea una instancia de Rol_Permiso a partir de un diccionario.

        :param data: Diccionario con los datos de la instancia de Rol_Permiso.
        :returns: Una instancia de Rol_Permiso.
        """
        rol_permiso = Rol_Permiso()
        rol_permiso._rol_id = data["rol_id"]
        rol_permiso._permiso_id = data["permiso_id"]
        return rol_permiso
