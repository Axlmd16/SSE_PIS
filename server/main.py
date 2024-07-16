from controls.reportes.util import Util
import time

from controls.admin.asignatura_control import AsignaturaControl
from controls.cargar_notas.cursaControlDao import CursaControl
from controls.academic.asignacion_control import AsignacionControl
from controls.admin.unidad_control import UnidadControl
from controls.tda.list.linked_list import Linked_List


cursa_control = CursaControl()
ac = AsignacionControl()
asigc = AsignaturaControl()
uc = UnidadControl()

cursa = cursa_control._find(3)
ac = ac._find(1)
asigc = asigc._find(1)

l1 = []
lista = uc.list()


for unidad in lista:
    if unidad._asignatura_id == asigc["id"]:
        l1.insert(0, unidad)

print(l1)
