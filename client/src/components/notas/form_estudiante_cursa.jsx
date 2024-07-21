import { useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Context } from "../../store/context";
import BuscarCursaEstudiante from "../../pages/Notas/BuscarCursaEstudiante";

const MySwal = withReactContent(Swal);

function FormEstudiantesCursa({
  cursa = {},
  actions,
  store,
  setActualizarTabla,
}) {
  const update = true;

  const [selectEstudiante, setSelectEstudiante] = useState(null);
  const [selectedCursa, setSelectedCursa] = useState(null);
  const [nro_matricula, setNro_matricula] = useState(null);

  const handleDataSelection = (estudiante, cursa) => {
    setSelectEstudiante(estudiante);
    setSelectedCursa(cursa);
  };

  const handleSelectChange = (event) => {
    setNro_matricula(event.target.value);
  };

  const actualizarEstuianteCura = async () => {
    const id_estudiante = selectEstudiante.id;
    const id_cursa = selectedCursa.id;
    const nro_de_matricula = nro_matricula;

    const data = {
      id_estudiante,
      id_cursa,
      nro_de_matricula,
    };

    try {
      await actions.update_estudiante_cursa(cursa.id, data);
      MySwal.fire({
        icon: "success",
        title: "Actualizacion exitosa",
        showConfirmButton: false,
        timer: 1500,
      });
      setActualizarTabla((prev) => !prev);
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
      <h1 className="text-xl font-poppins text-gray-900 font-bold text-center dark:text-green-600">
        Actualizar Estudiante-Cursa
      </h1>
      <div className="mt-6 ">
        <BuscarCursaEstudiante
          actions={actions}
          store={store}
          onDataSelect={handleDataSelection}
          update={update}
        />
        <select
          className=" w-auto select select-bordered mx-5 my-5 max-w-xs text-sm dark:bg-green-700 dark:text-white dark:border-none"
          onChange={handleSelectChange}
        >
          <option className="text-gray-300" value="">
            Seleccione...
          </option>
          <option value="PRIMERA">PRIMERA</option>
          <option value="SEGUNDA">SEGUNDA</option>
          <option value="TERCERA">TERCERA</option>
        </select>
      </div>
      <div className="text-center">
        <button
          className="mt-6 bg-indigo-600 text-white font-semibold dark:bg-green-600 dark:hover:bg-green-700 dark:text-white dark:border-none "
          onClick={actualizarEstuianteCura}
        >
          <p>Actualizar </p>
        </button>
      </div>
    </div>
  );
}

export default FormEstudiantesCursa;
