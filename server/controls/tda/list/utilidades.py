
#* Funciones de ayuda 

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

def binary_search_2(array, target_id):
    left, right = 0, len(array) - 1
    while left <= right:
        mid = (left + right) // 2
        if array[mid]._id == target_id:
            return array[mid]
        elif array[mid]._id < target_id:
            left = mid + 1
        else:
            right = mid - 1
    return None