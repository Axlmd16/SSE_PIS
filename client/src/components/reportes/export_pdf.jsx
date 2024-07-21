import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

const exportToPDF = async (
  course,
  subject,
  unit,
  columns,
  filteredData,
  action,
  email = null,
  actions
) => {
  const doc = new jsPDF();
  const logoUrl = "/img/unl.png";

  // Agregar logo con dimensiones ajustadas
  const logo = await fetch(logoUrl).then((res) => res.blob());
  const reader = new FileReader();
  reader.readAsDataURL(logo);
  reader.onloadend = async function () {
    const logoBase64 = reader.result;
    doc.addImage(logoBase64, "PNG", 10, 10, 60, 30);

    // Título del informe
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("Informe de Rendimiento de Estudiantes", 75, 20);

    // Información del curso, asignatura, y unidad
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.text(`Curso: ${course.ciclo_nombre} - ${course.paralelo}`, 10, 50);
    doc.text(`Asignatura: ${subject.nombre}`, 10, 60);
    if (unit) {
      doc.text(
        `Unidad: ${unit.unidad_nombre
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}`,
        10,
        70
      );
    }

    // Agregar más detalles
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 110, 50);

    // Crear tabla con los datos
    doc.setFontSize(10);
    // Poner otro tipo de fuente para la tabla sin afectar el resto del documento
    doc.setFont("fira", "normal");
    doc.autoTable({
      head: [columns.map((column) => column.name)],
      body: filteredData.map((row) =>
        columns.map((column) => column.selector(row))
      ),
      startY: 80,
      styles: {
        font: "times",
        fontSize: 10,
        halign: "center",
      },
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: [255, 255, 255],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
    });

    // Agregar pie de página
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        `Página ${i} de ${pageCount}`,
        doc.internal.pageSize.getWidth() - 20,
        doc.internal.pageSize.getHeight() - 10
      );
      doc.text(
        "© 2023 Universidad de Ejemplo. Todos los derechos reservados.",
        10,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    // Descargar o enviar al backend
    if (action === "download") {
      doc.save("informe-estudiantes.pdf");
    } else if (action === "share") {
      const pdfBlob = doc.output("blob");
      await sendPdfToBackend(pdfBlob, email, actions);
    }
  };
};

const sendPdfToBackend = async (pdfBlob, email, actions) => {
  const formData = new FormData();
  formData.append("file", pdfBlob, "reporte.pdf");
  formData.append("correo", email);

  actions.sendPdfToBackend(formData);
};

export default exportToPDF;
