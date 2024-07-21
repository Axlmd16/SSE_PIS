class Criterio_Grupo:
    """
    Representa la relación entre un criterio y un grupo.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self) -> None:
        """
        Inicializa una nueva instancia de la clase Criterio_Grupo.
        """
        self.__criterio_id = 0
        self.__grupo_id = 0

    @property
    def _criterio_id(self):
        return self.__criterio_id

    @_criterio_id.setter
    def _criterio_id(self, value):
        self.__criterio_id = value

    @property
    def _grupo_id(self):
        return self.__grupo_id

    @_grupo_id.setter
    def _grupo_id(self, value):
        self.__grupo_id = value

    def __str__(self) -> str:
        """
        Devuelve una representación en cadena de la instancia de Criterio_Grupo.

        :returns: Una cadena que representa la relación entre criterio y grupo.
        """
        return f"Criterio: {self.__criterio_id} Grupo: {self.__grupo_id}"

    def serializable(self):
        """
        Convierte la instancia de Criterio_Grupo en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Criterio_Grupo.
        """
        return {
            "criterio_id": self.__criterio_id,
            "grupo_id": self.__grupo_id,
        }

    @staticmethod
    def deserializable(data: dict):
        """
        Crea una instancia de Criterio_Grupo a partir de un diccionario.

        :param data: Diccionario con los datos de la relación entre criterio y grupo.
        :returns: Una instancia de Criterio_Grupo.
        """
        criterio_grupo = Criterio_Grupo()
        criterio_grupo._criterio_id = data["criterio_id"]
        criterio_grupo._grupo_id = data["grupo_id"]
        return criterio_grupo
