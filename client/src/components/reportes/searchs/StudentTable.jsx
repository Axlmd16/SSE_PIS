import { React, useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import { Download } from "lucide-react";
import { Context } from "../../../store/context";
import SearchBar from "../../inicio_sesion/search_bar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Filtred_notes from "../filtred_notes";

const StudentTable = ({ subject, unit, course }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [performanceFilter, setPerformanceFilter] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const { actions } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data;
        if (unit) {
          data = await actions.get_notas_criterio(unit.id, course.cursa_id_min);
          data = transformDataByCriteria(data);
        } else {
          data = await actions.get_notas_por_curso_estudiantes(
            course.cursa_id_min,
            subject.asignatura_id
          );
          data = transformDataByUnit(data);
        }
        setEstudiantes(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error al obtener los datos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [actions, subject, unit, course.cursa_id_min]);

  // Transformar los datos para agrupar por estudiante y criterios si hay unidad
  const transformDataByCriteria = (data) => {
    const estudiantesMap = {};

    data.forEach((item) => {
      if (!estudiantesMap[item.estudiante_id]) {
        estudiantesMap[item.estudiante_id] = {
          estudiante_id: item.estudiante_id,
          nombre: `${item.primer_nombre} ${item.segundo_nombre} ${item.primer_apellido} ${item.segundo_apellido}`,
          nota_unidad: item.nota_unidad,
        };
      }
      estudiantesMap[item.estudiante_id][`criterio_${item.criterio_id}`] =
        item.nota_criterio;
      // Almacenar nombre del criterio para las columnas
      estudiantesMap[item.estudiante_id][
        `criterio_nombre_${item.criterio_id}`
      ] = item.criterio_nombre
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    });

    return Object.values(estudiantesMap);
  };

  // Transformar los datos para agrupar por estudiante y unidades si no hay unidad seleccionada
  const transformDataByUnit = (data) => {
    const estudiantesMap = {};

    data.forEach((item) => {
      if (!estudiantesMap[item.persona_id]) {
        estudiantesMap[item.persona_id] = {
          persona_id: item.persona_id,
          nombre: `${item.primer_nombre} ${item.segundo_nombre} ${item.primer_apellido} ${item.segundo_apellido}`,
        };
      }
      estudiantesMap[item.persona_id][`unidad_${item.nro_unidad}`] =
        item.nota_unidad;
    });

    return Object.values(estudiantesMap);
  };

  // Crear columnas dinámicas
  const createColumns = (data) => {
    const baseColumns = [
      {
        name: "Estudiante",
        selector: (row) => row.nombre,
        sortable: true,
        grow: 3,
      },
    ];

    if (unit) {
      // Crear columnas basadas en criterios si hay unidad
      const criterios = new Map();

      data.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (key.startsWith("criterio_") && !key.includes("nombre")) {
            const criterioId = key.split("_")[1];
            const criterioNombre = item[`criterio_nombre_${criterioId}`];
            criterios.set(criterioId, criterioNombre);
          }
        });
      });

      const sortedCriterios = Array.from(criterios.entries()).sort(
        (a, b) => a[0] - b[0]
      );

      const criteriaColumns = sortedCriterios.map(([id, nombre]) => ({
        name: nombre,
        selector: (row) =>
          row[`criterio_${id}`] !== undefined ? row[`criterio_${id}`] : "N/A",
        sortable: true,
        center: "true",
        right: "true",
        with: "100px",
        reorder: true,
      }));

      // Añadir columna para la nota de unidad
      const unitColumn = {
        id: "nota_unidad",
        name: "Unidad",
        selector: (row) => row.nota_unidad,
        sortable: true,
        center: "true",
        right: "true",
        with: "100px",
      };

      return [...baseColumns, ...criteriaColumns, unitColumn];
    } else {
      // Crear columnas basadas en unidades si no hay unidad seleccionada
      const unidades = new Set();

      data.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (key.startsWith("unidad_")) {
            unidades.add(key);
          }
        });
      });

      const sortedUnidades = Array.from(unidades).sort(
        (a, b) => a.split("_")[1] - b.split("_")[1]
      );

      const unitColumns = sortedUnidades.map((unidad) => ({
        name: `Unidad ${unidad.split("_")[1]}`,
        selector: (row) => (row[unidad] !== undefined ? row[unidad] : "N/A"),
        sortable: true,
        center: "true",
        right: "true",
        with: "100px",
        reorder: true,
      }));

      return [...baseColumns, ...unitColumns];
    }
  };

  const columns = createColumns(estudiantes);

  // Función para filtrar los estudiantes
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = estudiantes.filter((record) =>
      record.nombre.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  // Filtrar datos basado en el rendimiento y la cantidad de estudiantes
  useEffect(() => {
    if (!performanceFilter || !studentCount) {
      setFilteredData(estudiantes);
      return;
    }

    let sortedData;
    if (unit) {
      sortedData = [...estudiantes].sort((a, b) =>
        performanceFilter === "Bajo rendimiento"
          ? a.nota_unidad - b.nota_unidad
          : b.nota_unidad - a.nota_unidad
      );
    } else {
      sortedData = [...estudiantes].sort((a, b) => {
        const aSum = Object.keys(a)
          .filter((key) => key.startsWith("unidad_"))
          .reduce((sum, key) => sum + a[key], 0);
        const bSum = Object.keys(b)
          .filter((key) => key.startsWith("unidad_"))
          .reduce((sum, key) => sum + b[key], 0);

        return performanceFilter === "Bajo rendimiento"
          ? aSum - bSum
          : bSum - aSum;
      });
    }

    setFilteredData(sortedData.slice(0, Number(studentCount)));
  }, [performanceFilter, studentCount, estudiantes, unit]);

  // Opciones de paginación
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
    selectAllRowsItemToolTip: "Seleccionar todas las filas",
  };

  // Estilos personalizados para la tabla
  const customStyles = {
    headCells: {
      style: {
        fontSize: "11px",
        fontWeight: "bold",
        textTransform: "uppercase",
      },
    },
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const logoUrl = "/img/unl.png";

    // Agregar logo con dimensiones ajustadas
    doc.addImage(logoUrl, "PNG", 10, 10, 60, 30); // Ancho de 50 y altura de 30

    // Título del informe
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Informe de Rendimiento de Estudiantes", 75, 20);

    // Información del curso, asignatura, y unidad
    doc.setFontSize(12);
    doc.text(`Curso: ${course.paralelo}`, 10, 50);
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

    // Crear tabla con los datos
    doc.autoTable({
      head: [columns.map((column) => column.name)],
      body: filteredData.map((row) =>
        columns.map((column) => column.selector(row))
      ),
      startY: 80,
    });

    // Guardar el archivo
    doc.save("informe-estudiantes.pdf");
  };

  return (
    <div className="p-3">
      <div className="flex mb-4">
        <Filtred_notes
          handleSearch={handleSearch}
          performanceFilter={performanceFilter}
          setPerformanceFilter={setPerformanceFilter}
          studentCount={studentCount}
          setStudentCount={setStudentCount}
        />
      </div>

      <DataTable
        title="Notas de Estudiantes"
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        responsive
        progressPending={loading}
        progressComponent={<progress className="progress w-56"></progress>}
        noDataComponent={<h2>No se encontraron resultados</h2>}
        paginationComponentOptions={paginationComponentOptions}
        customStyles={customStyles}
      />
      <div className="text-right mt-4">
        <button
          onClick={exportToPDF}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow-md"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar a PDF
        </button>
      </div>
    </div>
  );
};

export default StudentTable;
