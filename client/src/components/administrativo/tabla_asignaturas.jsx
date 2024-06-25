import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2 } from "lucide-react";
import SearchBar from "../inicio_sesion/search_bar";

const TableSubjects = ({ actions, store }) => {
  const [subjects, setSubjects] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Llamada a la API para obtener las mallas
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

  // Función para filtrar las asignaturas
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

  // Función para manejar el borrado logico de una asignatura
  const handleDelete = (row) => {
    // Implementar la función para manejar la eliminación de una asignatura
    console.log("Eliminar asignatura:", row);
  };

  // Función para manejar la actualización de una asignatura
  const handleUpdate = (row) => {
    actions.setSelectedSubject(row);
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

export default TableSubjects;
