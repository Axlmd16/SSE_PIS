import { useContext, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Context } from "../../../store/context";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../../Utilidades/encriptado";

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

    // console.log({numIdentificacion});
    // console.log({correo});
    const data = {
      correo,
      numIdentificacion,
    };

    const id_cuenta_reset_password = await actions.validar_usuario_cambio_password(data);

    console.log(id_cuenta_reset_password);

    if (id_cuenta_reset_password) {
      const id = id_cuenta_reset_password.toString()
      console.log({ secretKey });
      const encryptedId = encrypt(id, secretKey);
      console.log({ encryptedId });
      // const encryptedCorreo = encrypt(correo, secretKey);
      // console.log({ encryptedCorreo });

      // console.log({ encryptedId, encryptedCorreo });

      const data_info = {
        correo,
        id_cuenta_reset_password: encryptedId
      }

      console.log({ datos_cuenta: id_cuenta_reset_password });
      console.log("Aqui");
      await actions.recuperar_password(data_info)
      MySwal.fire({
        title: 'Success',
        text: 'Recovery email sent!',
        icon: 'success'
      });
      const path = `/`;
      navigate(path);
    }
    else {
      MySwal.fire({
        icon: "error",
        title: "Error, informacion incorrecta",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    setNumeroIdentificacion("");
    setGmail("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-black mb-4 text-center">Recuperar contraseña</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="numeroIdentificacion" className="block text-sm font-medium text-gray-700">
              Ingrese su número de identificación:
            </label>
            <input
              id="numeroIdentificacion"
              type="text"
              className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md p-2"
              placeholder="1104000000"
              value={numeroIdentificacion}
              onChange={(e) => setNumeroIdentificacion(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="gmail" className="block text-sm font-medium text-gray-700">
              Ingrese su Gmail:
            </label>
            <input
              id="gmail"
              type="text"
              className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md p-2"
              placeholder="ejemplo@gmail.com"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              required
            />
          </div>
          {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-colors duration-300"
          >
            Recuperar contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecuperarPassword;
