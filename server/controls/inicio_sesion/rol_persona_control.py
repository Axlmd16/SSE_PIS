from controls.dao.data_access_object import Data_Access_Object
from models.rol_persona import Rol_Persona


class RolPersonaControl(Data_Access_Object):
    """
    Controlador para la gestión de roles asignados a personas, hereda de Data_Access_Object para utilizar sus métodos de acceso a datos.

    :param Data_Access_Object: Clase base para el acceso a datos.
    """

    def __init__(self):
        """
        Inicializa la clase RolPersonaControl y el rol_persona asociado a None.
        """
        super().__init__(Rol_Persona)
        self.__rol_persona = None

    @property
    def _rol_persona(self):
        """
        Propiedad _rol_persona que devuelve una instancia de Rol_Persona si __rol_persona es None.

        :returns: Instancia de la clase Rol_Persona.
        """
        if self.__rol_persona is None:
            self.__rol_persona = Rol_Persona()
        return self.__rol_persona

    @_rol_persona.setter
    def _rol_persona(self, value):
        """
        Establece el valor de __rol_persona.

        :param value: Valor a establecer en __rol_persona.
        """
        self.__rol_persona = value

    def save(self) -> bool:
        """
        Guarda la relación rol-persona en la base de datos.

        :returns: True si la relación rol-persona se guardó con éxito, False en caso de error.
        :raises Exception: Si ocurre un error al guardar la relación rol-persona.
        """
        try:
            self._save(self._rol_persona)
            return True
        except Exception as e:
            print(f"Error guardando rol en la persona: {e}")
            return False

    def list(self):
        """
        Lista todas las relaciones rol-persona en la base de datos.

        :returns: Lista de todas las relaciones rol-persona.
        """
        return self._list()

    def delete(self, primary_keys: dict) -> bool:
        """
        Elimina una relación rol-persona basada en las claves primarias proporcionadas.

        :param primary_keys: Diccionario de claves primarias para identificar la relación rol-persona a eliminar.
        :returns: True si la relación rol-persona se eliminó con éxito, False en caso de error.
        :raises Exception: Si ocurre un error al eliminar la relación rol-persona.
        """
        try:
            self._delete_compound_key(primary_keys)
            return True
        except Exception as e:
            print(f"Error eliminando el rol de la persona: {e}")
            return False

    def get_roles_by_person(self, id):
        """
        Obtiene los roles asignados a una persona basado en su ID.

        :param id: ID de la persona para buscar sus roles.
        :returns: Lista de roles asignados a la persona.
        """
        lista = self._list()
        roles = []
        for rol in lista:
            if rol._persona_id == id:
                roles.append(rol)
        return roles
