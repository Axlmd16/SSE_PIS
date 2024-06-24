class Malla:
    def __init__(self):
        self.__id = None
        self.__descripcion = " "
        self.__fecha_registro = None
        self.__estado = 0
        self.__carrera_id = 0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _descripcion(self):
        return self.__descripcion

    @_descripcion.setter
    def _descripcion(self, value):
        self.__descripcion = value

    @property
    def _fecha_registro(self):
        return self.__fecha_registro

    @_fecha_registro.setter
    def _fecha_registro(self, value):
        self.__fecha_registro = value

    @property
    def _estado(self):
        return self.__estado

    @_estado.setter
    def _estado(self, value):
        self.__estado = value

    @property
    def _carrera_id(self):
        return self.__carrera_id

    @_carrera_id.setter
    def _carrera_id(self, value):
        self.__carrera_id = value

    def serializable(self):
        return {
            "id": self.__id,
            "descripcion": self.__descripcion,
            "fecha_registro": self.__fecha_registro,
            "estado": self.__estado,
            "carrera_id": self.__carrera_id,
        }

    def __str__(self):
        return self.__descripcion

    def deserializable(data: dict):
        malla = Malla()
        malla._id = data["id"]
        malla._descripcion = data["descripcion"]
        malla._fecha_registro = data["fecha_registro"]
        malla._estado = data["estado"]
        malla._carrera_id = data["carrera_id"]
        return malla
