import { useEffect, useState, useCallback } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2 } from "lucide-react";
import SearchBar from "../inicio_sesion/search_bar";

const TablaCursa = ({ actions, store, actualizar }) => {
  const [Cursa, setCursa] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await actions.get_all_cursas();
      // console.log((data));
      setCursa(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    } finally {
      setLoading(false);
    }
  }, [actions]);

  useEffect(() => {
    fetchData();
  }, [fetchData, actualizar]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = Cursa.filter(
      (record) =>
        record.docente_nombre.toLowerCase().includes(searchTerm) ||
        record.asignatura_nombre
          .toString()
          .toLowerCase()
          .includes(searchTerm) ||
        record.ciclo_id.toString().toLowerCase().includes(searchTerm) ||
        record.paralelo.toString().toLowerCase().includes(searchTerm) ||
        record.dni.toString().toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  const handleDelete = (row) => {
    console.log("Eliminar cursa:", row);
  };

  const handleUpdate = (row) => {
    actions.setSelectedCursa(row);
    actions.handleModal();
  };

  const columns = [
    {
      name: "Nro",
      selector: (row) => filteredData.indexOf(row) + 1,
      sortable: true,
    },
    {
      name: "DNI",
      selector: (row) => `${row.dni}`,
      sortable: true,
    },
    {
      name: "Docente Encargado",
      selector: (row) => `${row.docente_nombre}`,
      sortable: true,
    },
    {
      name: "Asignatura",
      selector: (row) => `${row.asignatura_nombre}`,
      sortable: true,
    },
    {
      name: "Curso",
      selector: (row) => `${row.ciclo_id}°` + " - " + `${row.paralelo}`,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="">
          <button
            id="btn-delete"
            className="btn-ghost text-red-500 dark:text-green-400"
            onClick={() => handleDelete(row)}
          >
            <Trash2 size={20} />
          </button>
          <button
            id="btn-update"
            className="btn-ghost text-blue-500 dark:text-purple-400"
            onClick={() => handleUpdate(row)}
          >
            <Pencil size={20} />
          </button>
        </div>
      ),
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
    <div className="dark:bg-gray-800 dark:text-gray-200">
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

export default TablaCursa;
