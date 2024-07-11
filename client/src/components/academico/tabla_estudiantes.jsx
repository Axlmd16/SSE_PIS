import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2 } from "lucide-react";
import SearchBar from "../inicio_sesion/search_bar";

const TableEstudiante = ({ actions, store }) => {
  const [Estudiantes, setEstudiantes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  //* Llamada a la API para obtener las estudiantes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await actions.get_all_estudiantes();
        setEstudiantes(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error al obtener los estudiantes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [actions]);

  //* Función para filtrar las estudiantes
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = Estudiantes.filter(
      (record) =>
        record.primer_nombre.toLowerCase().includes(searchTerm) ||
        record.segundo_nombre.toString().toLowerCase().includes(searchTerm) ||
        record.primer_apellido.toLowerCase().includes(searchTerm) ||
        record.segundo_apellido.toLowerCase().includes(searchTerm) ||
        record.codigo_estudiante.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  //* Función para manejar el borrado logico de una estudiante
  const handleDelete = (row) => {
    //* Implementar la función para manejar la eliminación de una estudiante
    console.log("Eliminar estudiante:", row);
  };

  //* Función para manejar la actualización de una estudiante
  const handleUpdate = (row) => {
    actions.setSelectedEstudiante(row);
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
      name: "DNI",
      selector: (row) => `${row.dni}`,
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
      name: "Codigo_Estudiante",
      selector: (row) => `${row.codigo_estudiante}`,
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
      },
    },
  };

  //* Renderizado de la tabla
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

export default TableEstudiante;
