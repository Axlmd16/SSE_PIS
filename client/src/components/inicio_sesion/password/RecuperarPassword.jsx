import { useContext, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Context } from "../../../store/context";
import { useNavigate } from "react-router-dom";
import { encrypt, decrypt } from "../../Utilidades/encriptado";
import { User } from "lucide-react";

const MySwal = withReactContent(Swal);

const RecuperarPassword = () => {
  const secretKey = 'reset_password';

  const [numeroIdentificacion, setNumeroIdentificacion] = useState("");
  const [gmail, setGmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const numIdentificacion = numeroIdentificacion;
    const correo = gmail;

    const data = {
      correo,
      numIdentificacion,
    };

    const id_cuenta_reset_password = await actions.validar_usuario_cambio_password(data);

    if (id_cuenta_reset_password) {
      const id = id_cuenta_reset_password.toString();
      const encryptedId = encrypt(id, secretKey);

      console.log({encryptedId});

      const id_descriptado = decrypt(encryptedId, secretKey);
      console.log({id_descriptado});

      const data_info = {
        correo,
        id_cuenta_reset_password: encryptedId
      };

      await actions.recuperar_password(data_info);
      MySwal.fire({
        title: 'Éxito',
        text: '¡Correo de recuperación enviado!',
        icon: 'success'
      });
      navigate(`/`);
    } else {
      MySwal.fire({
        icon: "error",
        title: "Error, información incorrecta",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    setNumeroIdentificacion("");
    setGmail("");
  };

  return (
    <div className="w-full h-screen bg-cover bg-center flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-400 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700">
      <div className="bg-black bg-opacity-50 rounded-lg shadow-lg max-w-5xl w-full flex">
        <div className="w-1/2">
          <img src="../../../public/img/unl_4hd.jpeg" alt="Side Visual" className="w-full h-full object-cover rounded-l-lg" />
        </div>
        <div className="relative w-1/2 p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-semibold mb-8 text-white text-center dark:text-green-600">
              Recuperar Contraseña
            </h1>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="mb-8">
                <label htmlFor="numeroIdentificacion" className="block text-1xl font-medium text-white dark:text-gray-300">
                  Ingresa tu número de identificación:
                </label>
                <div className="flex items-center mt-3">
                  <input
                    id="numeroIdentificacion"
                    type="text"
                    className={`border rounded-full bg-gray-700 bg-opacity-50 text-white p-4 w-full ${
                      errorMessage && !numeroIdentificacion ? "border-red-500" : "border-gray-300" 
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      errorMessage && !numeroIdentificacion ? "focus:ring-red-500" : "focus:ring-blue-500"
                    } transition-colors duration-300`}
                    placeholder="1104000000"
                    value={numeroIdentificacion}
                    onChange={(e) => setNumeroIdentificacion(e.target.value)}
                    required
                  />
                  <User className="text-white dark:text-green-600 ml-3 w-10 h-10" />
                </div>
              </div>
              <div className="mb-8">
                <label htmlFor="gmail" className="block text-1xl font-medium text-white dark:text-gray-300">
                  Ingresa tu Gmail:
                </label>
                <div className="flex items-center mt-3">
                  <input
                    id="gmail"
                    type="text"
                    className={`border rounded-full bg-gray-700 bg-opacity-50 text-white p-4 w-full ${
                      errorMessage && !gmail ? "border-red-500" : "border-gray-300"  
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      errorMessage && !gmail ? "focus:ring-red-500" : "focus:ring-blue-500"
                    } transition-colors duration-300`}
                    placeholder="ejemplo@gmail.com"
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)}
                    required
                  />
                  <User className="text-white dark:text-green-600 ml-3 w-10 h-10" />
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
                Recuperar Contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecuperarPassword;
