import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Context } from "../../../store/context";
import { decrypt } from "../../Utilidades/encriptado";

const MySwal = withReactContent(Swal);

const ResetPassword = () => {
  const secretKey = 'reset_password';
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { actions } = useContext(Context);
  const navigate = useNavigate();

  let { id_cuenta, token } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Contraseñas nuevas no coinciden");
      return
    }

    const id = decrypt(id_cuenta, secretKey); 

    const data = {
      id_cuenta: id,
      password,
      token
    }

    const response = await actions.reset_password(data)

    if (response) {
      MySwal.fire({
        title: 'Exitoso',
        text: 'Contraseña Cambiada Exitosamente!',
        icon: 'success'
      });
      const path = `/`;
      navigate(path);
    }

    else if (response === false){
      MySwal.fire({
        title: 'error',
        text: 'Error, Tiempo terminado para cambiar contraseña!',
        icon: 'error',
        showConfirmButton: false,
        timer: 3000,
      });
      const path = `/`;
      navigate(path);
    }

  };

   return (
    <div className="w-full h-screen bg-cover bg-center flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-400 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700">
      <div className="bg-black bg-opacity-50 rounded-lg shadow-lg max-w-5xl w-full flex">
        <div className="w-1/2">
          <img src="../../../public/img/Unl_2.png" alt="Side Visual" className="w-full h-full object-cover rounded-l-lg" />
        </div>
        <div className="relative w-1/2 p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-semibold mb-8 text-white text-center dark:text-green-600">
              Reset Password
            </h1>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="mb-8">
                <label htmlFor="password" className="block text-1xl font-medium text-white dark:text-gray-300">
                  New Password:
                </label>
                <div className="flex items-center mt-3">
                  <input
                    id="password"
                    type="password"
                    className={`border rounded-full bg-gray-700 bg-opacity-50 text-white p-4 w-full ${
                      errorMessage && !password ? "border-red-500" : "border-gray-300" 
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      errorMessage && !password ? "focus:ring-red-500" : "focus:ring-blue-500"
                    } transition-colors duration-300`}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-8">
                <label htmlFor="confirmPassword" className="block text-1xl font-medium text-white dark:text-gray-300">
                  Confirm Password:
                </label>
                <div className="flex items-center mt-3">
                  <input
                    id="confirmPassword"
                    type="password"
                    className={`border rounded-full bg-gray-700 bg-opacity-50 text-white p-4 w-full ${
                      errorMessage && !confirmPassword ? "border-red-500" : "border-gray-300"  
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      errorMessage && !confirmPassword ? "focus:ring-red-500" : "focus:ring-blue-500"
                    } transition-colors duration-300`}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              {errorMessage && (
                <span className="text-red-500 text-xl mt-2">{errorMessage}</span>
              )}
              <div className="mt-8 border-t-2 border-white dark:border-gray-500"></div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-colors duration-300 dark:bg-green-700 dark:hover:bg-green-800 dark:border-none"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
