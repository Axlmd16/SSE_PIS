import { Plus } from "lucide-react";
import { useContext } from "react";
import Form_Asignatura from "../../components/administrativo/form_asignatura";
import TableSubjects from "../../components/administrativo/tabla_asignaturas";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";
import Modal_Form from "../../components/modal_form";
import { Context } from "../../store/context";

function Asignaturas() {
  const { store, actions } = useContext(Context);
  const breadcrumbItems = [
    {
      label: "Home",
      link: "/home",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
    {
      label: "Asignaturas",
      link: "/subjects",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
  ];

  const handleOpenModalForCreation = () => {
    actions.setSelectedSubject(null);
    actions.handleModal();
  };

  return (
    <div>
      <Bread_Crumbs items={breadcrumbItems} />
      <div className="mt-10 font-poppins flex justify-between items-center">
        <h1 className="text-3xl my-5">Modulo de Asignaturas</h1>
        <button
          className="btn btn-active flex items-center gap-2"
          onClick={handleOpenModalForCreation}
        >
          <Plus size={20} />
          Agregar Asignatura
        </button>
        {/* <a href="/new" className="btn btn-active flex items-center gap-2">
          <Plus size={20} />
          Agregar Asignatura 2
        </a> */}
      </div>
      <TableSubjects actions={actions} store={store} />

      {store.modal && (
        <Modal_Form>
          <Form_Asignatura
            update={store.selectedSubject ? true : false}
            subject={store.selectedSubject}
          />
        </Modal_Form>
      )}
    </div>
  );
}

export default Asignaturas;
