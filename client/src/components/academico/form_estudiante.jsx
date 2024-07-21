import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Context } from "../../store/context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MySwal = withReactContent(Swal);

function Form_Estudiante({ update = false, estudiante = {} }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onChange" });

  const [generos, setGeneros] = useState([]);
  const [tipoId, setTipoId] = useState([]);
  const { actions } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data_generos = await actions.get_all_generos();
        const data_tipo_id = await actions.get_all_tipo_identificacion();
        setGeneros(data_generos);
        setTipoId(data_tipo_id);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [actions]);

  useEffect(() => {
    if (update && estudiante) {
      setValue("primer_nombre", estudiante.primer_nombre || "");
      setValue("segundo_nombre", estudiante.segundo_nombre || "");
      setValue("primer_apellido", estudiante.primer_apellido || "");
      setValue("segundo_apellido", estudiante.segundo_apellido || "");
      setValue("telefono", estudiante.telefono || "");
      setValue("dni", estudiante.dni || "");
      setValue(
        "fecha_nacimiento",
        estudiante.fecha_nacimiento
          ? new Date(estudiante.fecha_nacimiento)
          : null
      );
      setValue("email", estudiante.email || "");
      setValue(
        "tipo_identificacion_id",
        estudiante.tipo_identificacion_id || ""
      );
      setValue("genero_id", estudiante.genero_id || "");
      setValue("codigo_estudiante", estudiante.codigo_estudiante || "");
    }
  }, [update, estudiante, setValue, generos, tipoId]);

  const onSubmit = async (data) => {
    try {
      data.fecha_nacimiento = formatDate(data.fecha_nacimiento);

      if (update) {
        await actions.update_estudiante(estudiante.id, data);
      } else {
        await actions.create_estudiante(data);
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

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
      <div className="w-full ">
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-2 text-xl font-poppins text-gray-900 font-bold text-center">
            <h2 className="dark:text-green-600">
              {update ? "Actualizar información" : "Registrar nuevo estudiante"}
            </h2>
          </div>
          <div className="my-2">
            <label className="text-black text-sm dark:text-cyan-400" htmlFor="primer_nombre">
              Primer nombre
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
              id="primer_nombre"
              type="text"
              aria-label="Primer nombre"
              {...register("primer_nombre", {
                required: "El primer nombre es obligatorio",
              })}
            />
            {errors.primer_nombre && (
              <p className="text-red-500 text-sm">
                {errors.primer_nombre.message}
              </p>
            )}
          </div>
          <div className="my-2">
            <label className="text-black text-sm dark:text-cyan-400" htmlFor="segundo_nombre">
              Segundo nombre
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
              id="segundo_nombre"
              type="text"
              aria-label="Segundo nombre"
              {...register("segundo_nombre", {
                required: "El segundo nombre es obligatorio",
              })}
            />
            {errors.segundo_nombre && (
              <p className="text-red-500 text-sm">
                {errors.segundo_nombre.message}
              </p>
            )}
          </div>
          <div className="my-2">
            <label className="text-black text-sm dark:text-cyan-400" htmlFor="primer_apellido">
              Primer apellido
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
              id="primer_apellido"
              type="text"
              aria-label="Primer apellido"
              {...register("primer_apellido", {
                required: "El primero apellido es obligatorio",
              })}
            />
            {errors.primer_apellido && (
              <p className="text-red-500 text-sm">
                {errors.primer_apellido.message}
              </p>
            )}
          </div>
          <div className="my-2">
            <label className="text-black text-sm dark:text-cyan-400" htmlFor="segundo_apellido">
              Segundo apellido
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
              id="segundo_apellido"
              type="text"
              aria-label="Segundo apellido"
              {...register("segundo_apellido", {
                required: "El segundo apellido es obligatorio",
              })}
            />
            {errors.segundo_apellido && (
              <p className="text-red-500 text-sm">
                {errors.segundo_apellido.message}
              </p>
            )}
          </div>
          <div className="my-2">
            <label
              className="text-black text-sm dark:text-cyan-400"
              htmlFor="tipo_identificacion_id"
            >
              Tipo de identificación
            </label>
            <select
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
              id="tipo_identificacion"
              aria-label="Tipo de identificación"
              {...register("tipo_identificacion", {
                required: "Seleccione un tipo de identificación",
              })}
            >
              <option value="">Seleccione</option>
              {tipoId.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
            {errors.tipo_identificacion && (
              <p className="text-red-500 text-sm">
                {errors.tipo_identificacion.message}
              </p>
            )}
          </div>

          <div className="my-2">
            <label className="text-black text-sm dark:text-cyan-400" htmlFor="dni">
              DNI
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
              id="dni"
              type="text"
              aria-label="DNI"
              {...register("dni", {
                required: "El dni es obligatorio",
              })}
            />
            {errors.dni && (
              <p className="text-red-500 text-sm ">{errors.dni.message}</p>
            )}
          </div>

          <div className="my-2">
            <label className="text-black text-sm dark:text-cyan-400" htmlFor="telefono">
              Teléfono
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
              id="telefono"
              type="text"
              aria-label="Teléfono"
              {...register("telefono", {
                required: "El telefono es obligatorio",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Ingrese un número de teléfono válido",
                },
              })}
            />
            {errors.telefono && (
              <p className="text-red-500 text-sm ">{errors.telefono.message}</p>
            )}
          </div>

          <div className="my-2">
            <label className="text-black text-sm dark:text-cyan-400" htmlFor="fecha_nacimiento">
              Fecha de nacimiento
            </label>
            <Controller
              control={control}
              name="fecha_nacimiento"
              render={({ field }) => (
                <DatePicker
                  className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
                  id="fecha_nacimiento"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy"
                />
              )}
              rules={{ required: "Seleccione la fecha de nacimiento" }}
            />
            {errors.fecha_nacimiento && (
              <p className="text-red-500 text-sm">
                {errors.fecha_nacimiento.message}
              </p>
            )}
          </div>

          <div className="my-2">
            <label className="text-black text-sm dark:text-cyan-400" htmlFor="email">
              Correo electrónico
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
              id="email"
              type="email"
              aria-label="Correo electrónico"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Ingrese un correo válido",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm ">{errors.email.message}</p>
            )}
          </div>

          <div className="my-2">
            <label className="text-black text-sm dark:text-cyan-400" htmlFor="genero_id">
              Género
            </label>
            <select
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
              id="genero_id"
              aria-label="Género"
              {...register("genero_id", {
                required: "Seleccione un género",
              })}
            >
              <option value="">Seleccione</option>
              {generos.map((genero) => (
                <option key={genero.id} value={genero.id}>
                  {genero.nombre}
                </option>
              ))}
            </select>
            {errors.genero_id && (
              <p className="text-red-500 text-sm">{errors.genero_id.message}</p>
            )}
          </div>

          <div className="my-2">
            <label className="text-black text-sm dark:text-cyan-400" htmlFor="codigo_estudiante">
              Código de estudiante
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
              id="codigo_estudiante"
              type="text"
              aria-label="Código de estudiante"
              {...register("codigo_estudiante", {
                required: "El código de estudiante es obligatorio",
              })}
            />
            {errors.codigo_estudiante && (
              <p className="text-red-500 text-sm">
                {errors.codigo_estudiante.message}
              </p>
            )}
          </div>

          <div className="flex justify-end col-span-2">
            <button className="btn btn-active dark:bg-green-600 dark:hover:bg-green-700 dark:text-white dark:border-none" type="submit">
              {update ? "Actualizar" : "Registrar"}
            </button>
          </div>
        </form>
      </div>
  );
}

export default Form_Estudiante;
