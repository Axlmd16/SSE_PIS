class Nota_Criterio:
    def __init__(self) -> None:
        self.__id = None
        self.__criterio_id = 0
        self.__unidad_estudiante_id = 0
        self.__nota_criterio = 0.0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _criterio_id(self):
        return self.__criterio_id

    @_criterio_id.setter
    def _criterio_id(self, value):
        self.__criterio_id = value

    @property
    def _unidad_estudiante_id(self):
        return self.__unidad_estudiante_id

    @_unidad_estudiante_id.setter
    def _unidad_estudiante_id(self, value):
        self.__unidad_estudiante_id = value

    @property
    def _nota_criterio(self):
        return self.__nota_criterio

    @_nota_criterio.setter
    def _nota_criterio(self, value):
        self.__nota_criterio = value

    def __str__(self) -> str:
        return f"Criterio: {self.__criterio_id} Unidad_Estudiante: {self.__unidad_estudiante_id} Nota: {self.__nota_criterio}"

    def serializable(self):
        return {
            "id": self.__id,
            "criterio_id": self.__criterio_id,
            "unidad_estudiante_id": self.__unidad_estudiante_id,
            "nota_criterio": self.__nota_criterio,
        }

    def deserializable(data: dict):
        nota_criterio = Nota_Criterio()
        nota_criterio._id = data["id"]
        nota_criterio._criterio_id = data["criterio_id"]
        nota_criterio._unidad_estudiante_id = data["unidad_estudiante_id"]
        nota_criterio._nota_criterio = data["nota_criterio"]
        return nota_criterio
