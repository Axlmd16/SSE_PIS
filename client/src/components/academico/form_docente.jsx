import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Context } from "../../store/context";

const MySwal = withReactContent(Swal);

function Form_Docente({ update = false, docente = {} }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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
    if (update && docente) {
      setValue("primer_nombre", docente.primer_nombre || "");
      setValue("segundo_nombre", docente.segundo_nombre || "");
      setValue("primer_apellido", docente.primer_apellido || "");
      setValue("segundo_apellido", docente.segundo_apellido || "");
      setValue("telefono", docente.telefono || "");
      setValue("dni", docente.dni || "");
      setValue( 
        "fecha_nacimiento",
        docente.fecha_nacimiento ? new Date(docente.fecha_nacimiento) : null
      );
      setValue("email", docente.email || "");
      setValue("tipo_identificacion_id", docente.tipo_identificacion_id || "");
      setValue("genero_id", docente.genero_id || "");
      setValue("titulo", docente.titulo || "");
      setValue("experiencia_laboral", docente.experiencia_laboral || "");
      setValue("cubiculo", docente.cubiculo || "");
    }
  }, [update, docente, setValue, generos, tipoId]);

  const onSubmit = async (data) => {
    try {
      data.fecha_nacimiento = formatDate(data.fecha_nacimiento);

      if (update) {
        await actions.update_docente(docente.id, data);
      } else {
        await actions.create_docente(data);
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

  // Función para formatear la fecha
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-full">
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-2 text-xl font-poppins text-gray-900 font-bold text-center">
          <h2 className="dark:text-green-600">{update ? "Actualizar Docente" : "Agregar nuevo Docente"}</h2>
        </div>

        <div className="my-2">
          <label className="text-black text-sm dark:text-white" htmlFor="primer_nombre">
            Primer nombre
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="primer_nombre"
            type="text"
            aria-label="Primer nombre"
            {...register("primer_nombre", { required: "Campo requerido" })}
          />
          {errors.primer_nombre && (
            <p className="text-red-500">{errors.primer_nombre.message}</p>
          )}
        </div>

        <div className="my-2">
          <label className="text-black text-sm dark:text-white" htmlFor="segundo_nombre">
            Segundo nombre
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="segundo_nombre"
            type="text"
            aria-label="Segundo nombre"
            {...register("segundo_nombre", { required: "Campo requerido" })}
          />
          {errors.segundo_nombre && (
            <p className="text-red-500">{errors.segundo_nombre.message}</p>
          )}
        </div>

        <div className="my-2">
          <label className="text-black text-sm dark:text-white" htmlFor="primer_apellido">
            Primer apellido
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="primer_apellido"
            type="text"
            aria-label="Primer apellido"
            {...register("primer_apellido", { required: "Campo requerido" })}
          />
          {errors.primer_apellido && (
            <p className="text-red-500">{errors.primer_apellido.message}</p>
          )}
        </div>

        <div className="my-2">
          <label className="text-black text-sm dark:text-white" htmlFor="segundo_apellido">
            Segundo apellido
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="segundo_apellido"
            type="text"
            aria-label="Segundo apellido"
            {...register("segundo_apellido", { required: "Campo requerido" })}
          />
          {errors.segundo_apellido && (
            <p className="text-red-500">{errors.segundo_apellido.message}</p>
          )}
        </div>

        <div className="my-2">
          <label className="text-black text-sm dark:text-white" htmlFor="tipo_identificacion">
            Tipo de identificación
          </label>
          <select
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="tipo_identificacion"
            aria-label="Tipo de identificación"
            {...register("tipo_identificacion", {
              required: "Campo requerido",
            })}
          >
            <option value="">Seleccionar</option>
            {tipoId.map((tipo_id) => (
              <option key={tipo_id.id} value={tipo_id.id}>
                {tipo_id.nombre}
              </option>
            ))}
          </select>
          {errors.tipo_identificacion && (
            <p className="text-red-500">{errors.tipo_identificacion.message}</p>
          )}
        </div>

        <div className="my-2">
          <label className="text-black text-sm dark:text-white" htmlFor="dni">
            DNI
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="dni"
            type="text"
            aria-label="DNI"
            {...register("dni", { required: "Campo requerido" })}
          />
          {errors.dni && <p className="text-red-500">{errors.dni.message}</p>}
        </div>

        <div className="my-2">
          <label className="text-black text-sm dark:text-white" htmlFor="telefono">
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
            <p className="text-red-500 text-sm dark:text-white ">{errors.telefono.message}</p>
          )}
        </div>

        <div className="my-2">
          <label className="text-black text-sm dark:text-white" htmlFor="fecha_nacimiento">
            Fecha de nacimiento
          </label>
          <DatePicker
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="fecha_nacimiento"
            selected={
              watch("fecha_nacimiento")
                ? new Date(watch("fecha_nacimiento"))
                : null
            }
            onChange={(date) => setValue("fecha_nacimiento", date)}
            dateFormat="dd/MM/yyyy"
          />
          {errors.fecha_nacimiento && (
            <p className="text-red-500">{errors.fecha_nacimiento.message}</p>
          )}
        </div>

        <div className="my-2">
          <label className="text-black text-sm dark:text-white" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="email"
            type="text"
            aria-label="Email"
            {...register("email", { required: "Campo requerido" })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="my-2">
          <label className="text-black text-sm dark:text-white" htmlFor="genero_id">
            Género
          </label>
          <select
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="genero_id"
            aria-label="Género"
            {...register("genero_id", { required: "Campo requerido" })}
          >
            <option value="">Seleccionar</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nombre}
              </option>
            ))}
          </select>
          {errors.genero_id && (
            <p className="text-red-500">{errors.genero_id.message}</p>
          )}
        </div>

        <div className="my-2">
          <label className="text-black text-sm dark:text-white" htmlFor="titulo">
            Titulo Docente
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="titulo"
            type="text"
            aria-label="titulo"
            {...register("titulo", { required: "Campo requerido" })}
          />
          {errors.titulo && (
            <p className="text-red-500">{errors.titulo.message}</p>
          )}
        </div>

        <div className="my-2">
          <label className="text-black text-sm dark:text-white" htmlFor="experiencia_laboral">
            Experiencia Laboral
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="experiencia_laboral"
            type="number"
            aria-label="Experiencia_laboral"
            {...register("experiencia_laboral", {
              required: "Campo requerido",
            })}
          />
          {errors.experiencia_laboral && (
            <p className="text-red-500">{errors.experiencia_laboral.message}</p>
          )}
        </div>

        <div className="my-2">
          <label className="text-black text-sm dark:text-white" htmlFor="cubiculo">
            Cubiculo
          </label>
          <input
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded-lg mt-2"
            id="cubiculo"
            type="text"
            aria-label="Cubiculo"
            {...register("cubiculo", { required: "Campo requerido" })}
          />
          {errors.cubiculo && (
            <p className="text-red-500">{errors.cubiculo.message}</p>
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

export default Form_Docente;
