import { useContext } from "react";
import { Context } from "../../store/context";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";
import Modal_Form from "../../components/modal_form";
import { Plus } from "lucide-react";
import FormPeriodoAcademico from "../../components/catalogos/FormPeriodoAcademico";
import TablaPeriodoAcademico from "../../components/catalogos/TablaPeriodoAcademico";

const PeriodoAcademico = () => {

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
            label: "Periodos Academicos",
            link: "/periodos_academicos",
            icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
        },
    ];

    const handleOpenModalForCreation = () => {
        actions.setSelectPeriodoAcademico(null);
        actions.handleModal();
    };

    return (
        <div>
            <Bread_Crumbs items={breadcrumbItems} />
            <div className="mt-10 font-poppins flex justify-between items-center">
                <h1 className="text-3xl my-5">Ciclos</h1>
                <button
                    className="btn btn-active flex items-center gap-2"
                    onClick={handleOpenModalForCreation}
                >
                    <Plus size={20} />
                    Agregar Ciclo
                </button>
            </div >
            <TablaPeriodoAcademico actions={actions} store={store} />

            {store.modal && (
                <Modal_Form>
                    <FormPeriodoAcademico
                        update={!!store.selectPeriodoAcademico}
                        mesh={store.selectPeriodoAcademico|| {}}
                    />
                </Modal_Form>
            )}
        </div>

    );
}

export default PeriodoAcademico;
