import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import BuscarAsignaturaDocente from "../../pages/Academico/BuscarAigDoc";

const MySwal = withReactContent(Swal);

function FormAsingancionDocente({docente_asignacion = {}, actions, store, setActualizarTabla }) {

  const update = true

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedAsignatura, setSelectedAsignatura] = useState(null);

  const handleDataSelection = (person, asignatura) => {
      setSelectedPerson(person);
      setSelectedAsignatura(asignatura);
  };
 
  const actualizarAsignacionDocente = async() => {

    const id_docente = selectedPerson.id;  
    const id_asignatura = selectedAsignatura.id;
    const id_periodo_academico = 1;

    const data = {
        id_docente,
        id_asignatura,
        id_periodo_academico
    };

    try {
      // console.log({data});
      // console.log(docente_asignacion.id);
        await actions.update_docente_asignatura(docente_asignacion.id, data)
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
      <h1 className="text-xl font-poppins text-gray-900 font-bold text-center dark:text-green-600 mb-2">Actualizar Asignacion Docente</h1>
        <BuscarAsignaturaDocente 
          actions = {actions}
          store = {store}
          onDataSelect={handleDataSelection}
          update = {update}
        />
         <div className="text-center">
                <button className="mt-6 bg-indigo-600 text-white font-bold dark:bg-green-600 dark:hover:bg-green-700 dark:text-white dark:border-none" onClick={actualizarAsignacionDocente}>
                    <p>Actualizar Docnete-Asignatura</p>
                </button>
            </div>
    </div>  
  );
}

export default FormAsingancionDocente;
