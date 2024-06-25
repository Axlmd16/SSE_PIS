import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../store/context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Form_Malla({ update = false, mesh = {} }) {
  const [careers, setCareers] = useState([]);
  const { actions } = useContext(Context);

  // Llamada a la API para obtener las carreras
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await actions.get_all_careers();
        setCareers(data);
      } catch (error) {
        console.error("Error al obtener las carreras:", error);
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
      const formattedDate = new Date(mesh.fecha_registro)
        .toISOString()
        .split("T")[0];

      setValue("descripcion", mesh.descripcion);
      setValue("fecha_registro", formattedDate);
      setValue("estado", mesh.estado);
      setValue("carrera_id", mesh.carrera_id);
    }
  }, [update, mesh, setValue, careers]);

  const onSubmit = async (data) => {
    try {
      if (update) {
        console.log("Data actualizada:", data);
        await actions.update_mesh(mesh.id, data);
      } else {
        console.log("Data creada:", data);
        await actions.create_mesh(data);
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
            <h2>{update ? "Actualizar malla" : "Agregar nueva malla"}</h2>
            <br />
          </div>
          <label className="text-black text-sm" htmlFor="carrera_id">
            Carrera
          </label>
          <select
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="carrera_id"
            {...register("carrera_id", {
              required: "La carrera es obligatoria",
            })}
          >
            <option value="">Seleccione una carrera</option>
            {careers.map((career) => (
              <option key={career.id} value={career.id}>
                {career.nombre}
              </option>
            ))}
          </select>
          {errors.carrera_id && (
            <p className="text-red-500 text-sm">{errors.carrera_id.message}</p>
          )}
        </div>
        <div className="my-2">
          <label className="text-black text-sm" htmlFor="fecha_registro">
            Fecha de registro
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="fecha_registro"
            type="date"
            aria-label="Fecha de registro"
            {...register("fecha_registro", {
              required: "La fecha es obligatoria",
            })}
          />
          {errors.fecha_registro && (
            <p className="text-red-500 text-sm ">
              {errors.fecha_registro.message}
            </p>
          )}
        </div>
        <div className="my-2">
          <label className="text-black text-sm" htmlFor="estado">
            Estado de la malla
          </label>
          <select
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="estado"
            {...register("estado", {
              required: "El estado es obligatorio",
            })}
          >
            <option value="">Seleccione un estado</option>
            <option value="1">Activa</option>
            <option value="0">Inactiva</option>
          </select>
          {errors.estado && (
            <p className="text-red-500 text-sm">{errors.estado.message}</p>
          )}
        </div>
        <div className="my-2">
          <label className="text-black text-sm" htmlFor="descripcion">
            Descripción
          </label>
          <textarea
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="descripcion"
            aria-label="Descripción"
            {...register("descripcion")}
          />
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

export default Form_Malla;
