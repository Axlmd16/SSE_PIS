class Rol_Permiso:
    def __init__(self) -> None:
        self.__rol_id = 0
        self.__permiso_id = 0

    @property
    def _rol_id(self):
        return self.__rol_id

    @_rol_id.setter
    def _rol_id(self, value):
        self.__rol_id = value

    @property
    def _permiso_id(self):
        return self.__permiso_id

    @_permiso_id.setter
    def _permiso_id(self, value):
        self.__permiso_id = value

    def __str__(self) -> str:
        return f"Rol: {self.__rol_id} Permiso: {self.__permiso_id}"

    def serializable(self):
        return {
            "rol_id": self.__rol_id,
            "permiso_id": self.__permiso_id,
        }

    def deserializable(data: dict):
        rol_permiso = Rol_Permiso()
        rol_permiso._rol_id = data["rol_id"]
        rol_permiso._permiso_id = data["permiso_id"]
        return rol_permiso
