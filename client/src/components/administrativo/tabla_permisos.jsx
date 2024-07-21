import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SearchBar from "../inicio_sesion/search_bar";

const TablePermisos = ({ actions, store, id }) => {
  const [permisos, setPermisos] = useState([]);
  const [permisosRol, setPermisosRol] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleStates, setToggleStates] = useState({});
  const [changes, setChanges] = useState(false);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await actions.get_all_permissions();
        const dataRol = await actions.permissions_by_rol(id);
        setPermisos(data);
        setPermisosRol(dataRol);
        setFilteredData(data);
        initializeToggleStates(data, dataRol);
      } catch (error) {
        console.error("Error al obtener los permisos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [actions, id]);

  const initializeToggleStates = (permisos, permisosRol) => {
    const initialStates = permisos.reduce((acc, permiso) => {
      acc[permiso.id] = permisosRol.some(
        (pRol) => pRol.permiso_id === permiso.id
      );
      return acc;
    }, {});
    setToggleStates(initialStates);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = permisos.filter(
      (record) =>
        record.nombre.toLowerCase().includes(searchTerm) ||
        record.descripcion.toString().toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  const handleDelete = (row) => {
    console.log("Eliminar permiso:", row);
  };

  const handleUpdate = (row) => {
    // Implementar actualización
  };

  const handleCheckboxChange = (row) => {
    const updatedToggleStates = {
      ...toggleStates,
      [row.id]: !toggleStates[row.id],
    };
    setToggleStates(updatedToggleStates);

    // Verifica si hay algún cambio con respecto a los permisos originales
    const hasChanges = permisos.some((permiso) => {
      const initialToggleState = permisosRol.some(
        (pRol) => pRol.permiso_id === permiso.id
      );
      return updatedToggleStates[permiso.id] !== initialToggleState;
    });
    setChanges(hasChanges);
  };

  const handleSave = async () => {
    try {
      // Recorre los permisos para identificar cambios
      for (const permiso of permisos) {
        const initialToggleState = permisosRol.some(
          (pRol) => pRol.permiso_id === permiso.id
        );
        const currentToggleState = toggleStates[permiso.id];

        if (initialToggleState !== currentToggleState) {
          if (currentToggleState) {
            await actions.add_permission_to_rol(id, permiso.id);
            MySwal.fire({
              icon: "success",
              title: "Permiso registrado con éxito!",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            await actions.remove_permission_from_rol(id, permiso.id);
            MySwal.fire({
              icon: "success",
              title: "Permiso eliminado con éxito!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      }

      // Reset the state after saving
      const updatedPermissionsRol = await actions.permissions_by_rol(id);
      setPermisosRol(updatedPermissionsRol);
      setChanges(false);
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error al guardar los cambios",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error al guardar los cambios:", error);
    }
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
      name: "Descripción",
      selector: (row) => row.descripcion,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="">
          <input
            type="checkbox"
            className="toggle mx-2"
            checked={toggleStates[row.id] || false}
            onChange={() => handleCheckboxChange(row)}
          />
          <button
            id="btn-update"
            className="btn-ghost text-blue-500 dark:text-purple-400"
            onClick={() => handleUpdate(row)}
            >
            <Pencil size={20} />
          </button>
          <button
            id="btn-delete"
            className="btn-ghost text-red-500 dark:text-green-400"
            onClick={() => handleDelete(row)}
          >
            <Trash2 size={20} />
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
      <div className="flex justify-end mt-4">
        <button
          className={`btn dark:bg-green-700 dark:hover:bg-green-800 dark:text-white dark:border-none ${changes ? "btn-primary" : "btn-disabled"}`}
          onClick={handleSave}
          disabled={!changes}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default TablePermisos;
