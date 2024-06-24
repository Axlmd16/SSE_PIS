import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Info, Search, Trash2 } from "lucide-react";
import SearchBar from "./search_bar";
import { useNavigate } from "react-router-dom"; // Usar useNavigate

const TableUser = ({ actions }) => {
  const [users, setUsers] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook para navegar

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await actions.get_all_users();
        const { data: usersData, personas: personData } = response;

        setUsers(usersData);
        const combined = combineUserData(usersData, personData);
        setCombinedData(combined);
        setFilteredData(combined);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [actions]);

  const combineUserData = (usersData, personData) => {
    return personData.map((person) => {
      const userInfo = usersData.find((user) => user.persona_id === person.id);
      return {
        ...person,
        ...userInfo,
        estado: userInfo.estado ? "Activo" : "Inactivo",
        id: usersData.indexOf(userInfo) + 1,
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
            checked={row.estado}
            disabled
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
            className="btn-ghost"
            onClick={() => handleDetails(row)}
          >
            <Info size={20} />
          </button>
          <button
            id="btn-delete"
            className="btn-ghost"
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
        highlightOnHover
        selectableRows
        progressPending={loading}
        progressComponent={<h2>Cargando...</h2>}
        noDataComponent={<h2>No se encontraron resultados</h2>}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        customStyles={customStyles}
      />
    </div>
  );
};

export default TableUser;
