import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../store/context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Form_Rol({ update = false, rol = {} }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { actions } = useContext(Context);

  useEffect(() => {
    if (update && rol) {
      setValue("nombre", rol.nombre);
      setValue("descripcion", rol.descripcion);
    }
  }, [update, rol, setValue]);

  const onSubmit = async (data) => {
    try {
      if (update) {
        await actions.update_rol(rol.id, data);
      } else {
        await actions.create_rol(data);
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
            <h2  className="dark:text-green-600">{update ? "Actualizar rol" : "Agregar nuevo rol"}</h2>
            <br />
          </div>
          <label className="text-black text-sm dark:text-cyan-400" htmlFor="nombre">
            Nombre
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
        <div className="my-2">
          <label className="text-black text-sm dark:text-cyan-400" htmlFor="descripcion">
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
          <button className="btn btn-active dark:bg-green-600 dark:hover:bg-green-700 dark:text-white dark:border-none" type="submit">
            {update ? "Actualizar" : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form_Rol;
