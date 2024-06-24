import { useContext, useState } from "react";
import { Context } from "../../store/context";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";
import BuscarCursaEstudiante from "./BuscarCursaEstudiante";
import TablaEstudianteCursa from "../../components/notas/tabla_estudiante_cursa";

const EstudianteCursa = () => {
    const { store, actions } = useContext(Context);
    const breadcrumbItems = [
        {
            label: "Home",
            link: "/home",
            icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
        },
        {
            label: "Cursa",
            link: "/cursa",
            icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
        },
        {
            label: "Estudainte-Cursa",
            link: "/estudiante-cursa",
            icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
        },
    ];

    const [selectEstudiante, setSelectEstudiante] = useState(null);
    const [selectedCursa, setSelectedCursa] = useState(null); 

    const handleDataSelection = (estudiante, cursa) => {
        setSelectEstudiante(estudiante);
        setSelectedCursa(cursa);
    };

    const creareEstuianteCura = async () => {

        const id_estudiante = selectEstudiante.id;
        const id_cursa = selectedCursa.id;

        const data = {
            id_estudiante,
            id_cursa
        };

        try {
            console.log({ data });
            await actions.create_estudiantes_cursa(data);
            console.log("GUARDADO");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Bread_Crumbs items={breadcrumbItems} />
            <div className="mt-10 font-poppins flex justify-between items-center">
                <h1 className="text-3xl my-5">Asignar Estudiantes a Cursos</h1>
            </div>
            <div className="">
                <div className="">
                    <BuscarCursaEstudiante actions={actions} store={store} onDataSelect={handleDataSelection} />
                </div>
            </div>
            <div className="text-center">
                <button className="mt-6 bg-indigo-600 text-white font-bold" onClick={creareEstuianteCura}>
                    <p>Asignar Curso</p>
                </button>

            </div>
            <TablaEstudianteCursa store={store} actions={actions} />
        </div>
    );
}

export default EstudianteCursa;
