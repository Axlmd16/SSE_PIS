from controls.admin.asignatura_control import AsignaturaControl
from controls.academic.asignacion_control import AsignacionControl
from controls.cargar_notas.cursaControlDao import CursaControl
from controls.tda.list.linked_list import Linked_List
from controls.dao.connection import ConnectionDB
from controls.admin.unidad_control import UnidadControl


class Util:
    def __init__(self):
        self.__cursor = ConnectionDB().connection()._db.cursor()

    def get_asignaturas_por_curso(self, paralelo, ciclo_id):
        query = f"""SELECT
            ASI.ID AS ASIGNATURA_ID,
            ASI.NOMBRE
        FROM
            CURSA C
        JOIN
            ASIGNACION A ON C.ASIGNACION_ID = A.ID
        JOIN
            ASIGNATURA ASI ON A.ASIGNATURA_ID = ASI.ID
        JOIN
            CICLO CL ON C.CICLO_ID = CL.ID
        WHERE
            CL.ID = :id_ciclo
            AND C.PARALELO = :paralelo"""
        self.__cursor.execute(query, {"paralelo": paralelo, "id_ciclo": ciclo_id})
        return ConnectionDB().fetchall_to_dict(self.__cursor)

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

    def get_notas_criterio_por_unidad(self, unidad_id, cursa_id):
        query = f"""SELECT
        p.id AS persona_id,
        p.primer_nombre,
        P.SEGUNDO_NOMBRE,
        p.primer_apellido,
        p.SEGUNDO_APELLIDO,
        e.ID AS ESTUDIANTE_ID,
        ue.NOTA_UNIDAD,
        cri.ID AS CRITERIO_ID,
        cri.NOMBRE AS CRITERIO_NOMBRE,
        nc.NOTA_CRITERIO,
        cri.PORCENTAJE,
        nc.ID AS NOTA_CRITERIO_ID,
        ue.ID AS UNIDAD_ESTUDIANTE_ID
    FROM
        persona p
        JOIN ESTUDIANTE e ON p.id = e.ID
        JOIN ESTUDIANTE_CURSA ec ON e.ID = ec.ESTUDIANTE_ID
        JOIN CURSA c ON ec.CURSA_ID = c.ID
        JOIN UNIDAD_ESTUDIANTE ue ON ec.ID = ue.ESTUDIANTE_CURSA_ID
        JOIN NOTA_CRITERIO nc ON ue.ID = nc.UNIDAD_ESTUDIANTE_ID
        JOIN CRITERIO cri ON nc.CRITERIO_ID = cri.ID
    WHERE
        ue.UNIDAD_ID = :unidad_id
        AND ec.CURSA_ID = :cursa_id"""
        self.__cursor.execute(query, {"unidad_id": unidad_id, "cursa_id": cursa_id})
        return ConnectionDB().fetchall_to_dict(self.__cursor)

    def get_cursos_por_docente(self, docente_id):
        query = f"""SELECT
            c.id AS curso_id,
            asg.NOMBRE AS asignatura_nombre,
            asg.ID AS asignatura_id,
            pa.FECHA_INICIO AS periodo_academico_fecha_inicio,
            pa.FECHA_FIN AS periodo_academico_fecha_fin,
            a.ID AS asignacion_id,
            c.PARALELO AS curso_paralelo
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
            ec.ID as id_estudiante_cursa,
            p.id AS persona_id,
            p.primer_nombre,
            P.SEGUNDO_NOMBRE,
            p.primer_apellido,
            p.SEGUNDO_APELLIDO,
            P.dni,
            e.codigo_estudiante,
            p.EMAIL
        FROM
            ESTUDIANTE_CURSA ec
        JOIN
            CURSA c ON ec.CURSA_ID = c.ID
        JOIN
            ESTUDIANTE E ON ec.ESTUDIANTE_ID = E.ID
        JOIN
            PERSONA P ON E.ID = P.ID
        WHERE
            c.ID = :curso_id"""
        self.__cursor.execute(query, {"curso_id": curso_id})
        return ConnectionDB().fetchall_to_dict(self.__cursor)

    def get_notas_por_curso_y_estudiantes(self, id_curso, id_asignatura):
        query = f"""SELECT
            p.id AS persona_id,
            p.primer_nombre,
            P.SEGUNDO_NOMBRE,
            P.dni,
            p.primer_apellido,
            p.SEGUNDO_APELLIDO,
            e.codigo_estudiante,
            ue.UNIDAD_ID,
            ue.NOTA_UNIDAD,
            u.NOMBRE AS UNIDAD_NOMBRE,
            U.ASIGNATURA_ID,
            u.NRO_UNIDAD
        FROM
            persona p
        JOIN ESTUDIANTE e ON p.id = e.ID
        JOIN ESTUDIANTE_CURSA ec ON e.ID = ec.ESTUDIANTE_ID AND ec.CURSA_ID = :curso_id
        JOIN UNIDAD_ESTUDIANTE ue ON ec.ID = ue.ESTUDIANTE_CURSA_ID
        JOIN UNIDAD u ON ue.UNIDAD_ID = u.ID
        WHERE
            U.ASIGNATURA_ID = :id_asignatura"""
        self.__cursor.execute(
            query, {"curso_id": id_curso, "id_asignatura": id_asignatura}
        )
        return ConnectionDB().fetchall_to_dict(self.__cursor)

    def get_cursos(self):
        query = f"""SELECT
            CL.CICLO AS ciclo_nombre,
            CL.ID AS ciclo_id,
            C.PARALELO,
            MIN(C.ID) AS cursa_id_min
        FROM CURSA C
        JOIN CICLO CL ON C.CICLO_ID = CL.ID
        GROUP BY CL.CICLO, C.PARALELO, CL.ID"""
        self.__cursor.execute(query)
        return ConnectionDB().fetchall_to_dict(self.__cursor)

    def get_estudiantes_por_asignatura(self, asignatura_id):
        query = f"""SELECT
            ec.ID as id_estudiante_cursa
        FROM
            ESTUDIANTE_CURSA ec
        JOIN
            CURSA c ON ec.CURSA_ID = c.ID
        JOIN
            ESTUDIANTE E ON ec.ESTUDIANTE_ID = E.ID
        JOIN
            PERSONA P ON E.ID = P.ID
        JOIN
            ASIGNACION A ON c.ASIGNACION_ID = A.ID
        JOIN
            ASIGNATURA ASI ON A.ASIGNATURA_ID = ASI.ID
        JOIN
            PERIODO_ACADEMICO PA ON A.PERIODO_ACADEMICO_ID = PA.ID
        WHERE
            ASI.ID = :asignatura_id
            AND PA.ID = :periodo_academico_id"""
        p = 1
        self.__cursor.execute(
            query, {"asignatura_id": asignatura_id, "periodo_academico_id": p}
        )
        return ConnectionDB().fetchall_to_dict(self.__cursor)
