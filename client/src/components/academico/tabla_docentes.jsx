import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2 } from "lucide-react";
import SearchBar from "../inicio_sesion/search_bar";

const TablaDocentes = ({ actions, store }) => {
  const [Estudiantes, setEstudiantes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  //* Llamada a la API para obtener las Docentes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await actions.get_all_docentes();
        setEstudiantes(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error al obtener las Docentes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [actions]);

  //* Función para filtrar las Docentes
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = Estudiantes.filter(
      (record) =>
        record.primer_nombre.toLowerCase().includes(searchTerm) ||
        record.segundo_nombre.toLowerCase().includes(searchTerm) ||
        record.primer_apellido.toLowerCase().includes(searchTerm) ||
        record.segundo_apellido.toLowerCase().includes(searchTerm) ||
        record.dni.toLowerCase().includes(searchTerm) ||
        record.titulo.toLowerCase().includes(searchTerm) ||
        record.cubiculo.toLowerCase().includes(searchTerm) 
    );
    setFilteredData(filtered);
  };

  //* Función para manejar el borrado logico de una Docente
  const handleDelete = (row) => {
    //* Implementar la función para manejar la eliminación de una Docente
    console.log("Eliminar Docente:", row);
  };

  //* Función para manejar la actualización de una Docente
  const handleUpdate = (row) => {
    actions.setSelectedDocente(row);
    actions.handleModal();
  };

  //* Columnas de la tabla
  const columns = [
    {
      name: "Nro",
      selector: (row) => filteredData.indexOf(row) + 1,
      sortable: true,
    },
    {
      name: "Nombres",
      selector: (row) => `${row.primer_nombre} ${row.segundo_nombre}`,
      sortable: true,
    },
    {
      name: "Apellidos",
      selector: (row) => `${row.primer_apellido} ${row.segundo_apellido}`,
      sortable: true,
    },
    {
      name: "Cedula",
      selector: (row) => `${row.dni}`,
      sortable: true,
    },
    {
      name: "Titulo",
      selector: (row) => `${row.titulo}`,
      sortable: true,
    },
    {
      name: "Cubiculo",
      selector: (row) => `${row.cubiculo}`,
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

  //* Opciones de paginación
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  //* Estilos personalizados para la tabla
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

  //* Renderizado de la tabla
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

export default TablaDocentes;
