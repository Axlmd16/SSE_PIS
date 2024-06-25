import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2 } from "lucide-react";
import SearchBar from "../inicio_sesion/search_bar";

const TablaCursa = ({ actions, store }) => {
  const [Cursa, setCursa] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await actions.get_all_cursas();
        console.log((data));
        setCursa(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [actions]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = Cursa.filter(
      (record) =>
        record.docente_nombre.toLowerCase().includes(searchTerm) ||
        record.asignatura_nombre.toString().toLowerCase().includes(searchTerm) 
    );
    setFilteredData(filtered);
  };

  const handleDelete = (row) => {
    console.log("Eliminar cursa:", row);
  };

  const handleUpdate = (row) => {
    actions.setSelectedEstudiante(row);
    actions.handleModal();
  };

  const columns = [
    {
      name: "Nro",
      selector: (row) => filteredData.indexOf(row) + 1,
      sortable: true,
    },
    {
      name: "Docente Encargado",
      selector: (row) => `${row.docente_nombre}`,
      sortable: true,
    },
    {
      name: "Curso",
      selector: (row) => `${row.asignatura_nombre} ${row.paralelo}`,
      sortable: true,
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

export default TablaCursa;
