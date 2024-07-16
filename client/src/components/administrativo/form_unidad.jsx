import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Context } from "../../store/context";

const MySwal = withReactContent(Swal);

function Form_Unidad({ update = false, unit = {}, id_subject, id_curso }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { actions } = useContext(Context);

  useEffect(() => {
    if (update && unit) {
      setValue("nombre", unit.nombre);
      setValue("nro_unidad", unit.nro_unidad);
      setValue("nro_semanas", unit.nro_semanas);
      setValue("fecha_inicio", unit.fecha_inicio);
      setValue("fecha_fin", unit.fecha_fin);
      setValue("asignatura_id", unit.asignatura_id);
    }
  }, [update, unit, setValue]);

  const onSubmit = async (data) => {
    try {
      console.log("Data:", data);
      if (update) {
        await actions.update_unit(unit.id, data);
      } else {
        await actions.create_unit(data, id_curso);
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
            <h2>{update ? "Actualizar unidad" : "Agregar nueva unidad"}</h2>
            <br />
          </div>
          <label className="text-black text-sm" htmlFor="nombre">
            Tema
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="nombre"
            type="text"
            aria-label="Nombre"
            {...register("nombre", { required: "El nombre es obligatorio" })}
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm">{errors.nombre.message}</p>
          )}
        </div>
        {/* Input de nro de unidad */}
        <div className="my-2">
          <label className="text-black text-sm" htmlFor="nro_unidad">
            Nro. de unidad
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="nro_unidad"
            type="number"
            aria-label="Nro. de unidad"
            {...register("nro_unidad", {
              required: "Ingrese el número de la unidad",
              min: { value: 1, message: "Debe ser al menos 1" },
            })}
          />
          {errors.nro_unidad && (
            <p className="text-red-500 text-sm ">{errors.nro_unidad.message}</p>
          )}
        </div>

        {/* Input de nro de semanas */}
        <div className="my-2">
          <label className="text-black text-sm" htmlFor="nro_semanas">
            Nro. de semanas
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="nro_semanas"
            type="number"
            aria-label="Nro. de semanas"
            {...register("nro_semanas", {
              required: "Ingrese el número de semanas",
              min: { value: 1, message: "Debe ser al menos 1" },
            })}
          />
          {errors.nro_semanas && (
            <p className="text-red-500 text-sm ">
              {errors.nro_semanas.message}
            </p>
          )}
        </div>

        {/* Input de fecha_inicio */}
        <div className="my-2">
          <label className="text-black text-sm" htmlFor="fecha_inicio">
            Fecha de inicio
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="fecha_inicio"
            type="date"
            aria-label="Fecha de inicio"
            {...register("fecha_inicio", {
              required: "Ingrese la fecha de inicio",
            })}
          />
          {errors.fecha_inicio && (
            <p className="text-red-500 text-sm ">
              {errors.fecha_inicio.message}
            </p>
          )}
        </div>

        {/* Input de fecha_fin */}
        <div className="my-2">
          <label className="text-black text-sm" htmlFor="fecha_fin">
            Fecha de finalización
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="fecha_fin"
            type="date"
            aria-label="Fecha de fin"
            {...register("fecha_fin", {
              required: "Ingrese la fecha de fin",
            })}
          />
          {errors.fecha_fin && (
            <p className="text-red-500 text-sm ">{errors.fecha_fin.message}</p>
          )}
        </div>

        {/* Input oculto con el id_subject */}
        <input
          type="hidden"
          id="asignatura_id"
          value={id_subject}
          {...register("asignatura_id")}
        />

        {/* Botón de registro */}
        <div className="flex justify-end">
          <button className="btn btn-active" type="submit">
            {update ? "Actualizar" : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form_Unidad;
