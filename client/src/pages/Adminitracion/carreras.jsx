import {useContext} from "react";
import TableCareer from "../../components/administrativo/tabla_carreras";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";
import {Context} from "../../store/context";
import Modal_Form from "../../components/modal_form";
import Form_Carrera from "../../components/administrativo/form_carrera";
import {Plus} from "lucide-react";

function Carreras() {
    const {store, actions} = useContext(Context);
    const breadcrumbItems = [
        {
            label: "Home",
            link: "/home",
            icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
        },
        {
            label: "Carreras",
            link: "/careers",
            icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
        },
    ];

    const handleOpenModalForCreation = () => {
        actions.setSelectedCareer(null);
        actions.handleModal();
    };

    return (
        <div>
            <Bread_Crumbs items={breadcrumbItems}/>
            <div className="mt-10 font-poppins flex justify-between items-center">
                <h1 className="text-3xl my-5">Modulo de Carreras</h1>
                <button
                    className="btn btn-active flex items-center gap-2"
                    onClick={handleOpenModalForCreation}
                >
                    <Plus size={20}/>
                    Agregar Carrera
                </button>
            </div>
            <TableCareer actions={actions} store={store}/>

            {store.modal && (
                <Modal_Form>
                    <Form_Carrera
                        update={!!store.selectedCareer}
                        career={store.selectedCareer || {}}
                    />
                </Modal_Form>
            )}
        </div>
    );
}

export default Carreras;
