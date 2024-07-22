import os
import pydoc
import io


def generate_html_for_module(module_name):
    """Genera la documentación HTML para un módulo y devuelve el contenido como una cadena."""
    try:
        doc = pydoc.HTMLDoc()
        html_content = doc.docmodule(pydoc.locate(module_name))
        return html_content
    except Exception as e:
        print(f"Error generando documentación para {module_name}: {e}")
        return "<p>Error generando documentación.</p>"


def get_python_files(root_dir):
    """Obtiene una lista de todos los módulos .py en el directorio y sus subdirectorios, excluyendo la carpeta 'virtual'."""
    python_files = []
    for root, _, files in os.walk(root_dir):
        if ".venv" in root:
            continue  # Omite la carpeta 'virtual'
        for file in files:
            if file.endswith(".py"):
                module_name = (
                    os.path.relpath(os.path.join(root, file), root_dir)
                    .replace(".py", "")
                    .replace(os.path.sep, ".")
                )
                python_files.append(module_name)
    return python_files


def combine_html_contents(output_file, html_contents):
    """Combina los contenidos HTML de todos los módulos en un solo archivo HTML."""
    with open(output_file, "w", encoding="utf-8") as outfile:
        outfile.write("<html><head><title>Documentation</title></head><body>\n")
        for content in html_contents:
            outfile.write(content + "<hr>\n")  # Añade un separador entre módulos
        outfile.write("</body></html>\n")


# Ruta al directorio de módulos
root_directory = "C:\\Users\\Axlmd\\Desktop\\SSE_PIS\\server"


# Generar documentación HTML para todos los archivos .py
html_contents = [
    generate_html_for_module(module) for module in get_python_files(root_directory)
]

# Combinar todos los contenidos HTML en uno solo
combine_html_contents("combined_documentation.html", html_contents)
