
# import matplotlib.pyplot as plt

# def calcular_proyeccion(nota_unidad1, nota_unidad2):
#     # Verificar si las notas son válidas (entre 1 y 10)
#     if not (1 <= nota_unidad1 <= 10) or not (1 <= nota_unidad2 <= 10):
#         raise ValueError("Las notas deben estar en el rango de 1 a 10.")

#     # Calcular la nota mínima necesaria para la tercera unidad para pasar
#     nota_necesaria_unidad3 = 21 - nota_unidad1 - nota_unidad2

#     # Calcular la suma acumulada de las dos unidades
#     suma_acumulada = nota_unidad1 + nota_unidad2

#     # Determinar el color y el mensaje según la nota necesaria para la tercera unidad
#     if nota_necesaria_unidad3 < 1:
#         color = 'green'
#         mensaje = "Estudiante casi aprobado"
#     elif 1 <= nota_necesaria_unidad3 <= 5:
#         color = 'blue'
#         mensaje = f"Necesita entre {nota_necesaria_unidad3} y {nota_necesaria_unidad3 + 1} en la unidad 3 para pasar"
#     elif 6 <= nota_necesaria_unidad3 <= 7:
#         color = 'purple'
#         mensaje = f"Necesita entre {nota_necesaria_unidad3} y {nota_necesaria_unidad3 + 1} en la unidad 3 para pasar"
#     else:
#         color = 'red'
#         mensaje = "Estudiante perdido"

#     # Calcular la proyección como el promedio de las dos unidades
#     proyeccion = (nota_unidad1 + nota_unidad2) / 2

#     # Retornar la proyección, la nota necesaria para la unidad 3, la suma acumulada, el color y el mensaje
#     return proyeccion, nota_necesaria_unidad3, suma_acumulada, color, mensaje

# def graficar_proyeccion(nota_unidad1, nota_unidad2, proyeccion, nota_necesaria_unidad3, suma_acumulada, color, mensaje):
#     # Crear gráfico de proyección
#     unidades = ['Unidad 1', 'Unidad 2', 'Unidad 3 (Proyección)']
#     notas = [nota_unidad1, nota_unidad2, nota_necesaria_unidad3]
#     # proyecciones = [nota_unidad1, proyeccion, 21]

#     plt.figure(figsize=(10, 6))

#     # Dibujar las líneas de las unidades y la proyección
#     plt.plot(unidades[:2], notas[:2], marker='o', linestyle='-', color='b', label='Notas de unidades')
#     plt.plot([f'Proyección'], [proyeccion], marker='o', markersize=8, linestyle='', color=color, label=f'Proyección nota Unidad3: {proyeccion} - \nMensaje: ({mensaje})')

#     # Anotaciones para la suma acumulada y la nota necesaria para la unidad 3
#     plt.annotate(f'Suma U1 y U2: {suma_acumulada} puntos', xy=('Unidad 2', nota_unidad2), xytext=(-60, 40),
#                  textcoords='offset points', arrowprops=dict(arrowstyle='->', color='gray'))

#     # Línea horizontal de referencia para la nota mínima para pasar
#     plt.axhline(y=7, color='gray', linestyle='--', label=f'Nota mínima para pasar: {nota_necesaria_unidad3}')
    
#     # Mostrar la nota necesaria para pasar como una anotación sobre la línea de referencia
#     plt.text(1.8, 7.1, f'Nota necesaria: {nota_necesaria_unidad3}', color='gray', fontsize=10, va='center')

#     plt.title('Proyección de Nota Final del Estudiante')
#     plt.xlabel('Unidades')
#     plt.ylabel('Nota')
#     plt.legend()
#     plt.grid(True)
#     plt.tight_layout()
#     plt.show()

# def main():
#     # Datos de ejemplo (notas de las unidades)
#     nota_unidad1 = 8
#     nota_unidad2 = 8 

#     # Calcular la proyección, la nota necesaria para la unidad 3, la suma acumulada, el color y el mensaje
#     proyeccion, nota_necesaria_unidad3, suma_acumulada, color, mensaje = calcular_proyeccion(nota_unidad1, nota_unidad2)

#     # Graficar la proyección
#     graficar_proyeccion(nota_unidad1, nota_unidad2, proyeccion, nota_necesaria_unidad3, suma_acumulada, color, mensaje)

# if __name__ == "__main__":
#     main()



import matplotlib.pyplot as plt
from io import BytesIO

def calcular_proyeccion_estudiante_unidad_3(nota_unidad1, nota_unidad2):
    # Verificar si las notas son válidas (entre 1 y 10)
    if not (1 <= nota_unidad1 <= 10) or not (1 <= nota_unidad2 <= 10):
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
        mensaje = "Estudiante perdido"

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

def main():
    # Datos de ejemplo (notas de las unidades)
    nota_unidad1 = 8
    nota_unidad2 = 8 

    # Calcular la proyección, la nota necesaria para la unidad 3, la suma acumulada, el color y el mensaje
    proyeccion, nota_necesaria_unidad3, suma_acumulada, color, mensaje = calcular_proyeccion_estudiante_unidad_3(nota_unidad1, nota_unidad2)

    # Graficar la proyección y guardar la imagen en una variable
    imagen = grafica_proyeccion_estudiante_unidad_3(nota_unidad1, nota_unidad2, proyeccion, nota_necesaria_unidad3, suma_acumulada, color, mensaje)
    
    # Guardar la imagen en un archivo para verificar (opcional)
    # with open('proyeccion.png', 'wb') as f:
    #     f.write(imagen.getbuffer())

if __name__ == "__main__":
    main()
