class Ciclo:
    def __init__(self):
        self.__id = None
        self.__nro_ciclo = 0
        self.__malla_id = 0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _nro_ciclo(self):
        return self.__nro_ciclo

    @_nro_ciclo.setter
    def _nro_ciclo(self, value):
        self.__nro_ciclo = value

    @property
    def _malla_id(self):
        return self.__malla_id

    @_malla_id.setter
    def _malla_id(self, value):
        self.__malla_id = value

    def serializable(self):
        return {
            "id": self.__id,
            "nro_ciclo": self.__nro_ciclo,
            "malla_id": self.__malla_id,
        }

    def __str__(self):
        return str(self.__nro_ciclo)

    def deserializable(data: dict):
        ciclo = Ciclo()
        ciclo._id = data["id"]
        ciclo._nro_ciclo = data["nro_ciclo"]
        ciclo._malla_id = data["malla_id"]
        return ciclo
