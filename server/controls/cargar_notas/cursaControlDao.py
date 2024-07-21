from controls.dao.data_access_object import Data_Access_Object
from controls.academic.asignacion_control import AsignacionControl
from controls.tda.list.utilidades import binary_search
from models.cursa import Cursa
from asyncio import run
import time
import colorama


class CursaControl(Data_Access_Object):
    """
    Controlador para gestionar las asignaciones de cursas a asignaciones académicas.
    
    Hereda de Data_Access_Object para realizar operaciones de base de datos.
    """
    def __init__(self):
        """
        Inicializa una nueva instancia de CursaControl.
        
        Inicializa los controladores necesarios para gestionar asignaciones académicas.
        """
        super().__init__(Cursa)
        self.__cursa = None
        self.__asignacion_control = AsignacionControl()

    @property
    def _asignacion_control(self):
        """
        Obtiene el controlador de asignación actual.
        """
        return self.__asignacion_control

    @_asignacion_control.setter
    def _asignacion_control(self, value):
        """
        Establece el controlador de asignación.
        """
        self.__asignacion_control = value

    @property
    def _cursa(self):
        """
        Obtiene la cursa actual. Si no hay una cursa actual, se crea una nueva.
        """
        if self.__cursa is None:
            self.__cursa = Cursa()
        return self.__cursa

    @_cursa.setter
    def _cursa(self, value):
        """
        Establece la cursa actual.
        """
        self.__cursa = value

    def save(self):
        """
        Guarda la cursa actual en la base de datos y resetea la cursa actual a None.
        """
        self._save(self._cursa)
        self._cursa = None

    def update(self, id):
        """
        Actualiza la cursa con el ID proporcionado.
        
        Args:
            id (int): El ID de la cursa a actualizar.
        
        Returns:
            bool: True si la actualización fue exitosa, False en caso contrario.
        """
        try:
            self._merge(id, self._cursa)
            return True
        except Exception as e:
            print(f"Error actualizando la cursa: {e}")
            return False

    def list(self):
        """
        Lista todas las cursas.
        
        Returns:
            list: Lista de todas las cursas.
        """
        return self._list()

    def get_cursa_info_completa(self) -> list:
        """
        Obtiene la información completa de todas las cursas.
        
        Returns:
            list: Lista con la información completa de todas las cursas.
        """
        try:
            return self.lista_cursas_info_completa()
        except Exception as e:
            print(f"Error listando cursas: {e}")
            return []

    def lista_cursas_info_completa(self):
        """
        Crea una lista con la información de todas las cursas.
        
        Returns:
            list: Lista con la información completa de todas las cursas o vacía si no hay cursas.
        """
        inicio = time.time()
        try:
            cursa_info_completa = []

            # Obtener la informacion en una lista
            data_cursa = self._list()
            print(f"Data cursa: {data_cursa}")

            # Obtener la informacion de la asignacion(asincronia)
            data_asignacion = run(
                self._asignacion_control.get_asignacion_info_completa()
            )

            # Ordenar por id el cursa
            data_cursa_ordenada = data_cursa.quick_sort_with_attribute(
                data_cursa.to_array, "_id", 1
            )

            for cursa in data_cursa_ordenada:
                asignacion_id = cursa._asignacion_id
                asignacion_info = binary_search(data_asignacion, asignacion_id)

                # Crear el diccionario
                if asignacion_info:
                    cursa_info = {
                        "id": cursa._id,
                        "ciclo_id": cursa._ciclo_id,
                        "titulo": asignacion_info["titulo"],
                        "experiencia_laboral": asignacion_info["experiencia_laboral"],
                        "cubiculo": asignacion_info["cubiculo"],
                        "docente_nombre": asignacion_info["docente_nombre"],
                        "primer_nombre": asignacion_info["primer_nombre"],
                        "segundo_nombre": asignacion_info["segundo_nombre"],
                        "primer_apellido": asignacion_info["primer_apellido"],
                        "segundo_apellido": asignacion_info["segundo_apellido"],
                        "telefono": asignacion_info["telefono"],
                        "dni": asignacion_info["dni"],
                        "fecha_nacimiento": asignacion_info["fecha_nacimiento"],
                        "email": asignacion_info["email"],
                        "tipo_identificacion_id": asignacion_info[
                            "tipo_identificacion_id"
                        ],
                        "genero_id": asignacion_info["genero_id"],
                        "asignatura_id": asignacion_info["asignatura_id"],
                        "asignatura_nombre": asignacion_info["asignatura_nombre"],
                        "periodo_academico_id": asignacion_info["periodo_academico_id"],
                        "periodo_academico_fecha_inicio": asignacion_info[
                            "periodo_academico_fecha_inicio"
                        ],
                        "periodo_academico_fecha_fin": asignacion_info[
                            "periodo_academico_fecha_fin"
                        ],
                        "paralelo": cursa._paralelo,
                        "asignacion_id": asignacion_id,
                    }
                    # Agregar el diccionario al array
                    cursa_info_completa.append(cursa_info)
            fin = time.time()
            # print(colorama.Fore.YELLOW + f"Tiempo de ejecución en listado_cursas: {fin - inicio}" + colorama.Fore.RESET)
            return cursa_info_completa
        except Exception as e:
            print(f"Error listando asignaciones con detalles de docente: {e}")
            return []
