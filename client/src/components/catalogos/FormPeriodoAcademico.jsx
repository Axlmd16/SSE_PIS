import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../store/context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function FormPeriodoAcademico({ update = false, mesh = {} }) {
  const [periodoAcademico, setPeriodoAcademico] = useState([]);
  const { actions } = useContext(Context);

  // Llamada a la API para obtener las carreras
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await actions.get_all_periodos_academicos();
        setPeriodoAcademico(data);
      } catch (error) {
        console.error("Error al obtener los periodos academicos:", error);
      }
    };

    fetchData();
  }, [actions]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Setear los valores del formulario si se va a actualizar
  useEffect(() => {
    if (update && mesh) {
      const formattedDateInicio = formatDate(mesh.fecha_inicio);
      const formattedDateFin = formatDate(mesh.fecha_fin);
      setValue("fecha_inicio", formattedDateInicio);
      setValue("fecha_fin", formattedDateFin);
    }
  }, [update, mesh, setValue, periodoAcademico]);

  const formatDate = (dateStr) => {
    const parts = dateStr.split("/");
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  const onSubmit = async (data) => {
    try {
      if (update) {
        console.log("Data actualizada:", data);
        await actions.update_periodo_academico(mesh.id, data);
      } else {
        console.log("Data creada:", data);
        await actions.create_peridodo_academico(data);
      }
      MySwal.fire({
        icon: "success",
        title: update ? "Actualización exitosa" : "Registro exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
      actions.handleModal();
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: update ? "Error al actualizar" : "Error al registrar",
        showConfirmButton: false,
        timer: 1500,
      });
      actions.handleModal();
    }
  };

  return (
    <div className="w-full">
      <form className="grid" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2">
          <div className="text-xl font-poppins text-gray-900 font-bold text-center">
            <h2>{update ? "Actualizar Periodo Academico" : "Agregar nueva Periodo Academico"}</h2>
            <br />
          </div>
        </div>
        <div className="my-2">
          <label className="text-black text-sm" htmlFor="fecha_inicio">
            Fecha de Inicio
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="fecha_inicio"
            type="date"
            aria-label="Fecha Inicio"
            {...register("fecha_inicio", {
              required: "La fecha de inicio es obligatoria",
            })}
          />
          {errors.fecha_inicio && (
            <p className="text-red-500 text-sm ">
              {errors.fecha_inicio.message}
            </p>
          )}
        </div>
        <div className="my-2">
          <label className="text-black text-sm" htmlFor="fecha_fin">
            Fecha de Culminacion
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="fecha_fin"
            type="date"
            aria-label="Fecha de Culminacion"
            {...register("fecha_fin", {
              required: "La fecha de culminacion es obligatoria",
            })}
          />
          {errors.fecha_fin && (
            <p className="text-red-500 text-sm ">
              {errors.fecha_fin.message}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <button className="btn btn-active" type="submit">
            {update ? "Actualizar" : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormPeriodoAcademico;
