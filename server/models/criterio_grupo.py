class Criterio_Grupo:
    def __init__(self) -> None:
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
        return f"Criterio: {self.__criterio_id} Grupo: {self.__grupo_id}"

    def serializable(self):
        return {
            "criterio_id": self.__criterio_id,
            "grupo_id": self.__grupo_id,
        }

    def deserializable(data: dict):
        criterio_grupo = Criterio_Grupo()
        criterio_grupo._criterio_id = data["criterio_id"]
        criterio_grupo._grupo_id = data["grupo_id"]
        return criterio_grupo
