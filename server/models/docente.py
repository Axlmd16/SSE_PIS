from models.persona import Persona


class Docente(Persona):
    """
    Representa a un docente, heredando de la clase Persona.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self):
        """
        Inicializa una nueva instancia de la clase Docente.
        """
        super().__init__()
        self.__id = None
        self.__titulo = " "
        self.__experiencia_laboral = 0
        self.__cubiculo = " "

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _titulo(self):
        return self.__titulo

    @_titulo.setter
    def _titulo(self, value):
        self.__titulo = value

    @property
    def _experiencia_laboral(self):
        return self.__experiencia_laboral

    @_experiencia_laboral.setter
    def _experiencia_laboral(self, value):
        self.__experiencia_laboral = value

    @property
    def _cubiculo(self):
        return self.__cubiculo

    @_cubiculo.setter
    def _cubiculo(self, value):
        self.__cubiculo = value

    def serializable(self):
        """
        Convierte la instancia de Docente en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Docente.
        """
        return {
            "id": self._id,
            "titulo": self._titulo,
            "experiencia_laboral": self._experiencia_laboral,
            "cubiculo": self._cubiculo,
        }

    @staticmethod
    def deserializable(data):
        """
        Crea una instancia de Docente a partir de un diccionario.

        :param data: Diccionario con los datos de la instancia de Docente.
        :returns: Una instancia de Docente.
        """
        docente = Docente()
        docente._id = data["id"]
        docente._titulo = data["titulo"]
        docente._experiencia_laboral = (data["experiencia_laboral"],)
        docente._cubiculo = data["cubiculo"]
        return docente
