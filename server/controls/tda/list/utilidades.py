from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

#* Funciones de ayuda 

#* Funcion de busqueda binaria
def binary_search(array, target_id):
    """
    Realiza una búsqueda binaria en una lista de diccionarios para encontrar un objeto con un ID específico.

    Args:
        array (dict): Lista de diccionarios que contienen un campo 'id'.
        target_id (int): El ID que se busca.

    Returns:
        dict o None: El diccionario con el ID especificado si se encuentra, o None si no se encuentra.
    """
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
    """
    Encripta una contraseña utilizando el algoritmo Argon2.

    Args:
        password (str): La contraseña que se va a encriptar.

    Returns:
        str: La contraseña encriptada.
    """
    return ph.hash(password)

#* Verificacion de contraseñas
def verify_password(password_ingresada, password_encriptada):
    """
    Verifica si una contraseña ingresarda coincide con una contraseña encriptada.

    Args:
        password_ingresada (str): La contraseña ingresada que se va a verificar.
        password_encriptada (str): La contraseña encriptada con la que se va a comparar.

    Returns:
        bool: True si la contraseña coincide con la encriptada, False en caso contrario.
    """
    try:
        valor = ph.verify(password_encriptada, password_ingresada)
        print(f"valor: {valor}")
        return valor
    except VerifyMismatchError:
        return False
