import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import { GraduationCap } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../store/context";
import DataTable from "react-data-table-component";

const TablaEstudianteProyeccion = ({ subject, unit, course, onDataSelect, onDataSelectAll }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [performanceFilter, setPerformanceFilter] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const { actions } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      if (!subject || !course) {
        console.error("Datos insuficientes para realizar la llamada");
        return;
      }

      setLoading(true);
      try {
        let data;
        if (unit) {
          data = await actions.get_notas_criterio(unit.id, course.cursa_id);
          data = transformDataByCriteria(data);
        } else {
          data = await actions.get_notas_por_curso_estudiantes(
            course.paralelo,
            subject.asignatura_id,
            course.ciclo_id
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

    if (subject && (unit || course.cursa_id)) {
      fetchData();
    }
  }, [actions, subject, unit, course]);

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
      estudiantesMap[item.estudiante_id][
        `criterio_nombre_${item.criterio_id}`
      ] = item.criterio_nombre
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    });

    return Object.values(estudiantesMap);
  };

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

  const createColumns = (data) => {
    const baseColumns = [
      {
        name: "Estudiante",
        selector: (row) => (
          <div className="flex">
            <GraduationCap size={16} className="mr-2 text-green-700" />
            {row.nombre}
          </div>
        ),
        sortable: true,
        grow: 5,
      },
    ];

    if (unit) {
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
        center: true,
        right: true,
        width: "150px",
        reorder: true,
      }));

      const unitColumn = {
        id: "nota_unidad",
        name: "Unidad",
        selector: (row) => row.nota_unidad,
        sortable: true,
        center: true,
        right: true,
        width: "150px",
      };

      return [...baseColumns, ...criteriaColumns, unitColumn];
    } else {
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
        center: true,
        right: true,
        width: "150px",
        reorder: true,
      }));

      const Nota_final = {
        id: "nota_final",
        name: "Nota Final",
        selector: (row) => {
          const sum = Object.keys(row)
            .filter((key) => key.startsWith("unidad_"))
            .reduce((sum, key) => sum + row[key], 0);
          return (sum / sortedUnidades.length).toFixed(2);
        },
        sortable: true,
        center: true,
        right: true,
        width: "150px",
      };

      return [...baseColumns, ...unitColumns, Nota_final];
    }
  };

  const columns = createColumns(estudiantes);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = estudiantes.filter((record) =>
      record.nombre.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  const handleButtonClick = (row) => {
    // console.log("Información del estudiante:", row);
    onDataSelect(row)
  };

  const handleSelectAllStudents = () => {
    onDataSelectAll(filteredData); // Llama a onDataSelectAll con todos los estudiantes
  };


  const createColumnsWithButton = (data) => {
    const columnsWithButton = createColumns(data);
    columnsWithButton.push({
      name: "Acciones",
      cell: (row) => (
        <button
          onClick={() => handleButtonClick(row)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-green-700 dark:hover:bg-green-800 dark:border-none"
        >
          Ver Info
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    });
    return columnsWithButton;
  };

  const columnsWithButton = createColumnsWithButton(estudiantes);

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

    setFilteredData(sortedData.slice(0, parseInt(studentCount)));
  }, [performanceFilter, studentCount, estudiantes, unit]);

  const customStyles = {
    headCells: {
      style: {
        fontSize: "11px",
        fontWeight: "bold",
        textTransform: "uppercase",
        color: 'var(--text-primary)',
        backgroundColor: 'var(--bg-table)',
      },
    },
    cells: {
      style: {
        color: 'var(--text-secondary)',
        backgroundColor: 'var(--bg-cell)',
      },
    },
    table: {
      style: {
        backgroundColor: 'var(--bg-table)',
      },
    },
    pagination: {
      style: {
        backgroundColor: 'var(--bg-pagination)',
        color: 'var(--text-secondary)',
      },
    },
  };

  return (
    <div className="overflow-x-auto mt-4">
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleSelectAllStudents}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 dark:bg-green-700 dark:hover:bg-green-800 dark:border-none"
        >
          Seleccionar Todos los Estudiantes
        </button>
      </div>
      <DataTable
        columns={columnsWithButton}
        data={filteredData}
        progressPending={loading}
        customStyles={customStyles}
        pagination
        highlightOnHover
        pointerOnHover
        noHeader
        className="table-auto w-full"
      />
    </div>
  );
};

export default TablaEstudianteProyeccion;
