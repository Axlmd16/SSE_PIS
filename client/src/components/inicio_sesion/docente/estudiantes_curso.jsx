import { Edit2, MailPlus, Trash2 } from "lucide-react";
import { React, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SearchBar from "../search_bar";
import { useParams } from "react-router-dom";

function Estudiantes_Curso({ actions, store }) {
  // Constantes para el manejo de los estados
  const { curso_id } = useParams();
  const [estudiantes, setEstudiantes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Llamada a la API para obtener las mallas
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await actions.get_estudiantes_por_curso(curso_id);
        setEstudiantes(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error al obtener los estudiantes por curso:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [actions]);

  // Función para filtrar los estudiantes
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = estudiantes.filter((record) => {
      return (
        record.primer_nombre.toLowerCase().includes(searchTerm) ||
        record.segundo_nombre.toLowerCase().includes(searchTerm) ||
        record.primer_apellido.toLowerCase().includes(searchTerm) ||
        record.segundo_apellido.toLowerCase().includes(searchTerm) ||
        record.codigo_estudiante.toLowerCase().includes(searchTerm) ||
        record.dni.toLowerCase().includes(searchTerm) ||
        record.nro_de_matricula.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredData(filtered);
  };

  //   Función para enviar un correo
  const handleEmail = (row) => {
    console.log(row);
  };

  // Columnas de la tabla
  const columns = [
    {
      name: "Nro.",
      selector: (row) => filteredData.indexOf(row) + 1,
      sortable: true,
      width: "150px",
    },
    {
      name: "Cod. Estudiante",
      selector: (row) => row.codigo_estudiante,
      sortable: true,
    },
    {
      name: "DNI",
      selector: (row) => row.dni,
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
      name: "Matricula",
      selector: (row) => row.nro_de_matricula,
      sortable: true,
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
    <div className="dark:bg-gray-800 h-screen">
      <div className="flex justify-between items-center w-full mb-4">
        <span className="text-2xl m-4 font-bold dark:text-cyan-400">Estudiantes del Curso</span>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-md mt-4 dark:bg-gray-600">
          <div className="p-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Estudiantes_Curso;
