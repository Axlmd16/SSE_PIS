import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Context } from "../../../store/context";

function VerificarUsuarioDocente() {
  const { actions } = useContext(Context);
  const [infoDocente, setInfoDocente] = useState(null);
  const [loading, setLoading] = useState(true); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const personaString = sessionStorage.getItem("persona");
  const persona = JSON.parse(personaString || "{}");

  const id_docente = persona.id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const data = await actions.get_email_docente(id_docente);
        setInfoDocente(data);
        setValue("username", data);
      } catch (error) {
        console.error("Error al obtener la información del docente:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [actions, id_docente, setValue]);

  const onSubmit = async (data) => {
    setErrorMessage(""); 
    const success = await actions.verificate_user(data.username, data.password);
    if (success) {
      const serializedSuccess = encodeURIComponent(JSON.stringify(success));
      const path = `/cambiar_password/${serializedSuccess}`;
      navigate(path);
    } else {
      setErrorMessage("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center p-6 dark:bg-gray-900">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-6 text-black text-center dark:text-blue-300">
          VERIFICAR USUARIO
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-blue-300"
              >
                Usuario
              </label>
              <input
                type="text"
                id="username"
                {...register("username", {
                  required: "El usuario es obligatorio",
                })}
                readOnly
                className={`mt-1 p-2 w-full border rounded-md bg-gray-200 text-gray-700 cursor-not-allowed`}
              />
              {errors.username && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-blue-300"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
                className={`mt-1 p-2 w-full border rounded-md ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
                } transition-colors duration-300 bg-white`}
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
            )}
            <div>
              <button
                type="submit"
                className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors duration-300 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default VerificarUsuarioDocente;
