import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../../store/context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

const CambiarPassword = () => {
  let { data } = useParams();
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const deserializedData = JSON.parse(decodeURIComponent(data));

  const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, usuario, id_cuenta, estado, id_persona } = deserializedData;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Función para validar la contraseña
  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isPasswordValid(newPassword)) {
      setErrorMessage("La nueva contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Las contraseñas nuevas no coinciden");
      return;
    }

    const verificar_password = await actions.verificate_password(id_cuenta, currentPassword);
    if (verificar_password) {
      const data = {
        id_persona,
        usuario,
        password: newPassword,
        estado
      };
      await actions.update_password(id_cuenta, data);
      MySwal.fire({
        icon: "success",
        title: "Cambio de contraseña exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/`);
    } else {
      setErrorMessage("La contraseña actual no es correcta");
    }
  };

  return (
    <div className="w-full h-screen bg-cover bg-center flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-400 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700">
      <div className="bg-black bg-opacity-50 rounded-lg shadow-lg max-w-5xl w-full flex">
        <div className="w-1/2">
          <img src="../../../public/img/unl_6hd.jpeg" alt="Side Visual" className="w-full h-full object-cover rounded-l-lg" />
        </div>
        <div className="relative w-1/2 p-10">
          <h1 className="text-3xl font-bold mb-4 text-white text-center dark:text-green-600">PERFIL DE USUARIO</h1>
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-3 text-white">Datos Personales:</h2>
            <div className="mb-2">
              <input
                id="nombre"
                type="text"
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md p-2 bg-gray-700 text-white text-center"
                defaultValue={`${primer_nombre} ${segundo_nombre} ${primer_apellido} ${segundo_apellido}`}
                readOnly
              />
            </div>
            <div className="mb-2">
              <input
                id="correo"
                type="text"
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md p-2 bg-gray-700 text-white text-center"
                defaultValue={usuario}
                readOnly
              />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-center text-white">Ingrese su nueva contraseña:</h2>
            </div>
            <div>
              <input
                id="currentPassword"
                type="password"
                className="border-gray-300 block w-full sm:text-sm border rounded-md p-2 bg-gray-700 text-white"
                placeholder="Ingrese su contraseña actual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                id="newPassword"
                type="password"
                className="border-gray-300 block w-full sm:text-sm border rounded-md p-2 bg-gray-700 text-white"
                placeholder="Ingrese su nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                id="confirmPassword"
                type="password"
                className="border-gray-300 block w-full sm:text-sm border rounded-md p-2 bg-gray-700 text-white"
                placeholder="Reingrese su nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-colors duration-300 dark:bg-green-700 dark:hover:bg-green-800 dark:border-none"
            >
              Cambiar contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CambiarPassword;
