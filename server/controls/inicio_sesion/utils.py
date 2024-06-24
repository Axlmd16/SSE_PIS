from controls.dao.connection import ConnectionDB


class Util:
    def __init__(self):
        self.__cursor = ConnectionDB().connection()._db.cursor()

    # * Funcion para obtener todos los permisos que tiene un usuario basado en sus roles
    def get_permisos(self, id):
        query = f"""SELECT
                perm.id AS permiso_id,
                perm.nombre AS permiso_nombre,
                perm.DESCRIPCION as permiso_descripcion
            FROM
                permiso perm
            JOIN
                rol_permiso rp ON perm.id = rp.permiso_id
            JOIN
                rol r ON rp.rol_id = r.id
            JOIN
                rol_persona rp2 ON r.id = rp2.rol_id
            JOIN
                persona per ON rp2.persona_id = per.id
            WHERE
                per.id = {id}"""
        self.__cursor.execute(query)
        return ConnectionDB().fetchall_to_dict(self.__cursor)

    # * Funcion para obtener todos los roles de un usuario
    def get_roles(self, id):
        query = f"""SELECT
                r.id AS rol_id,
                r.nombre AS rol_nombre,
                r.DESCRIPCION as rol_descripcion
            FROM
                rol r
            JOIN
                rol_persona rp ON r.id = rp.rol_id
            JOIN
                persona p ON rp.persona_id = p.id
            WHERE
                p.id = {id}"""
        self.__cursor.execute(query)
        return ConnectionDB().fetchall_to_dict(self.__cursor)

    # * Funcion para obtener todos los permisos asociados a un rol
    def get_permisos_by_rol(self, id):
        query = f"""SELECT
                p.id AS permiso_id,
                p.nombre AS permiso_nombre,
                p.descripcion AS permiso_descripcion
            FROM
                permiso p
            JOIN
                rol_permiso rp ON p.id = rp.permiso_id
            JOIN
                rol r ON rp.rol_id = r.id   
            WHERE
                r.id = {id}"""
        self.__cursor.execute(query)
        return ConnectionDB().fetchall_to_dict(self.__cursor)
