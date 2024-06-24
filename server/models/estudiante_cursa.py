class Estudiante_Cursa:
    def __init__(self) -> None:
        self.__id = None
        self.__estudiante_id = 0
        self.__cursa_id = 0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _estudiante_id(self):
        return self.__estudiante_id

    @_estudiante_id.setter
    def _estudiante_id(self, value):
        self.__estudiante_id = value

    @property
    def _cursa_id(self):
        return self.__cursa_id

    @_cursa_id.setter
    def _cursa_id(self, value):
        self.__cursa_id = value

    def __str__(self) -> str:
        return f"Estudiante: {self.__estudiante_id} Cursa: {self.__cursa_id}"

    def serializable(self):
        return {
            "id": self.__id,
            "estudiante_id": self.__estudiante_id,
            "cursa_id": self.__cursa_id,
        }

    def deserializable(data: dict):
        estudiante_cursa = Estudiante_Cursa()
        estudiante_cursa._id = data["id"]
        estudiante_cursa._estudiante_id = data["estudiante_id"]
        estudiante_cursa._cursa_id = data["cursa_id"]
        return estudiante_cursa
