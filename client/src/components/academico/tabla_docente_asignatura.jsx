import { useEffect, useState, useCallback } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2 } from "lucide-react";
import SearchBar from "../inicio_sesion/search_bar";

const TablaDocenteAsignatura = ({ actions, store, actualizar }) => {
  const [DocenteAsignaturas, setDocenteAsignaturas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  //* Llamada a la API para obtener las Docentes Asignaturas
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
        const data = await actions.get_all_docentes_asignaturas();
        setDocenteAsignaturas(data);
        setFilteredData(data);
    } catch (error) {
        console.error("Error al obtener los docentes con asignatura:", error);
    } finally {
        setLoading(false);
    }
}, [actions]);

  useEffect(() => {
    fetchData();
  }, [fetchData, actualizar]);


  //* Función para filtrar las docente asignaturas
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = DocenteAsignaturas.filter(
      (record) =>
        record.docente_nombre.toLowerCase().includes(searchTerm) ||
        record.asignatura_nombre.toString().toLowerCase().includes(searchTerm) ||
        record.periodo_academico_fecha_inicio.toString().toLowerCase().includes(searchTerm) ||
        record.periodo_academico_fecha_fin.toString().toLowerCase().includes(searchTerm)

    );
    setFilteredData(filtered);
  };

  //* Función para manejar el borrado logico de una Docente Asignatura
  const handleDelete = (row) => {
    //* Implementar la función para manejar la eliminación de una Docente Asignatura
    console.log("Eliminar Docente Asignatura:", row);
  };

  //* Función para manejar la actualización de una Docente Asignatura
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
      name: "Nombres",
      selector: (row) => `${row.docente_nombre}`,
      sortable: true,
    },
    {
      name: "Asignatura",
      selector: (row) => `${row.asignatura_nombre}`,
      sortable: true,
    },
    {
      name: "Periodo Academico",
      selector: (row) => `${row.periodo_academico_fecha_fin} - ${row.periodo_academico_fecha_inicio}`,
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

export default TablaDocenteAsignatura;
