from controls.reportes.util import Util
import time

from controls.admin.asignatura_control import AsignaturaControl
from controls.cargar_notas.cursaControlDao import CursaControl
from controls.academic.asignacion_control import AsignacionControl
from controls.admin.unidad_control import UnidadControl
from controls.tda.list.linked_list import Linked_List
from controls.admin.grupo_control import GrupoControl
from controls.cargar_notas.matricula_control import MatriculaControl


gc = GrupoControl()
mc = MatriculaControl()


print(gc.list()[0]._id)

codigo = mc.generate_cod_matricula()

print(codigo)
