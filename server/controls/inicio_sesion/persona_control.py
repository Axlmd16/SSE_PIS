from controls.dao.data_access_object import Data_Access_Object
from models.persona import Persona


class PersonaControl(Data_Access_Object):
    """
    Controlador para la gestión de personas, hereda de Data_Access_Object para utilizar sus métodos de acceso a datos.

    :param Data_Access_Object: Clase base para el acceso a datos.
    """

    def __init__(self):
        """
        Inicializa la clase PersonaControl y la persona asociada a None.
        """
        super().__init__(Persona)
        self.__persona = None

    @property
    def _persona(self):
        """
        Propiedad _persona que devuelve una instancia de Persona si __persona es None.

        :returns: Instancia de la clase Persona.
        """
        if self.__persona is None:
            self.__persona = Persona()
        return self.__persona

    @_persona.setter
    def _persona(self, value):
        """
        Establece el valor de __persona.

        :param value: Valor a establecer en __persona.
        """
        self.__persona = value

    def save(self) -> bool:
        """
        Guarda la persona en la base de datos y devuelve el ID asignado.

        :returns: ID de la persona guardada o False en caso de error.
        :raises Exception: Si ocurre un error al guardar la persona.
        """
        try:
            id = self._save_id(self._persona)
            return id
        except Exception as e:
            print(f"Error guardando la persona: {e}")
            return False

    def update(self, id) -> bool:
        """
        Actualiza la persona en la base de datos basado en su ID.

        :param id: ID de la persona a actualizar.
        :returns: True si la persona se actualizó con éxito, False en caso de error.
        :raises Exception: Si ocurre un error al actualizar la persona.
        """
        try:
            self._merge(id, self._persona)
            return True
        except Exception as e:
            print(f"Error actualizando la persona: {e}")
            return False

    def list(self):
        """
        Lista todas las personas en la base de datos.

        :returns: Lista de todas las personas.
        """
        return self._list()
