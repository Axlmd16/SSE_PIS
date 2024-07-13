import { ClipboardX, Edit2, SaveAll } from "lucide-react";
import { React, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Notas_Unidad = ({ actions, unidad_id, curso_id }) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [criteria, setCriteria] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await actions.get_notas_criterio(
          unidad_id,
          curso_id
        );
        const groupedData = groupDataByStudent(responseData);
        setData(groupedData);
        setOriginalData(groupedData);
        setCriteria(extractCriteria(responseData));
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [actions, unidad_id, curso_id]);

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
        criterio_id,
        nota_criterio_id,
        unidad_estudiante_id,
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
        criterio_id,
        nota_criterio_id,
        unidad_estudiante_id,
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
    setIsSaveDisabled(false);
  };

  const handleBlur = (id, criterion, value, max) => {
    if (value > max) {
      const updatedData = data.map((student) => {
        if (student.id === id) {
          return {
            ...student,
            criteria: {
              ...student.criteria,
              [criterion]: {
                ...student.criteria[criterion],
                nota_criterio: max,
              },
            },
          };
        }
        return student;
      });
      setData(updatedData);
      MySwal.fire({
        icon: "warning",
        title: "Valor máximo excedido",
        text: `El valor no puede ser mayor que ${max}.`,
      });
    }
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
          className={`border p-1 ${isEditing ? "bg-gray-200" : "bg-white"}`}
          value={row.criteria[criterion]?.nota_criterio || ""}
          onChange={(e) =>
            handleInputChange(row.id, criterion, parseFloat(e.target.value))
          }
          onBlur={(e) =>
            handleBlur(
              row.id,
              criterion,
              parseFloat(e.target.value),
              porcentaje
            )
          }
          disabled={!isEditing}
        />
      ),
      reorder: true,
    })),
    {
      name: "Nota Unidad",
      selector: (row) => calculateNotaUnidad(row),
      sortable: true,
      center: "true",
      right: "true",
      reorder: true,
    },
  ];

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

  const handleSave = async (data) => {
    const promises = data.map(async (student) => {
      const { id, criteria } = student;
      const criteriaPromises = Object.entries(criteria).map(
        async ([
          criterion,
          {
            nota_criterio,
            criterio_id,
            nota_criterio_id,
            unidad_estudiante_id,
          },
        ]) => {
          try {
            const payload = {
              unidad_estudiante_id: unidad_estudiante_id,
              criterio_id: criterio_id,
              nota_criterio: nota_criterio,
            };
            await actions.update_notas_criterio(nota_criterio_id, payload);
            MySwal.fire({
              icon: "success",
              title: "Notas guardadas correctamente",
              showConfirmButton: false,
              timer: 1500,
            });
          } catch (error) {
            MySwal.fire({
              icon: "error",
              title: "Error al guardar las notas",
              showConfirmButton: false,
              timer: 1500,
            });
            actions.handleModal();
            console.error("Error al guardar la nota del criterio", error);
          }
        }
      );
      await Promise.all(criteriaPromises);
    });
    await Promise.all(promises);
    setIsEditing(false);
    setIsSaveDisabled(true);
    setOriginalData(data);
  };

  const handleCancel = () => {
    setData(originalData);
    setIsEditing(false);
  };

  return (
    <div className="p-4 my-2">
      <button
        aria-label="Editar"
        className={`float-right btn btn-md ${
          isEditing ? "btn-danger" : "btn-accent"
        } mb-5`}
        onClick={() => {
          if (!isEditing) {
            setOriginalData(JSON.parse(JSON.stringify(data)));
          }
          setIsEditing(!isEditing);
        }}
      >
        <Edit2 size={16} />
      </button>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        striped
        progressPending={loading}
        paginationComponentOptions={paginationComponentOptions}
        customStyles={customStyles}
      />
      {isEditing && (
        <div className="mt-8">
          <button
            className={`btn btn-md btn-success float-right ${
              isSaveDisabled ? "opacity-50" : ""
            }`}
            onClick={() => handleSave(data)}
            disabled={isSaveDisabled}
          >
            <SaveAll size={22} />
          </button>
          <button
            className="btn btn-md btn-warning float-right mr-2"
            onClick={handleCancel}
          >
            <ClipboardX size={22} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Notas_Unidad;
