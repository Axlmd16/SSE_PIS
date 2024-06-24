class Criterio:
    def __init__(self) -> None:
        self.__id = None
        self.__nombre = " "
        self.__porcentaje = " "

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
    def _porcentaje(self):
        return self.__porcentaje

    @_porcentaje.setter
    def _porcentaje(self, value):
        self.__porcentaje = value

    def __str__(self) -> str:
        return self.__nombre

    def serializable(self):
        return {
            "id": self.__id,
            "nombre": self.__nombre,
            "porcentaje": self.__porcentaje,
        }

    def deserializable(data: dict):
        criterio = Criterio()
        criterio._id = data["id"]
        criterio._nombre = data["nombre"]
        criterio._porcentaje = data["porcentaje"]
        return criterio
