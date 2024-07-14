class Ciclo:
    def __init__(self):
        self.__id = None
        self.__ciclo = ""

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _ciclo(self):
        return self.__ciclo

    @_ciclo.setter
    def _ciclo(self, value):
        self.__ciclo = value

    def serializable(self):
        return {
            "id": self.__id,
            "nro_ciclo": self.__nro_ciclo,
        }

    def __str__(self):
        return str(self.__nro_ciclo)

    def deserializable(data: dict):
        ciclo = Ciclo()
        ciclo._id = data["id"]
        ciclo._nro_ciclo = data["nro_ciclo"]
        return ciclo
