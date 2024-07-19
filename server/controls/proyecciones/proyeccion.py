


import matplotlib.pyplot as plt
from io import BytesIO
import colorama

#* ---------------------------------------------------- UNIDAD 3 ---------------------------------------------------- *
def calcular_proyeccion_estudiante_unidad_3(nota_unidad1, nota_unidad2):
    # Verificar si las notas son válidas (entre 1 y 10)
    if not (0 <= nota_unidad1 <= 10) or not (0 <= nota_unidad2 <= 10):
        raise ValueError("Las notas deben estar en el rango de 1 a 10.")

    # Calcular la nota mínima necesaria para la tercera unidad para pasar
    nota_necesaria_unidad3 = 21 - nota_unidad1 - nota_unidad2

    # Calcular la suma acumulada de las dos unidades
    suma_acumulada = nota_unidad1 + nota_unidad2

    # Determinar el color y el mensaje según la nota necesaria para la tercera unidad
    if nota_necesaria_unidad3 < 1:
        color = 'white'
        mensaje = "Estudiante casi aprobado"
    elif 1 <= nota_necesaria_unidad3 <= 5:
        color = 'blue'
        mensaje = f"Necesita entre {nota_necesaria_unidad3} y {nota_necesaria_unidad3 + 1} en la unidad 3 para pasar"
    elif 6 <= nota_necesaria_unidad3 <= 7:
        color = 'black'
        mensaje = f"Necesita entre {nota_necesaria_unidad3} y {nota_necesaria_unidad3 + 1} en la unidad 3 para pasar"
    else:
        color = 'red'
        mensaje = "Estudiante con notas debajo del promedio, proximo a reprobar"

    # Calcular la proyección como el promedio de las dos unidades
    proyeccion = (nota_unidad1 + nota_unidad2) / 2

    # Retornar la proyección, la nota necesaria para la unidad 3, la suma acumulada, el color y el mensaje
    return proyeccion, nota_necesaria_unidad3, suma_acumulada, color, mensaje

def grafica_proyeccion_estudiante_unidad_3(nota_unidad1, nota_unidad2, proyeccion, nota_necesaria_unidad3, suma_acumulada, color, mensaje):
    # Crear gráfico de proyección
    unidades = ['Unidad 1', 'Unidad 2', 'Unidad 3 (Proyección)']
    notas = [nota_unidad1, nota_unidad2, nota_necesaria_unidad3]

    plt.figure(figsize=(10, 6))

    # Dibujar las líneas de las unidades y la proyección
    plt.plot(unidades[:2], notas[:2], marker='o', linestyle='-', color='b', label='Notas de unidades')
    plt.plot([f'Proyección'], [proyeccion], marker='o', markersize=8, linestyle='', color=color, label=f'Proyección nota Unidad3: {proyeccion} - \nMensaje: ({mensaje})')

    # Anotaciones para la suma acumulada y la nota necesaria para la unidad 3
    plt.annotate(f'Suma U1 y U2: {suma_acumulada} puntos', xy=('Unidad 2', nota_unidad2), xytext=(-60, 40),
                 textcoords='offset points', arrowprops=dict(arrowstyle='->', color='gray'))

    # Línea horizontal de referencia para la nota mínima para pasar
    plt.axhline(y=7, color='gray', linestyle='--', label=f'Nota mínima para pasar: {nota_necesaria_unidad3}')
    
    # Mostrar la nota necesaria para pasar como una anotación sobre la línea de referencia
    plt.text(1.8, 7.1, f'Nota necesaria: {nota_necesaria_unidad3}', color='gray', fontsize=10, va='center')

    plt.title('Proyección de Nota Final del Estudiante')
    plt.xlabel('Unidades')
    plt.ylabel('Nota')
    plt.legend()
    plt.grid(True)
    plt.tight_layout()

    # Guardar la imagen en un objeto BytesIO en lugar de mostrarla
    buf = BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    return buf

#* ---------------------------------------------------- PARAMETOR DE EVALUACION ---------------------------------------------------- *



def calcular_proyeccion_estudiante_parametros(evaluacion, ape, acd, aa):
    # Verificar si las notas son válidas
    if not (0 <= evaluacion <= 3.5):
        raise ValueError("La nota de Evaluación debe estar en el rango de 0 a 3.5.")
    if not (0 <= ape <= 2.5):
        raise ValueError("La nota de APE debe estar en el rango de 0 a 2.5.")
    if not (0 <= acd <= 2):
        raise ValueError("La nota de ACD debe estar en el rango de 0 a 2.")
    if not (0 <= aa <= 2):
        raise ValueError("La nota de AA debe estar en el rango de 0 a 2.")

    # Calcular la proyección como la suma de las cuatro unidades
    proyeccion = evaluacion + ape + acd + aa

    # Determinar el color y el mensaje según la proyección
    if proyeccion >= 7:
        color = 'green'
        mensaje = "Estudiante con rendimiento normal"
    else:
        color = 'red'
        mensaje = "Estudiante con rendimiento bajo del promedio"

    # Retornar la proyección, el color y el mensaje
    return proyeccion, color, mensaje


def grafica_proyeccion_estudiante_parametros(evaluacion, ape, acd, aa, proyeccion, color, mensaje, nombre_estudiante):
    # Definir los valores máximos para cada parámetro
    max_evaluacion = 3.5
    max_ape = 2.5
    max_acd = 2
    max_aa = 2

    # if suma_total > 7:
    #     mensaje = "Estudiante por encima de la nota necesaria"
    # elif suma_total < 7:
    #     mensaje = "Estudiante por debajo de la nota necesaria"

    # Definir los valores de los parámetros
    parametros = ['Evaluacion', 'APE', 'ACD', 'AA']
    valores = [evaluacion, ape, acd, aa]
    max_valores = [max_evaluacion, max_ape, max_acd, max_aa]

    # Crear gráfico de barras
    plt.figure(figsize=(10, 6))

    # Dibujar las barras rojas para los valores máximos
    plt.bar(parametros, max_valores, color='red', alpha=0.5, label='Nota maximo: 10 Puntos')

    # Dibujar las barras para los valores reales por encima de las barras rojas
    plt.bar(parametros, valores, color=color, label=f'Nota obtenida: {proyeccion}\n{mensaje}')

    # Agregar título, etiquetas y leyenda
    plt.title(f'Notas del Estudiante: {nombre_estudiante}')
    plt.xlabel('Parámetros')
    plt.ylabel('Nota')
    plt.legend()
    plt.grid(True)
    plt.tight_layout()

    # Guardar la imagen en un objeto BytesIO en lugar de mostrarla
    buf = BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    return buf

#* ---------------------------------------------------- Proyeccuion todos los estudiantes ---------------------------------------------------- *

def graficar_proyecciones_estudiantes(data):
    nombres = [persona['nombre'] for persona in data]
    unidad1 = [persona['unidad_1'] for persona in data]
    unidad2 = [persona['unidad_2'] for persona in data]
    proyeccion = [(persona['unidad_1'] + persona['unidad_2']) / 2 for persona in data]
    falta_para_21 = [21 - persona['unidad_1'] - persona['unidad_2'] for persona in data]

    plt.figure(figsize=(12, 6))

    bar_width = 0.2
    index = list(range(len(data)))
    
    bars1 = plt.bar(index, unidad1, bar_width, color='yellow', label='Nota Unidad 1')
    bars2 = plt.bar([i + bar_width for i in index], unidad2, bar_width, color='pink', label='Nota Unidad 2')
    bars3 = plt.bar([i + 2 * bar_width for i in index], proyeccion, bar_width, color='blue', label='Proyección')
    bars4 = plt.bar([i + 3 * bar_width for i in index], falta_para_21, bar_width, color="red", label='Nota requerida Unidad 3')

    # Agregar etiquetas con los valores de cada barra
    def autolabel(bars):
        for bar in bars:
            height = bar.get_height()
            plt.annotate('{}'.format(height),
                         xy=(bar.get_x() + bar.get_width() / 2, height),
                         xytext=(0, 3),  # 3 points vertical offset
                         textcoords="offset points",
                         ha='center', va='bottom')

    autolabel(bars1)
    autolabel(bars2)
    autolabel(bars3)
    autolabel(bars4)

    plt.xlabel('Personas')
    plt.ylabel('Notas')
    plt.title('Proyección de Nota Final por Estudiante')
    plt.xticks([i + 1.5 * bar_width for i in index], nombres, rotation=90)
    plt.legend()

    plt.tight_layout()

    buf = BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    return buf

def graficar_proyecciones_all_estudiantes(data):
    imagen = graficar_proyecciones_estudiantes(data)
    return imagen

#* ---------------------------------------------------- PARAMETOR DE EVALUACION Todos los Estudiantes ---------------------------------------------------- *

def calcular_proyeccion_estudiante_parametros_all(evaluacion, ape, acd, aa):
    # Verificar si las notas son válidas
    if not (0 <= evaluacion <= 3.5):
        raise ValueError("La nota de Evaluación debe estar en el rango de 0 a 3.5.")
    if not (0 <= ape <= 2.5):
        raise ValueError("La nota de APE debe estar en el rango de 0 a 2.5.")
    if not (0 <= acd <= 2):
        raise ValueError("La nota de ACD debe estar en el rango de 0 a 2.")
    if not (0 <= aa <= 2):
        raise ValueError("La nota de AA debe estar en el rango de 0 a 2.")

    # Calcular la proyección como la suma de las cuatro unidades
    proyeccion = evaluacion + ape + acd + aa

    # Determinar el color y el mensaje según la proyección
    if proyeccion >= 7:
        mensaje = "Notas regulares"
    else:
        mensaje = "Notas debajo del promedio"

    # Retornar la proyección, el color y el mensaje
    return proyeccion, mensaje

def calcular_proyeccion_parametros_all_estudaintes(data):
    nombres = [persona['nombre'] for persona in data]
    evaluacion = [persona['criterio_1'] for persona in data]
    ape = [persona['criterio_2'] for persona in data]
    acd = [persona['criterio_3'] for persona in data]
    aa = [persona['criterio_4'] for persona in data]

    proyecciones = []
    mensajes = []

    for i in range(len(data)):
        proyeccion, mensaje = calcular_proyeccion_estudiante_parametros_all(evaluacion[i], ape[i], acd[i], aa[i])
        proyecciones.append(proyeccion)
        mensajes.append(mensaje)

    maximo = [10] * len(data)  # Lista de 10s para el valor máximo de proyección

    plt.figure(figsize=(12, 6))

    bar_width = 0.15
    index = list(range(len(data)))
    
    bars1 = plt.bar(index, evaluacion, bar_width, color='yellow', label='Evaluacion')
    bars2 = plt.bar([i + bar_width for i in index], ape, bar_width, color='pink', label='APE')
    bars3 = plt.bar([i + 2 * bar_width for i in index], acd, bar_width, color='blue', label='ACD')
    bars4 = plt.bar([i + 3 * bar_width for i in index], aa, bar_width, color='red', label='AA')
    bars5 = plt.bar([i + 4 * bar_width for i in index], proyecciones, bar_width, color="green", label='Nota Obtenida')
    bars6 = plt.bar([i + 5 * bar_width for i in index], maximo, bar_width, color='gray', alpha=0.5, label='Nota máxima')

    # Agregar etiquetas con los valores de cada barra y mensajes
    def autolabel(bars, messages=None):
        for i, bar in enumerate(bars):
            height = bar.get_height()
            plt.annotate(f'{height}\n{messages[i]}' if messages else f'{height}',
                         xy=(bar.get_x() + bar.get_width() / 2, height),
                         xytext=(0, 3),  # 3 points vertical offset
                         textcoords="offset points",
                         ha='center', va='bottom')

    autolabel(bars1)
    autolabel(bars2)
    autolabel(bars3)
    autolabel(bars4)
    autolabel(bars5, mensajes)
    autolabel(bars6)

    plt.xlabel('Estudiantes')
    plt.ylabel('Notas')
    plt.title('Proyección de Notas por Estudiante')
    plt.xticks([i + 2.5 * bar_width for i in index], nombres, rotation=90)
    plt.legend()

    plt.tight_layout()

    buf = BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    return buf

def graficar_proyecciones_all_estudiantes_parametros(data):
    imagen = calcular_proyeccion_parametros_all_estudaintes(data)
    return imagen

# def main():
#     # Datos de ejemplo (notas de las unidades)
#     nota_unidad1 = 8
#     nota_unidad2 = 8 

#     # Calcular la proyección, la nota necesaria para la unidad 3, la suma acumulada, el color y el mensaje
#     proyeccion, nota_necesaria_unidad3, suma_acumulada, color, mensaje = calcular_proyeccion_estudiante_unidad_3(nota_unidad1, nota_unidad2)

#     # Graficar la proyección y guardar la imagen en una variable
#     imagen = grafica_proyeccion_estudiante_unidad_3(nota_unidad1, nota_unidad2, proyeccion, nota_necesaria_unidad3, suma_acumulada, color, mensaje)
    
#     # Guardar la imagen en un archivo para verificar (opcional)
#     # with open('proyeccion.png', 'wb') as f:
#     #     f.write(imagen.getbuffer())

# if __name__ == "__main__":
#     main()
