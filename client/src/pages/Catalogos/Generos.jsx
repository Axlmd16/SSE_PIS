import { useContext } from "react";
import { Context } from "../../store/context";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";
import Modal_Form from "../../components/modal_form";
import { Plus } from "lucide-react";
import TablaGeneros from "../../components/catalogos/TablaGeneros";
import FormGneros from "../../components/catalogos/FormGenero";

const Generos = () => {

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
            label: "Generos",
            link: "/generos",
            icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
        },
    ];

    const handleOpenModalForCreation = () => {
        actions.setSelectedGenero(null);
        actions.handleModal();
    };

    return (
        <div>
            <Bread_Crumbs items={breadcrumbItems} />
            <div className="mt-10 font-poppins flex justify-between items-center">
                <h1 className="text-3xl my-5">Generos</h1>
                <button
                    className="btn btn-active flex items-center gap-2"
                    onClick={handleOpenModalForCreation}
                >
                    <Plus size={20} />
                    Agregar Genero
                </button>
            </div >
            <TablaGeneros actions={actions} store={store} />

            {store.modal && (
                <Modal_Form>
                    <FormGneros
                        update={!!store.selectedGenero}
                        genero={store.selectedGenero || {}}
                    />
                </Modal_Form>
            )}
        </div>

    );
}

export default Generos;
