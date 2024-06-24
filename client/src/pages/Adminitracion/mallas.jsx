import { Plus } from "lucide-react";
import React, { useContext } from "react";
import Form_Malla from "../../components/administrativo/form_malla";
import TableMeshes from "../../components/administrativo/tabla_mallas";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";
import Modal_Form from "../../components/modal_form";
import { Context } from "../../store/context";

function Mallas() {
  const { store, actions } = useContext(Context);
  const breadcrumbItems = [
    {
      label: "Home",
      link: "/home",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
    {
      label: "Mallas Académicas",
      link: "/meshes",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
  ];

  const handleOpenModalForCreation = () => {
    actions.setSelectedMesh(null);
    actions.handleModal();
  };

  return (
    <div>
      <Bread_Crumbs items={breadcrumbItems} />
      <div className="mt-10 font-poppins flex justify-between items-center">
        <h1 className="text-3xl my-5">Modulo de Mallas Académicas</h1>
        <button
          className="btn btn-active flex items-center gap-2"
          onClick={handleOpenModalForCreation}
        >
          <Plus size={20} />
          Agregar Malla Académica
        </button>
      </div>
      <TableMeshes actions={actions} store={store} />

      {store.modal && (
        <Modal_Form>
          <Form_Malla
            update={store.selectedMesh ? true : false}
            mesh={store.selectedMesh}
          />
        </Modal_Form>
      )}
    </div>
  );
}

export default Mallas;
