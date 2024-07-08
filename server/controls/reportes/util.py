from controls.admin.asignatura_control import AsignaturaControl
from controls.academic.asignacion_control import AsignacionControl
from controls.cargar_notas.cursaControlDao import CursaControl
from controls.tda.list.linked_list import Linked_List
from controls.dao.connection import ConnectionDB
from controls.admin.unidad_control import UnidadControl


class Util:
    def __init__(self):
        self.__cursor = ConnectionDB().connection()._db.cursor()

    def get_asignaturas_por_curso(self, id):
        query = f"""SELECT
        A.ID, 
        A.NOMBRE
    FROM
        CURSA C
        JOIN ASIGNACION ASG ON C.ASIGNACION_ID = ASG.ID
        JOIN ASIGNATURA A ON ASG.ASIGNATURA_ID = A.ID
    WHERE
        C.ID = {id}"""
        self.__cursor.execute(query)
        return ConnectionDB().fetchall_to_dict(self.__cursor)

    # def get_asignaturas_por_curso(self, curso_id):
    #     ac = AsignacionControl()
    #     asignaciones = ac.list()
    #     cc = CursaControl()
    #     cursos = cc.list()
    #     asc = AsignaturaControl()
    #     asignaturas = asc.list()

    #     asignaciones.sort_models("id")

    #     curso = cursos.search_models_binary("id", curso_id)

    #     asignacion_id = curso._asignacion_id

    #     asignaturas_en_curso = Linked_List()
    #     asignatura_ids = asignaciones.busqueda_binaria_lineal_atribute(
    #         asignaciones.to_array, "_id", asignacion_id
    #     )

    #     for asignatura in asignatura_ids:
    #         asignatura_obj = asignaturas.search_models_binary(
    #             "id", asignatura._asignatura_id
    #         )
    #         if asignatura_obj:
    #             asignaturas_en_curso.add(asignatura_obj)

    #     return asignaturas_en_curso

    def get_units_by_asignatura(self, asignatura_id):
        query = f"""SELECT
        U.ID, 
        U.NOMBRE AS UNIDAD_NOMBRE,
        U.ASIGNATURA_ID,
        A.NOMBRE AS ASIGNATURA_NOMBRE,
        U.NRO_UNIDAD
    FROM
        ASIGNATURA A
        JOIN UNIDAD U ON A.ID = U.ASIGNATURA_ID
    WHERE
        A.ID = {asignatura_id}"""
        self.__cursor.execute(query)
        return ConnectionDB().fetchall_to_dict(self.__cursor)

    # def get_units_by_asignatura(self, asignatura_id):
    #     ac = AsignaturaControl()
    #     uc = UnidadControl()
    #     asignaturas = ac.list()
    #     unidades = uc.list()

    #     asignatura = asignaturas.search_models_binary("id", asignatura_id)

    #     unidades_en_asignatura = Linked_List()
    #     unidades_ids = unidades.busqueda_binaria_lineal_atribute(
    #         unidades.to_array, "_asignatura_id", asignatura_id
    #     )

    #     for unidad in unidades_ids:
    #         unidad_obj = unidades.search_models_binary("id", unidad._id)
    #         if unidad_obj:
    #             unidades_en_asignatura.add(unidad_obj)

    #     return unidades_en_asignatura
    def get_estudiantes_por_curso(self, id_curso):
        query = f"""SELECT
        p.id AS persona_id,
        p.primer_nombre,
        P.SEGUNDO_NOMBRE,
        p.primer_apellido,
        p.SEGUNDO_APELLIDO,
        ue.UNIDAD_ID,
        ue.NOTA_UNIDAD,
        e.NRO_MATRICULA,
        u.NOMBRE AS UNIDAD_NOMBRE,
        U.ASIGNATURA_ID,
        u.NRO_UNIDAD
    FROM
        persona p
    JOIN ESTUDIANTE e ON p.id = e.ID
    JOIN ESTUDIANTE_CURSA ec ON e.ID = ec.ESTUDIANTE_ID AND ec.CURSA_ID = :curso_id
    JOIN UNIDAD_ESTUDIANTE ue ON ec.ID = ue.ESTUDIANTE_CURSA_ID
    JOIN UNIDAD u ON ue.UNIDAD_ID = u.ID"""
        self.__cursor.execute(query, {"curso_id": id_curso})
        return ConnectionDB().fetchall_to_dict(self.__cursor)

    def get_notas_criterio_por_unidad(self, unidad_id):
        query = f"""SELECT
        p.id AS persona_id,
        p.primer_nombre,
        P.SEGUNDO_NOMBRE,
        p.primer_apellido,
        p.SEGUNDO_APELLIDO,
        e.ID AS ESTUDIANTE_ID,
        ue.NOTA_UNIDAD,
        nc.ID AS CRITERIO_ID,
        c.NOMBRE AS CRITERIO_NOMBRE,
        nc.NOTA_CRITERIO
    FROM
        persona p
        JOIN ESTUDIANTE e ON p.id = e.ID
        JOIN ESTUDIANTE_CURSA ec ON e.ID = ec.ESTUDIANTE_ID
        JOIN CURSA c ON ec.CURSA_ID = c.ID
        JOIN UNIDAD_ESTUDIANTE ue ON ec.ID = ue.ESTUDIANTE_CURSA_ID
        JOIN NOTA_CRITERIO nc ON ue.ID = nc.UNIDAD_ESTUDIANTE_ID
        JOIN CRITERIO c ON nc.CRITERIO_ID = c.ID
    WHERE
        ue.UNIDAD_ID = :unidad_id"""
        self.__cursor.execute(query, {"unidad_id": unidad_id})
        return ConnectionDB().fetchall_to_dict(self.__cursor)

    def get_cursos_por_docente(self, docente_id):
        query = f"""SELECT
            c.id AS curso_id,
            asg.NOMBRE AS asignatura_nombre,
            asg.ID AS asignatura_id,
            pa.FECHA_INICIO AS periodo_academico_fecha_inicio,
            pa.FECHA_FIN AS periodo_academico_fecha_fin,
            a.ID AS asignacion_id
        FROM
            CURSA c
        JOIN
            ASIGNACION a ON c.ASIGNACION_ID = a.ID
        JOIN
            ASIGNATURA asg ON a.ASIGNATURA_ID = asg.ID
        JOIN
            PERIODO_ACADEMICO pa ON a.PERIODO_ACADEMICO_ID = pa.ID
        JOIN
            PERSONA p ON a.DOCENTE_ID = p.ID
        WHERE
            p.ID = :docente_id"""
        self.__cursor.execute(query, {"docente_id": docente_id})
        return ConnectionDB().fetchall_to_dict(self.__cursor)

    def estudiantes_por_curso(self, curso_id):
        query = f"""SELECT
            ec.ID as id_estudiante_cursa
        FROM
            ESTUDIANTE_CURSA ec
        JOIN
            CURSA c ON ec.CURSA_ID = c.ID
        WHERE
            c.ID = :curso_id"""
        self.__cursor.execute(query, {"curso_id": curso_id})
        return ConnectionDB().fetchall_to_dict(self.__cursor)
