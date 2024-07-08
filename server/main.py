from controls.reportes.util import Util
import time


utils = Util()

start_time = time.time()
print(utils.get_asignaturas_por_curso(2))
print("--- %s seconds ---" % (time.time() - start_time))
