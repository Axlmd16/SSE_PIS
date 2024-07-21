import { Plus } from "lucide-react";
import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import TablePermisos from "../../components/administrativo/tabla_permisos";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";
import { Context } from "../../store/context";
import TableRolsUser from "../../components/administrativo/tabla_roles_usuario";

function Roles_Usuarios() {
  const { store, actions } = useContext(Context);

  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user = JSON.parse(decodeURIComponent(queryParams.get("user")));

  const breadcrumbItems = [
    {
      link: "/users",
      icon: "M10 19l-7-7m0 0l7-7m-7 7h18",
    },
    {
      label: "Home",
      link: "/home-admin",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
    {
      label: "Usuarios",
      link: "/users",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
  ];

  return (
    <div className="p-10">
      <Bread_Crumbs items={breadcrumbItems} />
      <div className="mt-10 font-poppins">
        <h1 className="text-3xl my-5">Administración de Roles de Usuario</h1>
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <span className="flex items-center gap-2">
            <span className="font-semibold">Usuario:</span> {user.primer_nombre}{" "}
            {user.segundo_nombre} {user.primer_apellido} {user.segundo_apellido}
          </span>
          <span className="flex items-center gap-2">
            <span className="font-semibold">Detalles de la cuenta:</span>{" "}
            {user.usuario}
          </span>
          <span className="flex items-center gap-2">
            <span className="font-semibold">Rol actual:</span> ................
          </span>
        </div>
      </div>
      <br />
      <TableRolsUser actions={actions} store={store} id={user.persona_id} />
    </div>
  );
}

export default Roles_Usuarios;
