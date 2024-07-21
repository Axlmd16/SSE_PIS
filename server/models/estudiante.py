from models.persona import Persona


class Estudiante(Persona):
    """
    Representa a un estudiante, heredando de la clase Persona.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self):
        """
        Inicializa una nueva instancia de la clase Estudiante.
        """
        super().__init__()
        self.__id = None
        self.__codigo_estudiante = " "

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

    def serializable(self):
        """
        Convierte la instancia de Estudiante en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Estudiante.
        """
        return {
            "id": self._id,
            "codigo_estudiante": self._codigo_estudiante,
        }

    @staticmethod
    def deserializable(data):
        """
        Crea una instancia de Estudiante a partir de un diccionario.

        :param data: Diccionario con los datos de la instancia de Estudiante.
        :returns: Una instancia de Estudiante.
        """
        estudiante = Estudiante()
        estudiante._id = data["id"]
        estudiante._codigo_estudiante = data["codigo_estudiante"]
        return estudiante
