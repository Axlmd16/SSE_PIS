from models.persona import Persona


class Estudiante(Persona):
    def __init__(self):
        self.__id = None
        self.__codigo_estudiante = " "
        self.__nro_matricula = " "

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _codigo_estudiante(self):
        return self.__codigo_estudiante

    @_codigo_estudiante.setter
    def _codigo_estudiante(self, value):
        self.__codigo_estudiante = value

    @property
    def _nro_matricula(self):
        return self.__nro_matricula

    @_nro_matricula.setter
    def _nro_matricula(self, value):
        self.__nro_matricula = value

    def serializable(self):
        return {
            "id": self._id,
            "codigo_estudiante": self._codigo_estudiante,
            "nro_matricula": self._nro_matricula,
        }

    @staticmethod
    def deserializable(data):
        estudiante = Estudiante()
        estudiante._id = data["id"]
        estudiante._codigo_estudiante = data["codigo_estudiante"]
        estudiante._nro_matricula = data["nro_matricula"],
        return estudiante
