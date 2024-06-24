class Asignatura:
    def __init__(self):
        self.__id = None
        self.__nombre = " "
        self.__descripcion = " "
        self.__total_horas = 0
        self.__ciclo_id = 0
        self.__grupo_id = 0
        self.__malla_id = 0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _nombre(self):
        return self.__nombre

    @_nombre.setter
    def _nombre(self, value):
        self.__nombre = value

    @property
    def _descripcion(self):
        return self.__descripcion

    @_descripcion.setter
    def _descripcion(self, value):
        self.__descripcion = value

    @property
    def _total_horas(self):
        return self.__total_horas

    @_total_horas.setter
    def _total_horas(self, value):
        self.__total_horas = value

    @property
    def _ciclo_id(self):
        return self.__ciclo_id

    @_ciclo_id.setter
    def _ciclo_id(self, value):
        self.__ciclo_id = value

    @property
    def _grupo_id(self):
        return self.__grupo_id

    @_grupo_id.setter
    def _grupo_id(self, value):
        self.__grupo_id = value

    @property
    def _malla_id(self):
        return self.__malla_id

    @_malla_id.setter
    def _malla_id(self, value):
        self.__malla_id = value

    def serializable(self):
        return {
            "id": self.__id,
            "nombre": self.__nombre,
            "descripcion": self.__descripcion,
            "total_horas": self.__total_horas,
            "ciclo_id": self.__ciclo_id,
            "grupo_id": self.__grupo_id,
            "malla_id": self.__malla_id,
        }

    def __str__(self):
        return self.__nombre

    def deserializable(data: dict):
        asignatura = Asignatura()
        asignatura._id = data["id"]
        asignatura._nombre = data["nombre"]
        asignatura._descripcion = data["descripcion"]
        asignatura._total_horas = data["total_horas"]
        asignatura._ciclo_id = data["ciclo_id"]
        asignatura._grupo_id = data["grupo_id"]
        asignatura._malla_id = data["malla_id"]
        return asignatura
