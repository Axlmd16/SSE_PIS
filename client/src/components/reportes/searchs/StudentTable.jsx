import jsPDF from "jspdf";
import "jspdf-autotable";
import { CircleHelp, Download, MailPlus } from "lucide-react";
import { React, useContext, useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Context } from "../../../store/context";
import CriteriaStatistics from "../estadisticas_criterios";
import Statistics from "../estadisticas_curso";
import Filtred_notes from "../filtred_notes";
import CriteriaChart from "../grafico_criterios";
import StudentChart from "../grafico_estudiantes";
import exportToPDF from "../export_pdf";

const MySwal = withReactContent(Swal);

const StudentTable = ({ subject, unit, course }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [performanceFilter, setPerformanceFilter] = useState("");
  const { actions, store } = useContext(Context);
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
          nro_de_matricula: item.nro_de_matricula,
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
          nro_de_matricula: item.nro_de_matricula,
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
        name: "Nro",
        selector: (row) => {
          return data.indexOf(row) + 1;
        },
      },
      {
        name: "Estudiante",
        selector: (row) => (row.nombre ? row.nombre : "N/A"),
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
        center: "true",
        right: "true",
        width: "150px",
        reorder: true,
      }));

      const unitColumn = {
        id: "nota_unidad",
        name: "Unidad",
        selector: (row) => row.nota_unidad,
        sortable: true,
        center: "true",
        right: "true",
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
        center: "true",
        right: "true",
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
        center: "true",
        right: "true",
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
    let filtered;
    if (performanceFilter === "Bajo rendimiento") {
      if (unit) {
        filtered = estudiantes.filter((record) => record.nota_unidad < 7);
      } else {
        filtered = estudiantes.filter((record) => {
          const sum = Object.keys(record)
            .filter((key) => key.startsWith("unidad_"))
            .reduce((sum, key) => sum + record[key], 0);
          const avg =
            sum /
            Object.keys(record).filter((key) => key.startsWith("unidad_"))
              .length;
          return avg < 7;
        });
      }
    } else if (performanceFilter === "Segunda matricula") {
      filtered = estudiantes.filter(
        (record) => record.nro_de_matricula === "SEGUNDA"
      );
    } else if (performanceFilter === "Tercera matricula") {
      filtered = estudiantes.filter(
        (record) => record.nro_de_matricula === "TERCERA"
      );
    } else {
      filtered = estudiantes;
    }
    setFilteredData(filtered);
  }, [performanceFilter, estudiantes, unit]);

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

  const conditionalRowStyles = [
    {
      when: (row) => {
        if (unit) {
          const criteriaKeys = Object.keys(row).filter(
            (key) => key.startsWith("criterio_") && !key.includes("nombre")
          );
          const sumCriteria = criteriaKeys.reduce(
            (acc, key) => acc + (row[key] !== undefined ? row[key] : 0),
            0
          );
          return sumCriteria < 7;
        } else {
          const notas = [];
          if (row.unidad_1 !== undefined) notas.push(row.unidad_1);
          if (row.unidad_2 !== undefined) notas.push(row.unidad_2);
          if (row.unidad_3 !== undefined) notas.push(row.unidad_3);
          if (row.unidad_4 !== undefined) notas.push(row.unidad_4);
          if (row.unidad_5 !== undefined) notas.push(row.unidad_5);
          const promedio =
            notas.reduce((acc, curr) => acc + curr, 0) / notas.length;
          return promedio < 7;
        }
      },
      style: {
        backgroundColor: "#FF9594",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  const handleExport = async () => {
    MySwal.fire({
      title: "¿Qué te gustaría hacer?",
      showDenyButton: true,
      icon: "question",
      showCancelButton: false,
      confirmButtonText: "Descargar",
      denyButtonText: "Compartir",
    }).then((result) => {
      if (result.isConfirmed) {
        exportToPDF(
          course,
          subject,
          unit,
          columns,
          filteredData,
          "download",
          null,
          actions
        );
      } else if (result.isDenied) {
        shareReport(course, subject, unit, columns, filteredData);
      }
    });
  };

  const shareReport = async () => {
    const { value: email } = await MySwal.fire({
      title: "Compartir informe",
      input: "email",
      inputLabel: "Email",
      inputPlaceholder: "Email del destinatario",
    });
    if (email) {
      exportToPDF(
        course,
        subject,
        unit,
        columns,
        filteredData,
        "share",
        email,
        actions
      );
      Swal.fire(`Informe enviado a ${email}`);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row md:items-center lg:justify-between mb-4">
        <div className="flex space-x-4">
          <button
            onClick={handleExport}
            className="btn-md btn btn-info float-end"
          >
            <Download className="" />
          </button>
          <div className="flex items-center justify-end">
            <Filtred_notes
              handleSearch={handleSearch}
              performanceFilter={performanceFilter}
              setPerformanceFilter={setPerformanceFilter}
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
        noDataComponent={
          <>
            <CircleHelp size={24} className="mx-2" />
            <h2>No se encontraron resultados</h2>
          </>
        }
        expandableRows
        expandableRowsComponent={({ data }) => (
          <ExpandedComponent data={data} unit={unit} />
        )}
        expandOnRowClicked
        conditionalRowStyles={conditionalRowStyles}
        theme="solarized"
      />
      <div>
        {filteredData && filteredData.length > 0 && (
          <div>
            {unit ? (
              <>
                <div ref={statsRef} className="mt-4">
                  <CriteriaStatistics data={filteredData} unit={unit} />
                </div>
              </>
            ) : (
              <>
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

const ExpandedComponent = ({ data, unit }) => {
  const chartRef = useRef();

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-screen-lg">
        <div className="p-4 bg-white shadow-md rounded-lg">
          {data &&
            (unit ? (
              <div ref={chartRef} className="">
                <CriteriaChart data={[data]} />
              </div>
            ) : (
              <div ref={chartRef}>
                <StudentChart data={[data]} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
