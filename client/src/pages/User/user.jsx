import React, { act } from "react";
import TableUser from "../../components/inicio_sesion/tableUser";
import { Context } from "../../store/context";
import { useContext } from "react";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";

function User() {
  const { store, actions } = useContext(Context);
  const breadcrumbItems = [
    {
      label: "Home",
      link: "/home",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
    {
      label: "Usuarios",
      link: "/users",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
  ];
  return (
    <div>
      <Bread_Crumbs items={breadcrumbItems} />
      <div className="text-3xl mt-10 font-poppins">Cuentas de Usuarios</div>
      <div className="mt-12">
        <TableUser actions={actions} />
      </div>
    </div>
  );
}

export default User;
