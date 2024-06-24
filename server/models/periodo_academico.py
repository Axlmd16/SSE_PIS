class Periodo_Academico:
    def __init__(self):
        self.__id = None
        self.__fecha_inicio = None
        self.__fecha_fin = None

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _fecha_inicio(self):
        return self.__fecha_inicio

    @_fecha_inicio.setter
    def _fecha_inicio(self, value):
        self.__fecha_inicio = value

    @property
    def _fecha_fin(self):
        return self.__fecha_fin

    @_fecha_fin.setter
    def _fecha_fin(self, value):
        self.__fecha_fin = value

    def serializable(self):
        return {
            "id": self.__id,
            "fecha_inicio": self.__fecha_inicio,
            "fecha_fin": self.__fecha_fin,
        }

    def __str__(self) -> str:
        return (
            f"Periodo_Academico: {self.__id}, {self.__fecha_inicio}, {self.__fecha_fin}"
        )

    def deserializable(data: dict):
        periodo_academico = Periodo_Academico()
        periodo_academico._id = data["id"]
        periodo_academico._fecha_inicio = data["fecha_inicio"]
        periodo_academico._fecha_fin = data["fecha_fin"]
        return periodo_academico
