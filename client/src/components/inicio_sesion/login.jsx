import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/context";

function Login() {
  const { store, actions } = useContext(Context);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    const success = await actions.login(username, password);
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
    }
  };

  return (
    <div className="w-full h-screen bg-light-100 flex items-center justify-center">
      <div className="max-w-md w-full p-6">
        <h1 className="text-3xl font-semibold mb-6 text-black text-center">
          Iniciar Sesión
        </h1>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 bg-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
            onClick={handleClick}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
