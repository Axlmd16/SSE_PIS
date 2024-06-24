class Genero:
    def __init__(self):
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
        return {"id": self.__id, "nombre": self.__nombre}

    def deserializable(data):
        genero = Genero()
        genero._id = data["id"]
        genero._nombre = data["nombre"]
        return genero
