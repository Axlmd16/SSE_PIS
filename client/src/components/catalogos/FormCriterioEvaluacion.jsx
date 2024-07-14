import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../store/context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function FormCriterioEvaluacion({ update = false, criterioEvaluacion = {} }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { actions } = useContext(Context);

  useEffect(() => {
    if (update && criterioEvaluacion) {
      setValue("nombre", criterioEvaluacion.nombre);
      setValue("porcentaje", criterioEvaluacion.porcentaje);
    }
  }, [update, criterioEvaluacion, setValue]);

  const onSubmit = async (data) => {
    // print({data})
    try {
      if (update) {
        await actions.update_criterio_evaluacion(criterioEvaluacion.id, data);
      } else {
        await actions.create_criterio_evaluacion(data);
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
            <h2>{update ? "Actualizar Criterio Evaluacion" : "Agregar nueva Criterio Evaluacion"}</h2>
            <br />
          </div>
          <label className="text-black text-sm" htmlFor="nombre">
            Criterio Evaluacion
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2 mb-2"
            id="nombre"
            type="text"
            aria-label="Nombre"
            {...register("nombre", { required: "El nombre es obligatorio" })}
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm">{errors.nombre.message}</p>
          )}
          <label className="text-black text-sm" htmlFor="porcentaje">
            Porcentaje
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="porcentaje"
            type="text"
            aria-label="Porcentaje"
            {...register("porcentaje", { required: "El porcentaje es obligatorio" })}
          />
          {errors.porcentaje && (
            <p className="text-red-500 text-sm">{errors.porcentaje.message}</p>
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

export default FormCriterioEvaluacion;
