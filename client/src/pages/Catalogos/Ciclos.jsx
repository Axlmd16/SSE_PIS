import { useContext } from "react";
import { Context } from "../../store/context";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";
import Modal_Form from "../../components/modal_form";
import { Plus } from "lucide-react";
import FormCiclo from "../../components/catalogos/FormCiclo";
import TablaCiclos from "../../components/catalogos/TablaCiclos";

const Ciclos = () => {

    const { store, actions } = useContext(Context);

    const breadcrumbItems = [
        {
            label: "Home",
            link: "/home",
            icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
        },
        {
            label: "Catalogos",
            link: "/crear-catalogo",
            icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
        },
        {
            label: "Ciclos",
            link: "/ciclos",
            icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
        },
    ];

    const handleOpenModalForCreation = () => {
        actions.setSelectedCiclos(null);
        actions.handleModal();
    };

    return (
        <div className="bg-white dark:bg-gray-800 h-screen p-9">
            <Bread_Crumbs items={breadcrumbItems} />
            <div className="mt-10 font-poppins flex justify-between items-center">
                <h1 className="text-3xl my-5 dark:text-white">Ciclos</h1>
                <button
                    className="btn btn-active flex items-center gap-2 dark:bg-green-700 dark:hover:bg-green-800 dark:text-white dark:border-none" 
                    onClick={handleOpenModalForCreation}
                >
                    <Plus size={20} />
                    Agregar Ciclo
                </button>
            </div >
            <TablaCiclos actions={actions} store={store} />

            {store.modal && (
                <Modal_Form>
                    <FormCiclo
                        update={!!store.selectCiclos}
                        elCiclo={store.selectCiclos|| {}}
                    />
                </Modal_Form>
            )}
        </div>

    );
}

export default Ciclos;
