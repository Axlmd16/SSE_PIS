from controls.academic.docente_control import DocenteControl
from controls.academic.periodo_academico_control import PeriodoAcademicoControl
from controls.admin.asignatura_control import AsignaturaControl
from controls.tda.list.utilidades import binary_search
from controls.dao.data_access_object import Data_Access_Object
from models.asignacion import Asignacion
import colorama
import time
import asyncio

class AsignacionControl(Data_Access_Object):
    def __init__(self):
        super().__init__(Asignacion)
        self.__asignacion = None
        self.__docente_control = DocenteControl()
        self.__periodo_academico_control = PeriodoAcademicoControl()
        self.__asignatura_control = AsignaturaControl()

    @property
    def _asignacion(self):
        if self.__asignacion is None:
            self.__asignacion = Asignacion()
        return self.__asignacion

    @_asignacion.setter
    def _asignacion(self, value):
        self.__asignacion = value

    def save(self):
        self._save(self._asignacion)
        self._asignacion = None

    def update(self, id):
        try:
            self._merge(id, self._asignacion)
            return True
        except Exception as e:
            print(f"Error actualizando la asignacion: {e}")
            return False

    def list(self):
        return self._list()
    
    async def get_asignacion_info_completa(self) -> list:
        try:
            return await self.lista_asignacion_info_completa()
        except Exception as e:
            print(f"Error listando estudiantes con detalles de persona: {e}")
            return []
    
    async def lista_asignacion_info_completa(self):
        try:
            inicio = time.time()
            asignacion_info_completa = []

            #* Cargar los datos en listas
            # tasks = [
            #     asyncio.to_thread(self._list()),
            #     asyncio.to_thread(self.__docente_control.list_with_person_details()),
            #     asyncio.to_thread(self.__periodo_academico_control._list()),
            #     asyncio.to_thread(self.__asignatura_control._list())
            # ]
            # data_asignacion_docente, data_docentes, data_periodos_academicos, data_asignaturas = await asyncio.gather(*tasks)

            data_asignacion_docente = self._list()
            data_docentes = self.__docente_control.list_with_person_details()
            data_periodos_academicos = self.__periodo_academico_control._list() 
            data_asignaturas = self.__asignatura_control._list()

            #* Ordenamientos de datos concurrentes
            tasks = [
                asyncio.to_thread(data_asignacion_docente.quick_sort_with_attribute, data_asignacion_docente.to_array, "_id", 1),
                asyncio.to_thread(data_periodos_academicos.quick_sort_with_attribute, data_periodos_academicos.to_array, "_id", 1),
                asyncio.to_thread(data_asignaturas.quick_sort_with_attribute, data_asignaturas.to_array, "_id", 1)
            ]

            data_asignacion_docente_ordenada, data_periodos_academicos_ordenada, data_asignaturas_ordenada = await asyncio.gather(*tasks)

            for asignacion in data_asignacion_docente_ordenada:
                docente_id = asignacion._docente_id
                asignatura_id = asignacion._asignatura_id
                periodo_academico_id = asignacion._periodo_academico_id            

                #* Busquedas concurrentes
                tasks = [
                    asyncio.to_thread(binary_search, data_docentes, docente_id),
                    asyncio.to_thread(data_asignaturas.busqueda_binaria_atribute, data_asignaturas_ordenada, "_id", asignatura_id),
                    asyncio.to_thread(data_periodos_academicos.busqueda_binaria_atribute, data_periodos_academicos_ordenada, "_id", periodo_academico_id)
                ]

                docente_info, asignatura_info, periodo_academico_info = await asyncio.gather(*tasks)

                if docente_info and asignatura_info and periodo_academico_info:
                    asignacion_info = {
                        'id': asignacion._id,
                        'docente_id': docente_id,
                        "titulo": docente_info["titulo"],
                        "experiencia_laboral": docente_info["experiencia_laboral"],
                        "cubiculo": docente_info["cubiculo"],
                        'docente_nombre': f"{docente_info['primer_nombre']} {docente_info['segundo_nombre']} {docente_info['primer_apellido']} {docente_info['segundo_apellido']}",
                        "primer_nombre": docente_info["primer_nombre"],
                        "segundo_nombre": docente_info["segundo_nombre"],
                        "primer_apellido": docente_info["primer_apellido"],
                        "segundo_apellido": docente_info["segundo_apellido"],
                        "telefono": docente_info["telefono"],
                        "dni": docente_info["dni"],
                        "fecha_nacimiento": docente_info["fecha_nacimiento"],
                        "email": docente_info["email"],
                        "tipo_identificacion_id": docente_info["tipo_identificacion_id"],
                        "genero_id": docente_info["genero_id"],
                        'asignatura_id': asignatura_id,
                        'asignatura_nombre': asignatura_info._nombre,
                        'periodo_academico_id': periodo_academico_id,
                        'periodo_academico_fecha_inicio': periodo_academico_info._fecha_inicio.strftime("%d/%m/%Y"),
                        'periodo_academico_fecha_fin': periodo_academico_info._fecha_fin.strftime("%d/%m/%Y")
                    }
                    asignacion_info_completa.append(asignacion_info)

            fin = time.time()
            print(colorama.Fore.RED + f"Tiempo de ejecución en get_asignacion_info_completa: {fin - inicio}" + colorama.Fore.RESET)
            return asignacion_info_completa
        except Exception as e:
            print(f"Error listando asignaciones con detalles de docente: {e}")
            return []
        