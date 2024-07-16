from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

#* Funciones de ayuda 

#* Funcion de busqueda binaria
def binary_search(array, target_id):
    left, right = 0, len(array) - 1
    while left <= right:
        mid = (left + right) // 2
        if array[mid]['id'] == target_id:
            return array[mid]
        elif array[mid]['id'] < target_id:
            left = mid + 1
        else:
            right = mid - 1
    return None

#* Argon2
ph = PasswordHasher()

#* Encriptado de contraseñas
def encrypt_password(password):
    return ph.hash(password)

#* Verificacion de contraseñas
def verify_password(password_ingresada, password_encriptada):
    try:
        valor = ph.verify(password_encriptada, password_ingresada)
        print(f"valor: {valor}")
        return valor
    except VerifyMismatchError:
        return False
