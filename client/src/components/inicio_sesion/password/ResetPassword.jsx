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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-black mb-4 text-center">Reset Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password:
            </label>
            <input
              id="password"
              type="password"
              className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md p-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-colors duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
