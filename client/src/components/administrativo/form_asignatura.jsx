import { Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Context } from "../../store/context";

const MySwal = withReactContent(Swal);

function Form_Asignatura({ update = false, subject = {} }) {
  const [meshes, setMeshes] = useState([]);
  const { actions } = useContext(Context);

  // Llamada a la API para obtener las mallas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataMesh = await actions.get_all_meshes();
        setMeshes(dataMesh);
      } catch (error) {
        console.error("Error al obtener las mallas :", error);
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
    if (update && subject) {
      setValue("nombre", subject.nombre);
      setValue("descripcion", subject.descripcion);
      setValue("ciclo_id", subject.ciclo_id);
      setValue("malla_id", subject.malla_id);
      setValue("total_horas", subject.total_horas);
    }
  }, [update, subject, setValue, meshes]);

  const onSubmit = async (data) => {
    try {
      if (update) {
        console.log("Data actualizada:", data);
        await actions.update_subject(subject.id, data);
      } else {
        console.log("Data creada:", data);
        await actions.create_subject(data);
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
    <div className="w-full text-sm dark:text-cyan-400">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-1 md:col-span-2 text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-green-600">
            {update ? "Actualizar asignatura" : "Agregar nueva asignatura"}
          </h2>
        </div>
        {/* Campo de Malla Académica */}
        <div className="my-2 flex flex-col">
          <label
            className="text-gray-700 text-sm dark:text-cyan-400 font-semibold"
            htmlFor="malla_id"
          >
            Malla Académica
          </label>
          <select
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="malla_id"
            {...register("malla_id", { required: "La malla es obligatoria" })}
          >
            <option value="">Seleccione una malla académica</option>
            {meshes.map((mesh) => (
              <option key={mesh.id} value={mesh.id}>
                {mesh.descripcion}
              </option>
            ))}
          </select>
          {errors.malla_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.malla_id.message}
            </p>
          )}
        </div>
        {/* Campo de Ciclos */}
        <div className="my-2 flex flex-col">
          <label
            className="text-gray-700 text-sm dark:text-cyan-400 font-semibold"
            htmlFor="ciclo_id"
          >
            Ciclo Académico
          </label>
          <select
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="ciclo_id"
            {...register("ciclo_id", { required: "El ciclo es obligatorio" })}
          >
            <option value="">Seleccione...</option>
            <option value="1">Primero</option>
            <option value="2">Segundo</option>
            <option value="3">Tercero</option>
            <option value="4">Cuarto</option>
            <option value="5">Quinto</option>
            <option value="6">Sexto</option>
            <option value="7">Séptimo</option>
            <option value="8">Octavo</option>
            <option value="9">Noveno</option>
            <option value="10">Décimo</option>
          </select>
          {errors.ciclo_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ciclo_id.message}
            </p>
          )}
        </div>
        {/* Campo de Nombre */}
        <div className="my-2 flex flex-col">
          <label
            className="text-gray-700 text-sm dark:text-cyan-400 font-semibold"
            htmlFor="nombre"
          >
            Nombre de la asignatura
          </label>
          <input
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="nombre"
            type="text"
            aria-label="Nombre de la asignatura"
            {...register("nombre", { required: "El nombre es obligatorio" })}
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
          )}
        </div>
        {/* Campo de Horas Totales */}
        <div className="my-2 flex flex-col">
          <label
            className="text-gray-700 text-sm dark:text-cyan-400 font-semibold"
            htmlFor="total_horas"
          >
            Horas totales
          </label>
          <input
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="total_horas"
            type="number"
            aria-label="Horas totales"
            {...register("total_horas", {
              required: "El total de horas es obligatorio",
            })}
          />
          {errors.total_horas && (
            <p className="text-red-500 text-sm mt-1">
              {errors.total_horas.message}
            </p>
          )}
        </div>
        {/* Campo de Descripción */}
        <div className="my-2 flex flex-col col-span-1 md:col-span-2">
          <label
            className="text-gray-700 text-sm dark:text-cyan-400 font-semibold"
            htmlFor="descripcion"
          >
            Descripción
          </label>
          <textarea
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="descripcion"
            aria-label="Descripción"
            {...register("descripcion")}
          />
        </div>
        <div className="flex justify-end col-span-1 md:col-span-2 mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-green-600 dark:hover:bg-green-700 dark:text-white dark:border-none"
            type="submit"
          >
            {update ? "Actualizar" : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form_Asignatura;
