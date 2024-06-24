class Tipo_Identificacion:
    def __init__(self) -> None:
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

    def __str__(self):
        return self.__nombre

    def serializable(self) -> dict:
        return {"id": self.__id, "nombre": self.__nombre}

    def deserializable(data: dict):
        tipo_identificacion = Tipo_Identificacion()
        tipo_identificacion._id = data["id"]
        tipo_identificacion._nombre = data["nombre"].upper()
        return tipo_identificacion
