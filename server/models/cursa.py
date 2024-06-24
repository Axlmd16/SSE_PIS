class Cursa:
    def __init__(self):
        self.__id = None
        self.__paralelo = " "
        self.__asignacion_id = 0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _paralelo(self):
        return self.__paralelo

    @_paralelo.setter
    def _paralelo(self, value):
        self.__paralelo = value

    @property
    def _asignacion_id(self):
        return self.__asignacion_id

    @_asignacion_id.setter
    def _asignacion_id(self, value):
        self.__asignacion_id = value

    def serializable(self):
        return {
            "id": self.__id,
            "paralelo": self.__paralelo,
            "asignacion_id": self.__asignacion_id,
        }

    def __str__(self):
        return str(self.__id)

    def deserializable(data: dict):
        cursa = Cursa()
        cursa._id = data["id"]
        cursa._paralelo = data["paralelo"]
        cursa._asignacion_id = data["asignacion_id"]
        return cursa
