import { Plus } from "lucide-react";
import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import TablePermisos from "../../components/administrativo/tabla_permisos";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";
import { Context } from "../../store/context";

function Permisos() {
  const { store, actions } = useContext(Context);

  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = JSON.parse(decodeURIComponent(queryParams.get("role")));

  const breadcrumbItems = [
    {
      link: "/roles",
      icon: "M10 19l-7-7m0 0l7-7m-7 7h18",
    },
    {
      label: "Home",
      link: "/home-admin",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
    {
      label: "Roles de Usuario",
      link: "/roles",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
  ];

  const handleOpenModalForCreation = () => {
    // actions.setSelectedMesh(null);
    // actions.handleModal();
  };

  return (
    <div>
      <Bread_Crumbs items={breadcrumbItems} />
      <div className="mt-10 font-poppins flex justify-between items-center">
        <h1 className="text-3xl my-5">Permisos del Rol {role.nombre}</h1>
        <button
          className="btn btn-active flex items-center gap-2"
          onClick={handleOpenModalForCreation}
        >
          <Plus size={20} />
          Agregar Permiso
        </button>
      </div>
      <hr
        className="
        border-gray-400
        my-4
      "
      />
      <TablePermisos actions={actions} store={store} id={role.id} />
    </div>
  );
}

export default Permisos;
