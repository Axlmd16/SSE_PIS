import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Context } from "../../../store/context";
import { User } from "lucide-react";

function VerificarUsuario() {
  const { actions } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

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
    <div className="w-full h-screen bg-cover bg-center flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-400 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700">
      <div className="bg-black bg-opacity-50 rounded-lg shadow-lg max-w-5xl w-full flex">
        
        <div className="relative w-1/2 p-10">
          <h1 className="text-3xl font-semibold mb-8 text-white text-center dark:text-green-600">
            VERIFICAR USUARIO
          </h1>
          <div className="flex items-center justify-center mb-4">
            <div className="w-14 h-14 flex items-center justify-center bg-white rounded-full mb-4">
              <User className="text-gray-800" />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
            <div className="mb-6">
              <label htmlFor="username" className="block text-md font-medium text-white dark:text-gray-300">
                Ingresa tu usuario:
              </label>
              <input
                type="text"
                id="username"
                {...register("username", { required: "El usuario es obligatorio" })}
                className={`mt-2 p-3 w-full border rounded-full bg-gray-700 bg-opacity-50 text-white ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  errors.username ? "focus:ring-red-500" : "focus:ring-blue-500"
                } transition-colors duration-300 text-lg`}
              />
              {errors.username && (
                <span className="text-red-500 text-lg mt-2">{errors.username.message}</span>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-md font-medium text-white dark:text-gray-300">
                Ingresa tu password:
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "La contraseña es obligatoria" })}
                className={`mt-2 p-3 w-full border rounded-full bg-gray-700 bg-opacity-50 text-white ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
                } transition-colors duration-300 text-lg`}
              />
              {errors.password && (
                <span className="text-red-500 text-lg mt-2">{errors.password.message}</span>
              )}
            </div>
            {errorMessage && (
              <div className="mb-6 text-red-500 text-lg">{errorMessage}</div>
            )}
            <div className="my-6 border-t-2 border-white dark:border-gray-500"></div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-colors duration-300 text-lg dark:bg-green-700 dark:hover:bg-green-800 dark:border-none"
              >
                Verificar
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/2">
          <img src="../../../public/img/unl_3hd.jpeg" alt="Side Visual" className="w-full h-full object-cover rounded-r-lg" />
        </div>
      </div>
    </div>
  );
}

export default VerificarUsuario;
