class Malla:
    """
    Representa la malla curricular de una carrera, incluyendo su estado y fecha de registro.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self):
        """
        Inicializa una nueva instancia de la clase Malla.
        """
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
        """
        Convierte la instancia de Malla en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Malla.
        """
        return {
            "id": self.__id,
            "descripcion": self.__descripcion,
            "fecha_registro": self.__fecha_registro,
            "estado": self.__estado,
            "carrera_id": self.__carrera_id,
        }

    def __str__(self):
        """
        Devuelve una representación en cadena de la descripción de la malla.

        :returns: La descripción de la malla.
        """
        return self.__descripcion

    @staticmethod
    def deserializable(data: dict):
        """
        Crea una instancia de Malla a partir de un diccionario.

        :param data: Diccionario con los datos de la instancia de Malla.
        :returns: Una instancia de Malla.
        """
        malla = Malla()
        malla._id = data["id"]
        malla._descripcion = data["descripcion"]
        malla._fecha_registro = data["fecha_registro"]
        malla._estado = data["estado"]
        malla._carrera_id = data["carrera_id"]
        return malla
