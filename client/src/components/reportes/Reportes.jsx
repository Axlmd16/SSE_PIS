// Importa las bibliotecas jsPDF
import { useRef } from 'react';
import { jsPDF } from 'jspdf';

// Define un componente funcional llamado 'Reportes'
const Reportes = () => {
    // Definición de variables con información estática
    const nombre = 'Juan Pérez';
    const fecha = '24 de junio de 2024';
    const contenido = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nisl eget turpis interdum aliquet.';
    const asignatura = "Base de datos";
    
    // useRef se usa para crear una referencia que se asociará con el contenido a incluir en el PDF
    const contentRef = useRef(null);

    // Función para generar el PDF
    const generatePDF = () => {
        const doc = new jsPDF(); // Crea una nueva instancia de jsPDF
        
        // Utiliza el método html para añadir contenido HTML al PDF
        doc.html(contentRef.current, {
            callback: function (pdf) { // Callback que se ejecuta cuando el contenido se ha añadido
                const pdfBlob = pdf.output('blob'); // Convierte el PDF a un Blob

                const pdfUrl = URL.createObjectURL(pdfBlob); // Crea una URL para el Blob

                // Crea un enlace para descargar el PDF
                const downloadLink = document.createElement('a');
                downloadLink.href = pdfUrl;
                downloadLink.download = 'reporte.pdf'; // Nombre del archivo a descargar
                downloadLink.click(); // Simula el clic para descargar el archivo

                URL.revokeObjectURL(pdfUrl); // Revoca la URL para liberar memoria
            },
            x: 10, // Posición x inicial en el PDF
            y: 10  // Posición y inicial en el PDF
        });
    };

    // JSX que define la estructura del componente
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded-lg p-8 m-4 max-w-lg mx-auto">
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold">{asignatura}</h1> {/* Muestra la asignatura */}
                    <p className="text-sm text-gray-600">Fecha de emisión: {fecha}</p> {/* Muestra la fecha */}
                </div>
                <div className="mb-4" ref={contentRef}> {/* Contenido que se referenciará para el PDF */}
                    <h2 className="text-lg font-semibold mb-2">Información</h2>
                    <p className="text-sm"><strong>Nombre:</strong> {nombre}</p> {/* Muestra el nombre */}
                    <p className="text-sm"><strong>Asignatura:</strong>{asignatura}</p> {/* Muestra la asignatura */}
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">Proyeccion de Notas</h2>
                    <p className="text-sm">{contenido}</p> {/* Muestra el contenido */}
                </div>
                <div className="text-center text-xs text-gray-600">
                    <p>Informe emitido por el sistema de gestión.</p> {/* Muestra el pie de página */}
                </div>
                <button onClick={generatePDF} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Descargar PDF {/* Botón para generar y descargar el PDF */}
                </button>
            </div>
        </div>
    );
}

// Exporta el componente para que pueda ser usado en otras partes de la aplicación
export default Reportes;
