import { React, useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const Notas_Unidad = ({ actions, unidad_id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [criteria, setCriteria] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await actions.get_notas_criterio(unidad_id);
        const groupedData = groupDataByStudent(responseData);
        setData(groupedData);
        console.log("Data:", groupedData);
        setCriteria(extractCriteria(responseData));
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [actions, unidad_id]);

  const groupDataByStudent = (data) => {
    const grouped = data.reduce((acc, curr) => {
      const {
        estudiante_id,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        criterio_nombre,
        nota_criterio,
        porcentaje,
      } = curr;
      if (!acc[estudiante_id]) {
        acc[estudiante_id] = {
          id: estudiante_id,
          name: `${primer_nombre} ${segundo_nombre} ${primer_apellido} ${segundo_apellido}`,
          criteria: {},
        };
      }
      acc[estudiante_id].criteria[criterio_nombre] = {
        nota_criterio,
        porcentaje,
      };
      return acc;
    }, {});

    return Object.values(grouped);
  };

  const extractCriteria = (data) => {
    const criteriaSet = new Map();
    data.forEach((item) => {
      if (!criteriaSet.has(item.criterio_nombre)) {
        criteriaSet.set(item.criterio_nombre, item.porcentaje);
      }
    });
    return Array.from(criteriaSet.entries());
  };

  const handleInputChange = (id, criterion, value) => {
    const updatedData = data.map((student) => {
      if (student.id === id) {
        return {
          ...student,
          criteria: {
            ...student.criteria,
            [criterion]: {
              ...student.criteria[criterion],
              nota_criterio: value,
            },
          },
        };
      }
      return student;
    });
    setData(updatedData);
  };

  const calculateNotaUnidad = (student) => {
    const criteriaValues = Object.values(student.criteria);
    const total = criteriaValues.reduce(
      (acc, curr) => acc + parseFloat(curr.nota_criterio || 0),
      0
    );
    return total.toFixed(2);
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
      width: "500px",
    },
    ...criteria.map(([criterion, porcentaje]) => ({
      name: criterion,
      selector: (row) => (
        <input
          type="number"
          min="0"
          max={porcentaje}
          step="0.1"
          className="border p-1"
          value={row.criteria[criterion]?.nota_criterio || 0}
          onChange={(e) =>
            handleInputChange(row.id, criterion, parseFloat(e.target.value))
          }
        />
      ),
      reorder: true,
      //   right: "true",
      //   center: "true",
      //   with: "100px",
    })),
    {
      name: "Nota Unidad",
      selector: (row) => calculateNotaUnidad(row),
      sortable: true,
      right: "true",
      center: "true",
      with: "100px",
      reorder: true,
    },
  ];

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

  return (
    <div className="p-4">
      <DataTable
        title="Notas de Estudiantes"
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        striped
        progressPending={loading}
        paginationComponentOptions={paginationComponentOptions}
        customStyles={customStyles}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => console.log("Data saved:", data)}
      >
        Guardar
      </button>
    </div>
  );
};

export default Notas_Unidad;
