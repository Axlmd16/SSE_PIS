class Rol_Persona:
    """
    Representa la relación entre un rol y una persona, indicando qué roles están asignados a una persona.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self) -> None:
        """
        Inicializa una nueva instancia de la clase Rol_Persona con valores predeterminados.
        """
        self.__rol_id = 0
        self.__persona_id = 0

    @property
    def _rol_id(self):
        return self.__rol_id

    @_rol_id.setter
    def _rol_id(self, value):
        self.__rol_id = value

    @property
    def _persona_id(self):
        return self.__persona_id

    @_persona_id.setter
    def _persona_id(self, value):
        self.__persona_id = value

    def __str__(self) -> str:
        """
        Devuelve una representación en cadena de la instancia de Rol_Persona.

        :returns: Una cadena que representa la instancia de Rol_Persona.
        """
        return f"Rol: {self.__rol_id} Persona: {self.__persona_id}"

    def serializable(self) -> dict:
        """
        Convierte la instancia de Rol_Persona en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Rol_Persona.
        """
        return {
            "rol_id": self.__rol_id,
            "persona_id": self.__persona_id,
        }

    @staticmethod
    def deserializable(data: dict) -> "Rol_Persona":
        """
        Crea una instancia de Rol_Persona a partir de un diccionario.

        :param data: Diccionario con los datos de la instancia de Rol_Persona.
        :returns: Una instancia de Rol_Persona.
        """
        rol_persona = Rol_Persona()
        rol_persona._rol_id = data["rol_id"]
        rol_persona._persona_id = data["persona_id"]
        return rol_persona
