from controls.reportes.util import Util
import time

from controls.admin.asignatura_control import AsignaturaControl

ac = AsignaturaControl()

estudiantes_cursas = Util().get_estudiantes_por_asignatura(1)

print(estudiantes_cursas)
