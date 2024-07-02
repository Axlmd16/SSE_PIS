import { React, useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import { Download } from "lucide-react";
import { Context } from "../../../store/context";
import SearchBar from "../../inicio_sesion/search_bar";
import jsPDF from "jspdf";
import "jspdf-autotable";

const StudentTable = ({ subject, unit, course }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { actions } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data;
        if (unit) {
          data = await actions.get_notas_criterio(unit.id);
          data = transformDataByCriteria(data);
        } else {
          data = await actions.get_estudiantes_por_curso(course.id);
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
  }, [actions, subject, unit, course.id]);

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
      estudiantesMap[item.persona_id][`unidad_${item.unidad_id}`] =
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

      const criteriaColumns = Array.from(criterios.entries()).map(
        ([id, nombre]) => ({
          name: nombre,
          selector: (row) =>
            row[`criterio_${id}`] !== undefined ? row[`criterio_${id}`] : "N/A",
          sortable: true,
          center: "true",
          right: "true",
          with: "100px",
          reorder: true,
        })
      );

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

      const unitColumns = Array.from(unidades).map((unidad) => ({
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

  // Opciones de paginación
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
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
    <div>
      <SearchBar handleSearch={handleSearch} />
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        responsive
        selectableRows
        progressPending={loading}
        progressComponent={<h2>Cargando...</h2>}
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
