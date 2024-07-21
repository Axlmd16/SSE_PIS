import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Info, Search, Trash2 } from "lucide-react";
import SearchBar from "./search_bar";
import { useNavigate } from "react-router-dom"; // Usar useNavigate
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const TableUser = ({ actions }) => {
  const [users, setUsers] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook para navegar
  const [toggleStates, setToggleStates] = useState({});
  const [changes, setChanges] = useState(false);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await actions.get_all_users();
        const { data: usersData, personas: personData } = response;

        setUsers(usersData);
        const combined = combineUserData(usersData, personData);
        console.log("Combined data:", combined);
        setCombinedData(combined);
        setFilteredData(combined);
        initializeToggleStates(combined);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [actions]);

  const initializeToggleStates = (combinedData) => {
    const initialStates = combinedData.reduce((acc, user) => {
      acc[user.id] = user.estado === 1; // Asegúrate de que sea booleano
      return acc;
    }, {});
    setToggleStates(initialStates);
  };

  const combineUserData = (usersData, personData) => {
    return personData.map((person) => {
      const userInfo = usersData.find((user) => user.persona_id === person.id);
      return {
        ...person,
        ...userInfo,
        estado: userInfo.estado,
      };
    });
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = combinedData.filter(
      (record) =>
        record.usuario.toLowerCase().includes(searchTerm) ||
        record.primer_nombre.toLowerCase().includes(searchTerm) ||
        record.segundo_nombre.toLowerCase().includes(searchTerm) ||
        record.primer_apellido.toLowerCase().includes(searchTerm) ||
        record.segundo_apellido.toLowerCase().includes(searchTerm) ||
        record.dni.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  const handleDelete = (row) => {
    console.log("Deleting row:", row);
    // Aquí puedes implementar la lógica
  };

  const handleDetails = (row) => {
    const encodedUser = encodeURIComponent(JSON.stringify(row));
    navigate(`/users/detail/${row.id}?user=${encodedUser}`);
  };

  const handleCheckboxChange = (row) => {
    const updatedToggleStates = {
      ...toggleStates,
      [row.id]: !toggleStates[row.id],
    };
    setToggleStates(updatedToggleStates);

    // Verificar si hay cambios en los estados de los checkboxes de las cuentas de usuario
    const hasChanges = combinedData.some((cuenta) => {
      const initialToggleState = toggleStates[cuenta.id];
      return updatedToggleStates[cuenta.id] !== initialToggleState;
    });
    setChanges(hasChanges);
  };

  const handleSave = async () => {
    try {
      for (const cuenta of combinedData) {
        const initialToggleState = cuenta.estado === 1;
        const currentToggleState = toggleStates[cuenta.id];

        if (initialToggleState !== currentToggleState) {
          await actions.actualizar_cuenta(
            cuenta.id,
            currentToggleState ? 1 : 0
          );

          // Mostrar mensaje de éxito
          MySwal.fire({
            icon: "success",
            title: "Cuenta actualizada",
            text: `La cuenta de ${cuenta.usuario} ha sido actualizada correctamente`,
          });

          // Actualizar el estado de la cuenta en el listado
          const updatedData = combinedData.map((c) => {
            if (c.id === cuenta.id) {
              return {
                ...c,
                estado: currentToggleState ? 1 : 0,
              };
            }
            return c;
          });
          setCombinedData(updatedData);
          setFilteredData(updatedData);

          // Actualizar el estado de los cambios
          setChanges(false);

          // Actualizar el estado de los checkboxes
          setToggleStates((prev) => ({
            ...prev,
            [cuenta.id]: currentToggleState,
          }));

          // Actualizar el estado de los usuarios
          const updatedUsers = await actions.get_all_users();
          setUsers(updatedUsers);
        }
      }

      // Recargar las cuentas de usuario
      const updatedUsers = await actions.get_all_users();
      setUsers(updatedUsers);
      setChanges(false);
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error al actualizar cuenta",
        text: error.message,
      });
      console.error("Error al actualizar cuenta:", error);
    }
  };

  const columns = [
    {
      name: "Nro.",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Dni",
      selector: (row) => row.dni,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.primer_nombre + " " + row.segundo_nombre,
      sortable: true,
    },
    {
      name: "Apellido",
      selector: (row) => row.primer_apellido + " " + row.segundo_apellido,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.usuario,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => (
        <div className="">
          <input
            type="checkbox"
            className="toggle mx-2"
            checked={toggleStates[row.id] || false} // Asegúrate de que siempre tenga un booleano
            onChange={() => handleCheckboxChange(row)}
          />
        </div>
      ),
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="">
          <button
            id="btn-delete"
            className="btn-ghost text-black dark:text-white"
            onClick={() => handleDetails(row)}
          >
            <Info size={20} />
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
        color: "var(--text-primary)",
        backgroundColor: "var(--bg-table)",
      },
    },
    cells: {
      style: {
        color: "var(--text-secondary)",
        backgroundColor: "var(--bg-cell)",
      },
    },
    table: {
      style: {
        backgroundColor: "var(--bg-table)",
      },
    },
    pagination: {
      style: {
        backgroundColor: "var(--bg-table)",
      },
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <SearchBar onSearch={handleSearch} />
      <div className="overflow-x-auto rounded-md shadow-md">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="400px"
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          pointerOnHover
          customStyles={customStyles}
          progressPending={loading}
          noDataComponent="No hay datos disponibles"
        />
      </div>
      {changes && (
        <div className="w-full flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Guardar Cambios
          </button>
        </div>
      )}
    </div>
  );
};

export default TableUser;
