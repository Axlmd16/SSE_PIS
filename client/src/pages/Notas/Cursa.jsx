import { useContext, useState } from "react";
import { Context } from "../../store/context";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";
import TablaCursa from "../../components/notas/tabla_cursa";
import BuscarAsignacionDocente from "../Academico/BuscarAsignacionDocente";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);


const Cursa = () => {
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
    ];

    const [selectDocenteAsignatura, setSelectDocenteAsignatura] = useState(null);
    const [selectedParalelo, setSelectedParalelo] = useState(""); // Estado para almacenar el paralelo seleccionado
    const [actualizarTabla, setActualizarTabla] = useState(false); 

    // Para recibir los datos seleccionados desde BuscarAsignaturaDocente
    const handleDataSelection = (person) => {
        setSelectDocenteAsignatura(person);
    };

    // Para manejar el cambio de opción en el select de paralelo
    const handleParaleloChange = (e) => {
        setSelectedParalelo(e.target.value);
    };

    // Para crear un registro de un docente con su asignatura y paralelo
    const creareAsignacionDocente = async () => {
        const id_docente_asignatura = selectDocenteAsignatura.id;

        const data = {
            id_docente_asignatura: id_docente_asignatura,
            paralelo: selectedParalelo, 
        };

        try {
            await actions.create_cursa(data);
            MySwal.fire({
                icon: "success",
                title: "Registro exitoso",
                showConfirmButton: false,
                timer: 1500,
              });
            setActualizarTabla(prev => !prev);
        } catch (error) {
            // console.log(error);
            MySwal.fire({
                icon: "error",
                title: "Error al registrar",
                showConfirmButton: false,
                timer: 1500,
              });
        }
    };

    return (
        <div>
            <Bread_Crumbs items={breadcrumbItems} />
            <div className="mt-10 font-poppins flex justify-between items-center">
                <h1 className="text-3xl my-5">Crear Curso</h1>
            </div>
            <div className="flex gap-4">
                <div className="w-2/3">
                    <BuscarAsignacionDocente actions={actions} store={store} onDataSelect={handleDataSelection} />
                </div>
                <div className="w-1/3">
                    <h2 className="font-bold text-center">PARALELO</h2>
                    <select
                        className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleParaleloChange} // Manejar el cambio de opción
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
            </div>
            <div className="text-center">
                <button className="mt-6 bg-indigo-600 text-white font-bold" onClick={creareAsignacionDocente}>
                    <p>Asignar Curso</p>
                </button>
                
            </div>
            <TablaCursa store={store} actions={actions} actualizar={actualizarTabla}/>
        </div>
    );
}

export default Cursa;