import { Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Context } from "../../store/context";

const MySwal = withReactContent(Swal);

function Form_Asignatura({ update = false, subject = {} }) {
  const [meshes, setMeshes] = useState([]);
  const [groups, setGroups] = useState([]);
  const { actions } = useContext(Context);

  // Llamada a la API para obtener las mallas y grupos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataMesh = await actions.get_all_meshes();
        setMeshes(dataMesh);
        const data = await actions.get_all_groups();
        setGroups(data);
      } catch (error) {
        console.error("Error al obtener las mallas o los grupos:", error);
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
      setValue("grupo_id", subject.grupo_id);
    }
  }, [update, subject, setValue, meshes, groups]);

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
    <div className="w-full text-sm">
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-2 text-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {update ? "Actualizar asignatura" : "Agregar nueva asignatura"}
          </h2>
        </div>
        {/* Campo de Malla Académica */}
        <div className="my-2 flex items-end">
          <div className="w-full">
            <label className="text-black text-sm" htmlFor="malla_id">
              Malla Académica
            </label>
            <select
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
              id="malla_id"
              {...register("malla_id", {
                required: "La malla es obligatoria",
              })}
            >
              <option value="">Seleccione una malla académica</option>
              {meshes.map((mesh) => (
                <option key={mesh.id} value={mesh.id}>
                  {mesh.descripcion}
                </option>
              ))}
            </select>
            {errors.malla_id && (
              <p className="text-red-500 text-sm">{errors.malla_id.message}</p>
            )}
          </div>
          {/* <button
            type="button"
            className="btn-ghost ml-2 mb-1 p-1"
            onClick={() => console.log("Agregar malla académica")}
          >
            <Plus size={20} />
          </button> */}
        </div>
        {/* Campo de Grupos */}
        <div className="my-2 flex items-end">
          <div className="w-full">
            <label className="text-black text-sm" htmlFor="grupo_id">
              Criterios de Calificación
            </label>
            <select
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
              id="grupo_id"
              {...register("grupo_id", {
                required: "El grupo es obligatorio",
              })}
            >
              <option value="">Grupos de calificación</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.descripcion}
                </option>
              ))}
            </select>
            {errors.grupo_id && (
              <p className="text-red-500 text-sm">{errors.grupo_id.message}</p>
            )}
          </div>
          {/* <button
            type="button"
            className="btn-ghost ml-2 mb-1 p-1"
            onClick={() => console.log("Agregar grupo")}
          >
            <Plus size={20} />
          </button> */}
        </div>
        {/* Campo de Ciclos */}
        <div className="my-2 flex items-end">
          <div className="w-full">
            <label className="text-black text-sm" htmlFor="ciclo_id">
              Ciclo Académico
            </label>
            <select
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
              id="ciclo_id"
              {...register("ciclo_id", {
                required: "El ciclo es obligatorio",
              })}
            >
              {/* TODO: Llenar con los ciclos académicos */}
              <option value="">Ciclos académicos</option>
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
              <p className="text-red-500 text-sm">{errors.ciclo_id.message}</p>
            )}
          </div>
          {/* <button
            type="button"
            className="btn-ghost ml-2 mb-1 p-1"
            onClick={() => console.log("Agregar ciclo")}
          >
            <Plus size={20} />
          </button> */}
        </div>
        {/* Campo de Nombre */}
        <div className="my-2">
          <label className="text-black text-sm" htmlFor="nombre">
            Nombre de la asignatura
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="nombre"
            type="text"
            aria-label="Nombre de la asignatura"
            {...register("nombre", {
              required: "El nombre es obligatorio",
            })}
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm">{errors.nombre.message}</p>
          )}
        </div>
        {/* Campo de Horas Totales */}
        <div className="my-2">
          <label className="text-black text-sm" htmlFor="total_horas">
            Horas totales
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="total_horas"
            type="number"
            aria-label="Horas totales"
            {...register("total_horas", {
              required: "El total de horas es obligatorio",
            })}
          />
          {errors.total_horas && (
            <p className="text-red-500 text-sm">{errors.total_horas.message}</p>
          )}
        </div>
        {/* Campo de Descripción */}
        <div className="my-2 col-span-2">
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
        <div className="flex justify-end col-span-2 mt-4">
          <button className="btn btn-active" type="submit">
            {update ? "Actualizar" : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form_Asignatura;
