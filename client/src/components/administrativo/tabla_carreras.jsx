import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2 } from "lucide-react";
import SearchBar from "../inicio_sesion/search_bar";

const TableCareer = ({ actions, store }) => {
  const [careers, setCareers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Llamada a la API para obtener las carreras
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await actions.get_all_careers();
        setCareers(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error al obtener las carreras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [actions]);

  // Función para filtrar las carreras
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = careers.filter(
      (record) =>
        record.nombre.toLowerCase().includes(searchTerm) ||
        record.duracion.toString().toLowerCase().includes(searchTerm) ||
        record.titulo_otorgado.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  // Función para manejar el borrado logico de una carrera
  const handleDelete = (row) => {
    // Implementar la función para manejar la eliminación de una carrera
    console.log("Eliminar carrera:", row);
  };

  // Función para manejar la actualización de una carrera
  const handleUpdate = (row) => {
    actions.setSelectedCareer(row);
    actions.handleModal();
  };

  // Columnas de la tabla
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
      name: "Duración",
      selector: (row) => row.duracion + " años",
      sortable: true,
    },
    {
      name: "Titulo",
      selector: (row) => row.titulo_otorgado,
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

  // Opciones de paginación
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
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

  // Renderizado de la tabla
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

export default TableCareer;
