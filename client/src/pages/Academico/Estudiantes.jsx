import { useContext } from "react";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";
import { Context } from "../../store/context";
import Modal_Form from "../../components/modal_form";
import { Plus } from "lucide-react";
import Form_Estudiante from "../../components/academico/form_estudiante";
import TableEstudiante from "../../components/academico/tabla_estudiantes";

function Estudiantes() {
  const { store, actions } = useContext(Context);
  const breadcrumbItems = [
    {
      label: "Home",
      link: "/home-admin",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
    {
      label: "Estudiantes",
      link: "/estudiantes",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
  ];

  const handleOpenModalForCreation = () => {
    actions.setSelectedEstudiante(null);
    actions.handleModal();
  };

  return (
    <div className="bg-white dark:bg-gray-800 h-screen p-9">
      <Bread_Crumbs items={breadcrumbItems} />
      <div className="mt-10 font-poppins flex justify-between items-center">
        <h1 className="text-3xl my-5 dark:text-white">Modulo de Estudiantes</h1>
        <button
          className="btn btn-active flex items-center gap-2 dark:bg-green-700 dark:hover:bg-green-800 dark:text-white dark:border-none" 
          onClick={handleOpenModalForCreation}
        >
          <Plus size={20} />
          Agregar Estudiante
        </button>
      </div>
      <TableEstudiante actions={actions} store={store} />

      {store.modal && (
        <Modal_Form>
          <Form_Estudiante
            update={store.selectedEstudiante ? true : false}
            estudiante={store.selectedEstudiante || {}}
          />
        </Modal_Form>
      )}
    </div>
  );
}

export default Estudiantes;
