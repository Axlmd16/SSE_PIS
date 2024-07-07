import { useContext, useState } from "react";
import { Context } from "../../store/context";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";
import BuscarAsignaturaDocente from "./BuscarAigDoc";
import TablaDocenteAsignatura from "../../components/academico/tabla_docente_asignatura";
import withReactContent from "sweetalert2-react-content";
import Modal_Form from "../../components/modal_form";
import FormAsingancionDocente from "../../components/academico/FormAsingancionDocente";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);

const AsignacionDocente = () => {
    const { store, actions } = useContext(Context);
    const breadcrumbItems = [
        {
            label: "Home",
            link: "/home",
            icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
        },
        {
            label: "Docentes",
            link: "/docentes",
            icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
        },
        {
            label: "Asignacion Docente",
            link: "/asignacion-docente",
            icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
        },
    ];

    const [selectedPerson, setSelectedPerson] = useState(null);
    const [selectedAsignatura, setSelectedAsignatura] = useState(null);
    const [actualizarTabla, setActualizarTabla] = useState(false); 

    //* Función para recibir los datos seleccionados desde BuscarAsignaturaDocente
    const handleDataSelection = (person, asignatura) => {
        setSelectedPerson(person);
        setSelectedAsignatura(asignatura);
    };

    //* Funcion para crear un registro de un docente con su asignatura
    const creareAsignacionDocente = async() => {

        const id_docente = selectedPerson.id;  
        const id_asignatura = selectedAsignatura.id;
        const id_periodo_academico = 1;
    
        const data = {
            id_docente,
            id_asignatura,
            id_periodo_academico
        };
    
        try {
            // console.log({ data });
            await actions.create_docente_asignatura(data)
            // console.log("GUARDADO");
            MySwal.fire({
                icon: "success",
                title: "Registro exitoso",
                showConfirmButton: false,
                timer: 1500,
              });
            setActualizarTabla(prev => !prev);
        } catch (error) {
            MySwal.fire({
                icon: "error",
                title: "Error al registrar",
                showConfirmButton: false,
                timer: 1500,
              });
            // console.log(error);
        }
    };
    
    //* Para ver los docentes asignados
    // const verDocentesAsignaturas = async() => {

    //     try {
    //         const info = await actions.get_all_docentes_asignaturas()
    //         console.log({info});
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <div>
            <Bread_Crumbs items={breadcrumbItems} />
            <div className="mt-10 font-poppins flex justify-between items-center">
                <h1 className="text-3xl my-5">Asignacion Docentes</h1>
            </div >
            <BuscarAsignaturaDocente actions={actions} store={store} onDataSelect={handleDataSelection} />
            {/*//* Mostrar los datos seleccionados, No borrar */}
            {/* {selectedPerson && selectedAsignatura && (
                <div className="p-4 bg-white shadow rounded-lg mt-4">
                    <h2 className="text-lg font-bold">Persona seleccionada:</h2>
                    <p className="mt-2">{selectedPerson.primer_nombre} {selectedPerson.primer_apellido}</p>
                    <p className="mt-2">id Docente={selectedPerson.id}</p>
                    <h2 className="text-lg font-bold mt-4">Asignatura seleccionada:</h2>
                    <p className="mt-2">{selectedAsignatura.id}</p>
                    <p className="mt-2">id Asignatura = {selectedAsignatura.nombre}</p>
                </div>)} */}
            <div className="text-center">
                <button className="mt-6 bg-indigo-600 text-white font-bold" onClick={creareAsignacionDocente}>
                    <p>Asignar Materia a Docente</p>
                </button>
                {/* //* Usar este boton para ver la informacion de docentos asignados */}
                {/* <button className="mt-6 bg-indigo-600 text-white font-bold" onClick={verDocentesAsignaturas}>
                    <p>Ver info</p>
                </button> */}
            </div>
            <TablaDocenteAsignatura store={store} actions={actions} actualizar={actualizarTabla}/>
            {store.modal && (
                <Modal_Form>
                <FormAsingancionDocente
                    update={!!store.selectedDocenteAsignatura}
                    docente_asignacion={store.selectedDocenteAsignatura || {}}
                    actions={actions} store={store}
                    setActualizarTabla={setActualizarTabla}
                />
                </Modal_Form>
            )}
        </div>
    );
}

export default AsignacionDocente