import { Edit2, MailPlus, Trash2 } from "lucide-react";
import { React, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SearchBar from "../search_bar";
import { useParams } from "react-router-dom";
import Notas_Unidad from "./tabla_notas_unidad";

function Unidad_Curso({ actions, store }) {
  const { unidad_id } = useParams();
  const { curso_id } = useParams();
  const [unidad, setUnidad] = useState([]);

  // Llamada a la API para obtener la unidad
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await actions.get_unit(unidad_id);
        setUnidad(data);
      } catch (error) {
        console.error("Error al obtener los estudiantes por curso:", error);
      }
    };

    fetchData();
  }, [actions, unidad_id]);

  return (
    <div className="p-4 dark:bg-gray-800 h-screen">
      <div className="flex justify-between items-center w-full mb-4 ">
        <span className="text-2xl font-poppins font-bold dark:text-teal-400">
          Unidad {unidad.nro_unidad}: {unidad.nombre}{" "}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white  rounded-lg overflow-hidden shadow-md mt-4 dark:bg-gray-700">
          <div className="">
            <Notas_Unidad
              actions={actions}
              store={store}
              unidad_id={unidad_id}
              curso_id={curso_id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unidad_Curso;
