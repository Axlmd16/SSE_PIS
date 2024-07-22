from controls.dao.data_access_object import Data_Access_Object
from models.periodo_academico import Periodo_Academico


class PeriodoAcademicoControl(Data_Access_Object):
    """
    Controlador para gestionar operaciones relacionadas con los periodos academicos.

    Hereda de Data_Access_Object para realizar operaciones de base de datos.
    """

    def __init__(self):
        """
        Inicializa una nueva instancia de PeriodoAcademicoControl.
        """
        super().__init__(Periodo_Academico)
        self.__periodo_academico = None

    @property
    def _periodo_acedemico(self):
        """
        Obtiene el periodo académico actual. Si no hay un periodo académico actual, se crea uno nuevo.

        Returns:
            Retorna la instancia actual de periodo_academico.
        """
        if self.__periodo_academico is None:
            self.__periodo_academico = Periodo_Academico()
        return self.__periodo_academico

    @_periodo_acedemico.setter
    def _periodo_acedemico(self, value):
        """
        Establece el peirodo academico actual.

        Args:
            value (periodo_academico): La instancia de periodo_academico a establecer.
        """
        self.__periodo_academico = value

    def save(self):
        """
        Guarda un nuevo periodo académico en la base de datos.

        Returns:
            bool: True si se guarda correctamente, False en caso contrario.
        """
        try:
            self._save(self._periodo_acedemico)
            return True
        except Exception as e:
            print(f"Error guardando el periodo academico: {e}")
            return False

    def update(self, id):
        """
        Actualiza el periodo academico con el ID proporcionado.

        Args:
            id (int): El ID del periodo académico a actualizar.

        Returns:
            bool: True si se actualiza correctamente, False en caso contrario.
        """
        try:
            # print(f"\n\n\nid: {id}")
            self._merge(id, self._periodo_acedemico)
            return True
        except Exception as e:
            print(f"Error actualizando el periodo academico: {e}")
            return False

    def list(self):
        """
        Lista todas los periodos academicos.

        Returns:
            list: Lista de todas los periodos academicos.
        """
        return self._list()
