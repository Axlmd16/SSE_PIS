import { CircleHelp, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SearchBar from "../inicio_sesion/search_bar";

const TableRolsUser = ({ actions, store, id }) => {
  const [roles, setRoles] = useState([]);
  const [rolesUser, setRolesUser] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleStates, setToggleStates] = useState({});
  const [changes, setChanges] = useState(false);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await actions.get_all_rols();
        const dataRol = await actions.roles_by_user(id);
        setRoles(data);
        setRolesUser(dataRol);
        setFilteredData(data);
        initializeToggleStates(data, dataRol);
      } catch (error) {
        console.error("Error al obtener los roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [actions, id]);

  const initializeToggleStates = (roles, rolesUser) => {
    const initialStates = roles.reduce((acc, rol) => {
      acc[rol.id] = rolesUser.some((rUser) => rUser.rol_id === rol.id);
      return acc;
    }, {});
    setToggleStates(initialStates);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = roles.filter(
      (record) =>
        record.nombre.toLowerCase().includes(searchTerm) ||
        record.descripcion.toString().toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  const handleDelete = (row) => {
    console.log("Eliminar rol:", row);
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

    // Verifica si hay algún cambio con respecto a los roles originales
    const hasChanges = roles.some((rol) => {
      const initialToggleState = rolesUser.some(
        (rUser) => rUser.rol_id === rol.id
      );
      return updatedToggleStates[rol.id] !== initialToggleState;
    });
    setChanges(hasChanges);
  };

  const handleSave = async () => {
    try {
      // Recorre los roles para identificar cambios
      for (const rol of roles) {
        const initialToggleState = rolesUser.some(
          (rUser) => rUser.rol_id === rol.id
        );
        const currentToggleState = toggleStates[rol.id];

        if (initialToggleState !== currentToggleState) {
          if (currentToggleState) {
            await actions.add_rol_to_persona(id, rol.id);
            MySwal.fire({
              icon: "success",
              title: "Rol asignado con éxito!",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            await actions.remove_rol_from_persona(id, rol.id);
            MySwal.fire({
              icon: "success",
              title: "Rol removido con éxito!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      }

      // Resetea el estado después de guardar
      const updatedRolesUser = await actions.roles_by_user(id);
      setRolesUser(updatedRolesUser);
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
        noDataComponent={
          <>
            <CircleHelp size={24} className="mx-2" />
            <h2>No se encontraron resultados</h2>
          </>
        }
        paginationComponentOptions={paginationComponentOptions}
        customStyles={customStyles}
      />
      <div className="flex justify-end mt-4">
        <button
          className={`btn ${changes ? "btn-primary" : "btn-disabled"}`}
          onClick={handleSave}
          disabled={!changes}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default TableRolsUser;
