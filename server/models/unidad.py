class Unidad:
    """
    Representa una unidad académica dentro de una asignatura, incluyendo información sobre su duración y fechas.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self):
        """
        Inicializa una nueva instancia de la clase Unidad con valores predeterminados.
        """
        self.__id = None
        self.__nro_unidad = 0
        self.__nombre = " "
        self.__nro_semanas = 0
        self.__fecha_inicio = None
        self.__fecha_fin = None
        self.__asignatura_id = 0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _nro_unidad(self):
        return self.__nro_unidad

    @_nro_unidad.setter
    def _nro_unidad(self, value):
        self.__nro_unidad = value

    @property
    def _nombre(self):
        return self.__nombre

    @_nombre.setter
    def _nombre(self, value):
        self.__nombre = value

    @property
    def _nro_semanas(self):
        return self.__nro_semanas

    @_nro_semanas.setter
    def _nro_semanas(self, value):
        self.__nro_semanas = value

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

    @property
    def _asignatura_id(self):
        return self.__asignatura_id

    @_asignatura_id.setter
    def _asignatura_id(self, value):
        self.__asignatura_id = value

    def __str__(self) -> str:
        """
        Devuelve una representación en cadena de la instancia de Unidad.

        :returns: Una cadena que representa la instancia de Unidad.
        """
        return f"{self.__nro_unidad} - {self.__nombre} - {self.__asignatura_id}"

    def serializable(self) -> dict:
        """
        Convierte la instancia de Unidad en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Unidad.
        """
        return {
            "id": self.__id,
            "nro_unidad": self.__nro_unidad,
            "nombre": self.__nombre,
            "nro_semanas": self.__nro_semanas,
            "fecha_inicio": self.__fecha_inicio,
            "fecha_fin": self.__fecha_fin,
            "asignatura_id": self.__asignatura_id,
        }

    @staticmethod
    def deserializable(data: dict) -> "Unidad":
        """
        Crea una instancia de Unidad a partir de un diccionario.

        :param data: Diccionario con los datos de la instancia de Unidad.
        :returns: Una instancia de Unidad.
        """
        unidad = Unidad()
        unidad._id = data["id"]
        unidad._nro_unidad = data["nro_unidad"]
        unidad._nombre = data["nombre"]
        unidad._nro_semanas = data["nro_semanas"]
        unidad._fecha_inicio = data["fecha_inicio"]
        unidad._fecha_fin = data["fecha_fin"]
        unidad._asignatura_id = data["asignatura_id"]
        return unidad
