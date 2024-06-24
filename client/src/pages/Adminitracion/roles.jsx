import { Plus } from "lucide-react";
import React, { useContext } from "react";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";
import { Context } from "../../store/context";
import TableRol from "../../components/administrativo/tabla_rol";
import Modal_Form from "../../components/modal_form";
import Form_Rol from "../../components/administrativo/form_rol";

function Roles() {
  const { store, actions } = useContext(Context);

  const breadcrumbItems = [
    {
      label: "Regresar",
      link: "/home-admin",
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
    actions.setSelectedRol(null);
    actions.handleModal();
  };

  return (
    <div>
      <Bread_Crumbs items={breadcrumbItems} />
      <div className="mt-10 font-poppins flex justify-between items-center">
        <h1 className="text-3xl my-5">Gestión de Roles de Usuario</h1>
        <button
          className="btn btn-active flex items-center gap-2"
          onClick={handleOpenModalForCreation}
        >
          <Plus size={20} />
          Nuevo Rol
        </button>
      </div>
      <hr
        className="
        border-gray-400
        my-4
      "
      />
      <TableRol actions={actions} />

      {store.modal && (
        <Modal_Form>
          <Form_Rol
            update={store.selectedRol ? true : false}
            rol={store.selectedRol}
          />
        </Modal_Form>
      )}
    </div>
  );
}

export default Roles;
