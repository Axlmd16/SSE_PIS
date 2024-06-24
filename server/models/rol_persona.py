class Rol_Persona:
    def __init__(self) -> None:
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
        return f"Rol: {self.__rol_id} Persona: {self.__persona_id}"

    def serializable(self):
        return {"rol_id": self.__rol_id, "persona_id": self.__persona_id}

    def deserializable(data):
        rol_persona = Rol_Persona()
        rol_persona._rol_id = data["rol_id"]
        rol_persona._persona_id = data["persona_id"]
        return rol_persona
