import { Info, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SearchBar from "../inicio_sesion/search_bar";
import { useNavigate } from "react-router-dom"; // Usar useNavigate

const TableRol = ({ actions }) => {
  const [rols, setRols] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook para navegar

  // Llamada a la API para obtener los roles
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await actions.get_all_rols();
        setRols(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error al obtener los roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [actions]);

  // Función para filtrar los roles
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = rols.filter(
      (record) =>
        record.nombre.toLowerCase().includes(searchTerm) ||
        record.descripcion.toString().toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  // Función para manejar el borrado logico de un rol
  const handleDelete = (row) => {
    console.log("Eliminar rol:", row);
  };

  // Función para manejar la actualización de un rol
  const handleUpdate = (row) => {
    actions.setSelectedRol(row);
    actions.handleModal();
  };

  //* Función para manejar los detalles de un rol
  const handleDetails = (row) => {
    const encodedRole = encodeURIComponent(JSON.stringify(row));
    navigate(`/roles/permissions/${row.id}?role=${encodedRole}`);
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
      name: "Descripción",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="">
          <button
            id="btn-details"
            className="btn-ghost mx-2"
            onClick={() => handleDetails(row)}
          >
            <Info size={20} />
          </button>
          <button
            id="btn-update"
            className="btn-ghost"
            onClick={() => handleUpdate(row)}
          >
            <Pencil size={20} />
          </button>
          <button
            id="btn-delete"
            className="btn-ghost mx-2"
            onClick={() => handleDelete(row)}
          >
            <Trash2 size={20} />
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

export default TableRol;
