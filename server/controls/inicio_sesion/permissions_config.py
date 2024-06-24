ROLE_PERMISSIONS = {
    "administrado": [
        "gestionar_usuarios",
        "gestionar_carreras",
        "gestionar_asignaturas",
        "gestionar_roles_y_permisos",
        "gestionar_estudiantes",
        "gestionar_docentes",
        "gestionar_mallas_academicas",
        "gestionar_asignaciones",
        "gestionar_cursos",
        "gestionar_cuentas",
    ],
    "docente": [
        "ver_cursos_asignados",
        "ver_asignaturas_asignadas",
        "subir_notas",
    ],
    "comision": [
        "gestionar_proyecciones",
        "gestionar_informes",
    ],
}


def get_permissions_for_roles(roles):
    permissions = set()
    for role in roles:
        permissions.update(ROLE_PERMISSIONS.get(role, []))
    return list(permissions)
