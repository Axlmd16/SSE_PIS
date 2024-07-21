import { useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Context } from "../../store/context";
import BuscarAsignacionDocente from "../../pages/Academico/BuscarAsignacionDocente";

const MySwal = withReactContent(Swal);

function FormCursa({ cursa = {}, actions, store, setActualizarTabla }) {

    const update = true

    const [selectDocenteAsignatura, setSelectDocenteAsignatura] = useState(null);
    const [selectedParalelo, setSelectedParalelo] = useState("");

    const handleDataSelection = (person) => {
        setSelectDocenteAsignatura(person);
    };

    const handleParaleloChange = (e) => {
        setSelectedParalelo(e.target.value);
    };

    const actualizarCursa = async () => {

        const id_docente_asignatura = selectDocenteAsignatura.id;

        const data = {
            id_docente_asignatura: id_docente_asignatura,
            paralelo: selectedParalelo,
        };

        try {
            console.log({ data });
            console.log(cursa.id);
            await actions.update_cursa(cursa.id, data)
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
            <h1 className="text-xl font-poppins text-gray-900 font-bold text-center dark:text-green-600">Actualizar Cursa</h1>
            <BuscarAsignacionDocente
                actions={actions}
                store={store}
                onDataSelect={handleDataSelection}
                update={update}
            />
            <div className="text-center mt-5">
                    <h2 className="font-bold text-center dark:text-green-600">PARALELO</h2>
                    <select
                        className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-green-700 dark:text-white dark:border-none"
                        onChange={handleParaleloChange}
                    >
                        <option value="">Seleccionar paralelo</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                        <option value="H">H</option>
                    </select>
                </div>
            <div className="text-center">
                <button className="mt-6 bg-indigo-600 text-white font-bold dark:bg-green-600 dark:hover:bg-green-700 dark:text-white dark:border-none" onClick={actualizarCursa}>
                    <p>Actualizar Cursa</p>
                </button>
            </div>
        </div>
    );
}

export default FormCursa;
