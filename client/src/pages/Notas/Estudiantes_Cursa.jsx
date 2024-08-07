import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../store/context";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";
import BuscarCursaEstudiante from "./BuscarCursaEstudiante";
import TablaEstudianteCursa from "../../components/notas/tabla_estudiante_cursa";
import withReactContent from "sweetalert2-react-content";
import Modal_Form from "../../components/modal_form";
import Swal from "sweetalert2";
import FormEstudiantesCursa from "../../components/notas/form_estudiante_cursa";

const MySwal = withReactContent(Swal);

const EstudianteCursa = () => {
  const { store, actions } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const breadcrumbItems = [
    {
      label: "Home",
      link: "/home-admin",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
    {
      label: "Cursa",
      link: "/cursa",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
    {
      label: "Estudiante-Cursa",
      link: "/estudiante-cursa",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
    },
  ];

  const [selectEstudiante, setSelectEstudiante] = useState(null);
  const [selectedCursa, setSelectedCursa] = useState(null);
  const [actualizarTabla, setActualizarTabla] = useState(false);

  const handleDataSelection = (estudiante, cursa) => {
    setSelectEstudiante(estudiante);
    setSelectedCursa(cursa);
  };

  const creareEstuianteCura = async (data) => {
    const id_estudiante = selectEstudiante.id;
    const id_cursa = selectedCursa.id;

    const payload = {
      id_estudiante,
      id_cursa,
      nro_de_matricula: data.nro_de_matricula,
      codigo_matricula: data.codigo_matricula,
      fecha_matricula: data.fecha_registro,
    };

    try {
      console.log("Data creada:", payload);
      await actions.create_estudiantes_cursa(payload);
      MySwal.fire({
        icon: "success",
        title: "Registro exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
      setActualizarTabla((prev) => !prev);
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Error al registrar",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="font-poppins bg-white dark:bg-gray-800 h-screen p-9">
      <Bread_Crumbs items={breadcrumbItems} />
      <div className="mt-10 font-poppins flex justify-between items-center">
        <h1 className="text-3xl my-5 dark:text-white">Asignar Estudiantes a Cursos</h1>
      </div>
      <div className="mt-6">
        <form onSubmit={handleSubmit(creareEstuianteCura)}>
          <div className="flex space-x-4">
            <div className="flex-grow">
              <BuscarCursaEstudiante
                actions={actions}
                store={store}
                onDataSelect={handleDataSelection}
              />
            </div>
            <div className="mt-4 w-1/5">
              <select
                {...register("nro_de_matricula", {
                  required: "Este campo es requerido",
                })}
              className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-green-700 dark:text-white dark:border-none"
              >
                <option className="text-gray-300" value="">
                  Seleccione...
                </option>
                <option value="PRIMERA">PRIMERA</option>
                <option value="SEGUNDA">SEGUNDA</option>
                <option value="TERCERA">TERCERA</option>
              </select>
              {errors.nro_de_matricula && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.nro_de_matricula.message}
                </p>
              )}
            </div>
          </div>

          <div className="text-center">
            <button
              className="mt-6 btn btn-active gap-2 dark:bg-green-700 dark:hover:bg-green-800 dark:text-white dark:border-none" 
              type="submit"
            >
              Asignar Curso
            </button>
          </div>
        </form>
      </div>
      <TablaEstudianteCursa
        store={store}
        actions={actions}
        actualizar={actualizarTabla}
      />
      {store.modal && (
        <Modal_Form>
          <FormEstudiantesCursa
            update={!!store.selectedCursa}
            cursa={store.selectedEstudianteCursa || {}}
            actions={actions}
            store={store}
            setActualizarTabla={setActualizarTabla}
          />
        </Modal_Form>
      )}
    </div>
  );
};

export default EstudianteCursa;
