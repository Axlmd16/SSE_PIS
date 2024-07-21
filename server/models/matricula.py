class Matricula:
    """
    Representa la matrícula de un estudiante, incluyendo detalles como el código de matrícula,
    número de matrícula y la fecha de matriculación.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self) -> None:
        """
        Inicializa una nueva instancia de la clase Matricula.
        """
        self.__id = None
        self.__estudiante_cursa_id = 0
        self.__codigo_matricula = ""
        self.__nro_de_matricula = ""
        self.__fecha_matricula = None

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _estudiante_cursa_id(self):
        return self.__estudiante_cursa_id

    @_estudiante_cursa_id.setter
    def _estudiante_cursa_id(self, value):
        self.__estudiante_cursa_id = value

    @property
    def _codigo_matricula(self):
        return self.__codigo_matricula

    @_codigo_matricula.setter
    def _codigo_matricula(self, value):
        self.__codigo_matricula = value

    @property
    def _nro_de_matricula(self):
        return self.__nro_de_matricula

    @_nro_de_matricula.setter
    def _nro_de_matricula(self, value):
        self.__nro_de_matricula = value

    @property
    def _fecha_matricula(self):
        return self.__fecha_matricula

    @_fecha_matricula.setter
    def _fecha_matricula(self, value):
        self.__fecha_matricula = value

    def serializable(self) -> dict:
        """
        Convierte la instancia de Matricula en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Matricula.
        """
        return {
            "id": self.__id,
            "estudiante_cursa_id": self.__estudiante_cursa_id,
            "codigo_matricula": self.__codigo_matricula,
            "nro_de_matricula": self.__nro_de_matricula,
            "fecha_matricula": self.__fecha_matricula,
        }

    @staticmethod
    def deserializable(data: dict):
        """
        Crea una instancia de Matricula a partir de un diccionario.

        :param data: Diccionario con los datos de la instancia de Matricula.
        :returns: Una instancia de Matricula.
        """
        matricula = Matricula()
        matricula._id = data["id"]
        matricula._estudiante_cursa_id = data["estudiante_cursa_id"]
        matricula._codigo_matricula = data["codigo_matricula"]
        matricula._nro_de_matricula = data["nro_de_matricula"]
        matricula._fecha_matricula = data["fecha_matricula"]
        return matricula
