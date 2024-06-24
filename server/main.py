from datetime import datetime
from controls.inicio_sesion.persona_control import PersonaControl
from controls.inicio_sesion.tipo_ide_control import TipoIdeControl
from controls.inicio_sesion.genero_control import GeneroControl
from controls.inicio_sesion.cuenta_control import CuentaControl
from controls.inicio_sesion.utils_2 import Utils_D
from controls.inicio_sesion.utils import Util


utils = Utils_D()

permisos_user = utils.get_permisos_by_rols_from_user(10)

print(permisos_user.print)

print("-------------------------------------")
permisos_rol2 = Util().get_permisos(14)

print(permisos_rol2)
