import React, { useEffect, useState } from "react";
import DetailCourse from "../../../pages/Docente/detail_course";
import { Link, useParams } from "react-router-dom";
import Modal_Form from "../../modal_form";
import Form_Unidad from "../../administrativo/form_unidad";
import { Users, FileText, PlusCircle } from "lucide-react";

function Sidebar_Docente({ actions, store }) {
  let { curso_id, asignatura_id } = useParams();

  console.log("ID_Curso", curso_id);
  console.log("ID_Asignatura", asignatura_id);

  const [units, setUnits] = useState([]);

  const handleOpenModalForCreation = () => {
    actions.setSelectedUnit(null);
    actions.handleModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await actions.get_unidades_por_asignatura(asignatura_id);
        setUnits(data);
      } catch (error) {
        console.error("Error al obtener las carreras:", error);
      }
    };

    fetchData();
  }, [actions, curso_id, asignatura_id]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-7 font-poppins">
        <DetailCourse />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary btn-sm drawer-button lg:hidden"
        >
          <span className="text-white">Cerrar</span>
        </label>
      </div>
      <div className="drawer-side font-poppins ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4 space-y-4">
          <li>
            <Link to="#" className="flex items-center space-x-2 text-gray-700">
              <Users className="w-5 h-5" />
              <span>Estudiantes</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="flex items-center space-x-2 text-gray-700">
              <FileText className="w-5 h-5" />
              <span>Calificaciones</span>
            </Link>
          </li>
          {units.map((unit) => (
            <li key={unit.id}>
              <Link
                to="#"
                className="flex items-center space-x-2 text-gray-700"
              >
                <FileText className="w-5 h-5" />
                <span>Unidad {unit.nro_unidad}</span>
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleOpenModalForCreation}
              className="btn btn-ghost btn-sm flex items-center space-x-2 text-gray-900"
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
