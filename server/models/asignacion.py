class Asignacion:
    def __init__(self) -> None:
        self.__id = None
        self.__docente_id = 0
        self.__asignatura_id = 0
        self.__periodo_academico_id = 0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _docente_id(self):
        return self.__docente_id

    @_docente_id.setter
    def _docente_id(self, value):
        self.__docente_id = value

    @property
    def _asignatura_id(self):
        return self.__asignatura_id

    @_asignatura_id.setter
    def _asignatura_id(self, value):
        self.__asignatura_id = value

    @property
    def _periodo_academico_id(self):
        return self.__periodo_academico_id

    @_periodo_academico_id.setter
    def _periodo_academico_id(self, value):
        self.__periodo_academico_id = value

    def __str__(self) -> str:
        return f"Docente: {self.__docente_id} Asignatura: {self.__asignatura_id} Periodo: {self.__periodo_academico_id}"

    def serializable(self):
        return {
            "id": self.__id,
            "docente_id": self.__docente_id,
            "asignatura_id": self.__asignatura_id,
            "periodo_academico_id": self.__periodo_academico_id,
        }

    def deserializable(data: dict):
        asignacion = Asignacion()
        asignacion._id = data["id"]
        asignacion._docente_id = data["docente_id"]
        asignacion._asignatura_id = data["asignatura_id"]
        asignacion._periodo_academico_id = data["periodo_academico_id"]
        return asignacion
