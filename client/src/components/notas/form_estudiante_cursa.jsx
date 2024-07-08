import { useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Context } from "../../store/context";
import BuscarCursaEstudiante from "../../pages/Notas/BuscarCursaEstudiante";

const MySwal = withReactContent(Swal);

function FormEstudiantesCursa({ cursa = {}, actions, store, setActualizarTabla }) {

    const update = true

    const [selectEstudiante, setSelectEstudiante] = useState(null);
    const [selectedCursa, setSelectedCursa] = useState(null);

    const handleDataSelection = (estudiante, cursa) => {
        setSelectEstudiante(estudiante);
        setSelectedCursa(cursa);
    };

    const actualizarEstuianteCura = async () => {

        const id_estudiante = selectEstudiante.id;
        const id_cursa = selectedCursa.id;

        const data = {
            id_estudiante,
            id_cursa
        };

        try {
            console.log({ data });
            console.log(cursa.id);
            await actions.update_estudiante_cursa(cursa.id, data);
            MySwal.fire({
                icon: "success",
                title: "Actualizacion exitosa",
                showConfirmButton: false,
                timer: 1500,
            });
            setActualizarTabla(prev => !prev);
            actions.handleModal();
        } catch (error) {
            MySwal.fire({
                icon: "error",
                title: "Error al actuailizar",
                showConfirmButton: false,
                timer: 1500,
            });
            actions.handleModal();
        }
    };


    return (
        <div className="w-full">
            <h1 className="text-xl font-poppins text-gray-900 font-bold text-center">Actualizar Estudiante-Cursa</h1>
            <BuscarCursaEstudiante
                actions={actions}
                store={store}
                onDataSelect={handleDataSelection}
                update={update}
            />
            <div className="text-center">
                <button className="mt-6 bg-indigo-600 text-white font-bold" onClick={actualizarEstuianteCura}>
                    <p>Actualizar Estudiante-Cursa</p>
                </button>
            </div>
        </div>
    );
}

export default FormEstudiantesCursa;
