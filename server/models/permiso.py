class Permiso:
    def __init__(self) -> None:
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
        return self.__nombre

    def serializable(self):
        return {
            "id": self.__id,
            "nombre": self.__nombre,
            "descripcion": self.__descripcion,
        }

    def deserializable(data: dict):
        permiso = Permiso()
        permiso._id = data["id"]
        permiso._nombre = data["nombre"]
        permiso._descripcion = data["descripcion"]
        return permiso
