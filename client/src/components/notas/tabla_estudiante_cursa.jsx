import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2, Weight } from "lucide-react";
import SearchBar from "../inicio_sesion/search_bar";

const TablaEstudianteCursa = ({ actions, store, actualizar }) => {
  const [DocenteAsignaturas, setDocenteAsignaturas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await actions.get_all_estudiantes_cursas();
      // console.log((data));
      setDocenteAsignaturas(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error al obtener los estudiantes_cursa:", error);
    } finally {
      setLoading(false);
    }
  }, [actions]);

  useEffect(() => {
    fetchData();
  }, [fetchData, actualizar]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = DocenteAsignaturas.filter(
      (record) =>
        record.primer_apellido.toLowerCase().includes(searchTerm) ||
        record.segundo_nombre.toString().toLowerCase().includes(searchTerm) ||
        record.primer_apellido.toString().toLowerCase().includes(searchTerm) ||
        record.segundo_apellido.toString().toLowerCase().includes(searchTerm) ||
        record.segundo_apellido.toString().toLowerCase().includes(searchTerm) ||
        record.codigo_estudiante
          .toString()
          .toLowerCase()
          .includes(searchTerm) ||
        record.curso.toString().toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  const handleDelete = (row) => {
    console.log("Eliminar estudiante_cursa:", row);
  };

  const handleUpdate = (row) => {
    actions.setSelectedEstudianteCursa(row);
    actions.handleModal();
  };

  //* Columnas de la tabla
  const columns = [
    {
      name: "Nro",
      selector: (row) => filteredData.indexOf(row) + 1,
      sortable: true,
      Weight: "100px",
    },
    {
      name: "Estudiante",
      selector: (row) =>
        `${row.primer_nombre} ${row.segundo_nombre} ${row.primer_apellido} ${row.segundo_apellido} `,
      sortable: true,
      grow: 2,
    },
    {
      name: "Asignatura",
      selector: (row) => `${row.asignatura_nombre}`,
      sortable: true,
    },
    {
      name: "Ciclo",
      selector: (row) => `${row.ciclo_id}°` + " " + `${row.paralelo}`,
      sortable: true,
      center: "true",
    },

    {
      name: "Acciones",
      cell: (row) => (
        <div className="">
          <button
            id="btn-delete"
            className="btn-ghost mx-2"
            onClick={() => handleDelete(row)}
          >
            <Trash2 size={20} />
          </button>
          <button
            id="btn-update"
            className="btn-ghost"
            onClick={() => handleUpdate(row)}
          >
            <Pencil size={20} />
          </button>
        </div>
      ),
      center: "true",
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
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

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        selectableRows
        progressPending={loading}
        progressComponent={<h2>Cargando...</h2>}
        noDataComponent={<h2>No se encontraron resultados</h2>}
        paginationComponentOptions={paginationComponentOptions}
        customStyles={customStyles}
      />
    </div>
  );
};

export default TablaEstudianteCursa;
