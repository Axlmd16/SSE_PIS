from datetime import date


class Persona:
    """
    Representa a una persona con sus datos personales básicos.

    :param None: No recibe parámetros al inicializarse.
    """

    def __init__(self):
        """
        Inicializa una nueva instancia de la clase Persona con valores predeterminados.
        """
        self.__id = None
        self.__primer_nombre = " "
        self.__segundo_nombre = " "
        self.__primer_apellido = " "
        self.__segundo_apellido = " "
        self.__telefono = " "
        self.__dni = " "
        self.__fecha_nacimiento = None
        self.__email = " "
        self.__tipo_identificacion_id = 0
        self.__genero_id = 0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _primer_nombre(self):
        return self.__primer_nombre

    @_primer_nombre.setter
    def _primer_nombre(self, value):
        self.__primer_nombre = value

    @property
    def _segundo_nombre(self):
        return self.__segundo_nombre

    @_segundo_nombre.setter
    def _segundo_nombre(self, value):
        self.__segundo_nombre = value

    @property
    def _primer_apellido(self):
        return self.__primer_apellido

    @_primer_apellido.setter
    def _primer_apellido(self, value):
        self.__primer_apellido = value

    @property
    def _segundo_apellido(self):
        return self.__segundo_apellido

    @_segundo_apellido.setter
    def _segundo_apellido(self, value):
        self.__segundo_apellido = value

    @property
    def _telefono(self):
        return self.__telefono

    @_telefono.setter
    def _telefono(self, value):
        self.__telefono = value

    @property
    def _dni(self):
        return self.__dni

    @_dni.setter
    def _dni(self, value):
        self.__dni = value

    @property
    def _fecha_nacimiento(self):
        return self.__fecha_nacimiento

    @_fecha_nacimiento.setter
    def _fecha_nacimiento(self, value):
        self.__fecha_nacimiento = value

    @property
    def _email(self):
        return self.__email

    @_email.setter
    def _email(self, value):
        self.__email = value

    @property
    def _tipo_identificacion_id(self):
        return self.__tipo_identificacion_id

    @_tipo_identificacion_id.setter
    def _tipo_identificacion_id(self, value):
        self.__tipo_identificacion_id = value

    @property
    def _genero_id(self):
        return self.__genero_id

    @_genero_id.setter
    def _genero_id(self, value):
        self.__genero_id = value

    def __str__(self) -> str:
        """
        Devuelve una representación en cadena de la instancia de Persona.

        :returns: Una cadena que representa la instancia de Persona.
        """
        return f"{self._id} --> {self._primer_nombre} {self._primer_apellido}\n"

    def serializable(self) -> dict:
        """
        Convierte la instancia de Persona en un diccionario serializable.

        :returns: Un diccionario que representa la instancia de Persona.
        """
        return {
            "id": self.__id,
            "primer_nombre": self.__primer_nombre,
            "segundo_nombre": self.__segundo_nombre,
            "primer_apellido": self.__primer_apellido,
            "segundo_apellido": self.__segundo_apellido,
            "telefono": self.__telefono,
            "dni": self.__dni,
            "fecha_nacimiento": self.__fecha_nacimiento,
            "email": self.__email,
            "tipo_identificacion_id": self.__tipo_identificacion_id,
            "genero_id": self.__genero_id,
        }

    @staticmethod
    def deserializable(data: dict):
        """
        Crea una instancia de Persona a partir de un diccionario.

        :param data: Diccionario con los datos de la instancia de Persona.
        :returns: Una instancia de Persona.
        """
        persona = Persona()
        persona._id = data["id"]
        persona._primer_nombre = data["primer_nombre"]
        persona._segundo_nombre = data["segundo_nombre"]
        persona._primer_apellido = data["primer_apellido"]
        persona._segundo_apellido = data["segundo_apellido"]
        persona._telefono = data["telefono"]
        persona._dni = data["dni"]
        persona._email = data["email"]
        persona._fecha_de_nacimiento = data["fecha_nacimiento"]
        persona._tipo_identificacion_id = data["tipo_identificacion_id"]
        persona._genero_id = data["genero_id"]
        return persona
