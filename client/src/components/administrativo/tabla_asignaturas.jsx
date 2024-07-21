import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2 } from "lucide-react";
import SearchBar from "../inicio_sesion/search_bar";

const TableSubjects = ({ actions, store }) => {
  const [subjects, setSubjects] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await actions.get_all_subjects();
        setSubjects(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error al obtener las asignaturas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [actions]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = subjects.filter(
      (record) =>
        record.nombre.toLowerCase().includes(searchTerm) ||
        record.descripcion.toLowerCase().includes(searchTerm) ||
        record.total_horas.toString().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  const handleDelete = (row) => {
    console.log("Eliminar asignatura:", row);
  };

  const handleUpdate = (row) => {
    actions.setSelectedSubject(row);
    actions.handleModal();
  };

  const columns = [
    {
      name: "Nro.",
      selector: (row) => filteredData.indexOf(row) + 1,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Horas Totales",
      selector: (row) => row.total_horas,
      sortable: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex space-x-2">
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
        color: 'var(--text-primary)', // Color del texto de las cabeceras en modo oscuro
        backgroundColor: 'var(--bg-table)', // Fondo de la tabla en modo oscuro
      },
    },
    cells: {
      style: {
        color: 'var(--text-secondary)', // Color del texto en las celdas en modo oscuro
        backgroundColor: 'var(--bg-cell)', // Fondo de las celdas en modo oscuro
      },
    },
    table: {
      style: {
        backgroundColor: 'var(--bg-table)', // Fondo general de la tabla
      },
    },
    pagination: {
      style: {
        backgroundColor: 'var(--bg-pagination)', // Fondo de la paginación en modo oscuro
        color: 'var(--text-secondary)', // Color del texto de la paginación en modo oscuro
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

export default TableSubjects;
