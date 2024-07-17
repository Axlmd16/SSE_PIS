import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import { Download, GraduationCap } from "lucide-react";
import { React, useContext, useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Context } from "../../../store/context";
import Filtred_notes from "../filtred_notes";
import StudentChart from "../grafico_estudiantes";
import Statistics from "../estadisticas_curso";
import CriteriaStatistics from "../estadisticas_criterios";
import CriteriaChart from "../grafico_criterios";

const StudentTable = ({ subject, unit, course }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [performanceFilter, setPerformanceFilter] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const { actions } = useContext(Context);
  const chartRef = useRef(null);
  const statsRef = useRef(null);

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

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
    selectAllRowsItemToolTip: "Seleccionar todas las filas",
  };

  const customStyles = {
    headCells: {
      style: {
        fontSize: "11px",
        fontWeight: "bold",
        textTransform: "uppercase",
      },
    },
  };

  const exportToPDF = async () => {
    const doc = new jsPDF();
    const logoUrl = "/img/unl.png";

    doc.addImage(logoUrl, "PNG", 10, 10, 50, 15);

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Reporte de Rendimiento Académico", 80, 15);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Curso: ${course.paralelo}`, 10, 40);
    doc.text(`Asignatura: ${subject.nombre}`, 10, 45);

    if (unit) {
      doc.text(`Unidad: ${unit.nro_unidad}`, 10, 50);
    }

    const canvasChart = await html2canvas(chartRef.current);
    const canvasStats = await html2canvas(statsRef.current);
    const imgDataChart = canvasChart.toDataURL("image/png");
    const imgDataStats = canvasStats.toDataURL("image/png");

    doc.addImage(imgDataChart, "PNG", 10, 60, 180, 50);
    doc.addImage(imgDataStats, "PNG", 10, 120, 180, 50);

    doc.autoTable({
      startY: 145,
      columns: columns.map((col) => ({
        header: col.name,
        dataKey: col.selector,
      })),
      body: filteredData,
      styles: {
        fontSize: 12,
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: "#f3f4f6",
        textColor: "#000000",
        lineWidth: 0.1,
        lineColor: "#000000",
      },
    });

    doc.save("reporte_rendimiento.pdf");
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row md:items-center lg:justify-between mb-4">
        <div className="flex space-x-4">
          <button
            onClick={exportToPDF}
            className="btn-md btn btn-info float-end"
          >
            <Download className="" />
            PDF
          </button>
          <div className="flex items-center justify-end">
            <Filtred_notes
              setPerformanceFilter={setPerformanceFilter}
              setStudentCount={setStudentCount}
              handleSearch={handleSearch}
            />
          </div>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        progressPending={loading}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        customStyles={customStyles}
        dense
      />
      <div>
        {filteredData && filteredData.length > 0 && (
          <div>
            {unit ? (
              <>
                <div ref={chartRef}>
                  <CriteriaChart data={filteredData} />
                </div>
                <div ref={statsRef} className="mt-4">
                  <CriteriaStatistics data={filteredData} unit={unit} />
                </div>
              </>
            ) : (
              <>
                <div ref={chartRef}>
                  <StudentChart data={filteredData} />
                </div>
                <div ref={statsRef} className="mt-4">
                  <Statistics data={filteredData} unit={unit} />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTable;
