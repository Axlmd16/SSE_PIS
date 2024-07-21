import { useContext, useState, useEffect } from "react";
import { Context } from "../../store/context";
import Bread_Crumbs from "../../components/inicio_sesion/bread_crumbs";
import TablaCursa from "../../components/notas/tabla_cursa";
import BuscarAsignacionDocente from "../Academico/BuscarAsignacionDocente";
import withReactContent from "sweetalert2-react-content";
import Modal_Form from "../../components/modal_form";
import Swal from "sweetalert2";
import FormCursa from "../../components/notas/form_cursa";

const MySwal = withReactContent(Swal);

const Cursa = () => {
  const { store, actions } = useContext(Context);
  const [ciclos, setCiclos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await actions.get_all_cycles();
        setCiclos(data);
      } catch (error) {
        console.error("Error al obtener los ciclos", error);
      }
    };

    fetchData();
  }, [actions]);

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
  const [selectedCiclo, setSelectedCiclo] = useState(""); // Estado para almacenar el ciclo seleccionado
  const [actualizarTabla, setActualizarTabla] = useState(false);

  // Para recibir los datos seleccionados desde BuscarAsignaturaDocente
  const handleDataSelection = (person) => {
    setSelectDocenteAsignatura(person);
  };

  // Para manejar el cambio de opción en el select de paralelo
  const handleParaleloChange = (e) => {
    setSelectedParalelo(e.target.value);
  };

  const handleCicloChange = (e) => {
    setSelectedCiclo(e.target.value);
  };

  // Para crear un registro de un docente con su asignatura y paralelo
  const creareCursa = async () => {
    const id_docente_asignatura = selectDocenteAsignatura.id;
    const id_ciclo = selectedCiclo;

    const data = {
      id_docente_asignatura: id_docente_asignatura,
      paralelo: selectedParalelo,
      id_ciclo: id_ciclo,
    };

    try {
      console.log(data);
      await actions.create_cursa(data);
      MySwal.fire({
        icon: "success",
        title: "Registro exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
      setActualizarTabla((prev) => !prev);
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
    <div className="bg-white dark:bg-gray-800 h-screen p-9">
      <Bread_Crumbs items={breadcrumbItems} />
      <div className="mt-10 font-poppins flex justify-between items-center my-5">
        <h1 className="text-3xl dark:text-white">Crear Curso</h1>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <BuscarAsignacionDocente
            actions={actions}
            store={store}
            onDataSelect={handleDataSelection}
          />
        </div>
        <div className="flex gap-4 w-2/5">
          <div className="w-1/2 flex justify-center items-center flex-col">
            {/* <h2 className="font-bold text-center ">CICLO</h2> */}
            <select
              className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-green-700 dark:text-white dark:border-none"
              onChange={handleCicloChange}
            >
              <option value="">Seleccionar ciclo</option>
              {ciclos.map((ciclo) => (
                <option key={ciclo.id} value={ciclo.id}>
                  {ciclo.ciclo}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2 flex justify-center items-center flex-col mx-5 text-gray-700 ">
            {/* <h2 className="font-bold text-center">PARALELO</h2> */}
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
        </div>
      </div>
      <div className="text-center">
        <button
          className="mt-6 bg-indigo-600 text-white font-bold dark:bg-green-700 dark:hover:bg-green-800 dark:border-none"
          onClick={creareCursa}
        >
          <p>Asignar Curso</p>
        </button>
      </div>
      <TablaCursa
        store={store}
        actions={actions}
        actualizar={actualizarTabla}
      />
      {store.modal && (
        <Modal_Form>
          <FormCursa
            update={!!store.selectedCursa}
            cursa={store.selectedCursa || {}}
            actions={actions}
            store={store}
            setActualizarTabla={setActualizarTabla}
          />
        </Modal_Form>
      )}
    </div>
  );
};

export default Cursa;
