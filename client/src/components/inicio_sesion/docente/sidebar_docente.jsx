import {
  Edit,
  EllipsisVertical,
  FileText,
  Home,
  PlusCircle,
  Trash,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";
import DetailCourse from "../../../pages/Docente/detail_course";
import Form_Unidad from "../../administrativo/form_unidad";
import Modal_Form from "../../modal_form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Sidebar_Docente({ actions, store }) {
  let { curso_id } = useParams();
  const asignatura_id = parseInt(useParams().asignatura_id, 10);

  const location = useLocation();
  const navigate = useNavigate();

  const [units, setUnits] = useState([]);
  const [menuVisibility, setMenuVisibility] = useState({});

  const handleOpenModalForCreation = () => {
    actions.setSelectedUnit(null);
    actions.handleModal();
  };

  const handleUpdate = (unit) => {
    console.log("Unidad seleccionada:", unit);
    actions.setSelectedUnit(unit);
    actions.handleModal();
  };

  const handleDelete = async (unitId) => {
    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Sí, estoy seguro!",
      cancelButtonColor: "#d33",
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      try {
        await actions.delete_unit(unitId);
        console.log("Unidad eliminada:", unitId);
        await MySwal.fire(
          "¡Eliminado!",
          "La unidad ha sido eliminada.",
          "success"
        );

        // Redireccionar a la vista de detalle del curso
        navigate(`/course/detail/${curso_id}/${asignatura_id}`);
      } catch (error) {
        console.error("Error al eliminar la unidad:", error);
        await MySwal.fire(
          "¡Error!",
          "No se pudo eliminar la unidad. Por favor, inténtalo de nuevo más tarde.",
          "error"
        );
      }
    }
  };

  const toggleMenuVisibility = (unitId) => {
    setMenuVisibility((prevVisibility) => ({
      ...Object.keys(prevVisibility).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
      [unitId]: !prevVisibility[unitId],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await actions.get_unidades_por_asignatura(asignatura_id);
        setUnits(data);
      } catch (error) {
        console.error("Error al obtener las unidades:", error);
      }
    };

    fetchData();
  }, [actions, curso_id, asignatura_id]);

  const showDetailCourse =
    location.pathname === `/course/detail/${curso_id}/${asignatura_id}`;

  return (
    <div className="drawer lg:drawer-open dark:text-gray-300">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col font-poppins">
        {showDetailCourse ? <DetailCourse /> : <Outlet />}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary btn-sm drawer-button lg:hidden"
        >
          <span className="text-white">Cerrar</span>
        </label>
      </div>
      <div className="drawer-side font-poppins">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 dark:bg-gray-900 text-base-content min-h-full w-64 p-4 space-y-5">
          <li>
            <Link
              to={`/course/detail/${curso_id}/${asignatura_id}`}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
            >
              <Home className="w-5 h-5" />
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link
              to="estudiantes"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
            >
              <Users className="w-5 h-5" />
              <span>Estudiantes</span>
            </Link>
          </li>
          {units.map((unit) => (
            <li key={unit.id} className="relative dropdown">
              <Link
                to={`unidad/${unit.id}`}
                className={`flex items-center justify-between text-gray-700 dark:text-gray-300 ${
                  location.pathname.includes(`unidad/${unit.id}`)
                    ? "bg-slate-800 text-white text-opacity-90 "
                    : ""
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Unidad {unit.nro_unidad}</span>
                </div>
                <button
                  className="text-gray-500 btn btn-sm btn-ghost btn-circle dark:text-gray-400"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleMenuVisibility(unit.id);
                  }}
                >
                  <EllipsisVertical className="w-5 h-5" />
                </button>
              </Link>
              <ul
                className={`dropdown-content dropdown-bottom menu p-2 shadow bg-base-100 dark:bg-gray-700 rounded-box w-auto ${
                  menuVisibility[unit.id] ? "block" : "hidden"
                } absolute right-0 top-0`}
              >
                <li>
                  <button
                    onClick={() => handleUpdate(unit)}
                    className="text-blue-600 btn btn-ghost btn-sm dark:text-blue-400"
                  >
                    <Edit size={16} />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleDelete(unit.id)}
                    className="text-red-600 btn btn-ghost btn-sm dark:text-red-400"
                  >
                    <Trash size={16} />
                  </button>
                </li>
              </ul>
            </li>
          ))}
          <li>
            <button
              onClick={handleOpenModalForCreation}
              className="btn btn-ghost btn-sm flex items-center space-x-2 text-gray-900 dark:text-gray-300"
            >
              <PlusCircle size={16} />
              <span>Nueva unidad</span>
            </button>
          </li>
        </ul>
      </div>
      {store.modal && (
        <Modal_Form>
          <Form_Unidad
            update={!!store.selectedUnit}
            unit={store.selectedUnit || {}}
            id_subject={asignatura_id}
            id_curso={curso_id}
          />
        </Modal_Form>
      )}
    </div>
  );
}

export default Sidebar_Docente;
