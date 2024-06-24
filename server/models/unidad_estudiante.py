class Unidad_Estudiante:
    def __init__(self) -> None:
        self.__id = None
        self.__unidad_id = 0
        self.__estudiante_cursa_id = 0
        self.__nota_unidad = 0.0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _unidad_id(self):
        return self.__unidad_id

    @_unidad_id.setter
    def _unidad_id(self, value):
        self.__unidad_id = value

    @property
    def _estudiante_cursa_id(self):
        return self.__estudiante_cursa_id

    @_estudiante_cursa_id.setter
    def _estudiante_cursa_id(self, value):
        self.__estudiante_cursa_id = value

    @property
    def _nota_unidad(self):
        return self.__nota_unidad

    @_nota_unidad.setter
    def _nota_unidad(self, value):
        self.__nota_unidad = value

    def __str__(self) -> str:
        return f"Unidad: {self.__unidad_id} Estudiante_Cursa: {self.__estudiante_cursa_id} Nota: {self.__nota_unidad}"

    def serializable(self):
        return {
            "id": self.__id,
            "unidad_id": self.__unidad_id,
            "estudiante_cursa_id": self.__estudiante_cursa_id,
            "nota_unidad": self.__nota_unidad,
        }

    def deserializable(data: dict):
        unidad_estudiante = Unidad_Estudiante()
        unidad_estudiante._id = data["id"]
        unidad_estudiante._unidad_id = data["unidad_id"]
        unidad_estudiante._estudiante_cursa_id = data["estudiante_cursa_id"]
        unidad_estudiante._nota_unidad = data["nota_unidad"]
        return unidad_estudiante
