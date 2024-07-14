import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../store/context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function FormCiclo
({ update = false, elCiclo = {} }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { actions } = useContext(Context);

  useEffect(() => {
    if (update && elCiclo) {
      setValue("ciclo", elCiclo.ciclo);
    }
  }, [update, elCiclo, setValue]);

  const onSubmit = async (data) => {
    // print({data})
    try {
      if (update) {
        await actions.update_ciclo(elCiclo.id, data);
      } else {
        await actions.create_ciclo(data);
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
            <h2>{update ? "Actualizar Ciclo" : "Agregar nuevo ciclo"}</h2>
            <br />
          </div>
          <label className="text-black text-sm" htmlFor="ciclo">
            Ciclo
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="ciclo"
            type="text"
            aria-label="Ciclo"
            {...register("ciclo", { required: "El ciclo es obligatorio" })}
          />
          {errors.ciclo && (
            <p className="text-red-500 text-sm">{errors.envio_ciclo.message}</p>
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

export default FormCiclo
;
