import React from "react";
import N_form_Asignatura from "./n_form_asignatura";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";

function N_asignatura() {
  const breadcrumbItems = [
    {
      label: "Home",
      link: "/home-admin",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
    {
      label: "Asignaturas",
      link: "/subjects",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
    {
      label: "Nueva Asignatura",
      link: "/new",
      icon: "M10 4v12m-6-6h12",
    },
  ];

  return (
    <div className="font-poppins">
      <Bread_Crumbs items={breadcrumbItems} />
      <div className="mt-6 flex justify-center">
        <N_form_Asignatura />
      </div>
    </div>
  );
}

export default N_asignatura;
