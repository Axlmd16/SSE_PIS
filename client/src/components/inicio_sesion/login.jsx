import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Context } from "../../store/context";

function Login() {
  const { actions } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    setErrorMessage(""); // Clear any previous error message
    const success = await actions.login(data.username, data.password);
    if (success) {
      const userRoles = JSON.parse(sessionStorage.getItem("roles"));
      let path = "/";

      if (userRoles.some((role) => role.rol_nombre === "admin")) {
        path = "/home-admin";
      } else if (
        userRoles.some((role) =>
          ["Docente", "Comision"].includes(role.rol_nombre)
        )
      ) {
        path = "/home";
      }
      navigate(path);
    } else {
      setErrorMessage("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-black text-center">
          Iniciar Sesión
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: "El usuario es obligatorio",
              })}
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.username ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                errors.username ? "focus:ring-red-500" : "focus:ring-blue-500"
              } transition-colors duration-300 bg-white`}
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
              className="block text-sm font-medium text-gray-700"
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
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-colors duration-300"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
