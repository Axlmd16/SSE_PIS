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

  // console.log({deserializedData});

  const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, usuario, id_cuenta, estado, id_persona} = deserializedData;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    //* Para validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setErrorMessage("Las contraseñas nuevas no coinciden");
      return;
    }

    const verificar_password = await actions.verificate_password(id_cuenta, currentPassword);
    // console.log(verificar_password);
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
      const path = `/`;
      navigate(path);
    } else {
      setErrorMessage("La contraseña actual no es correcta");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-black mb-4 text-center dark:text-blue-400">Perfil de usuario</h1>
        <div className="text-center mb-6">
          <h2 className="text-1xl font-bold mb-3 dark:text-blue-300">Datos Personales:</h2>
          <div className="mb-2">
            <input
              id="nombre"
              type="text"
              className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md p-2"
              defaultValue={`${primer_nombre} ${segundo_nombre} ${primer_apellido} ${segundo_apellido}`}
              readOnly
            />
          </div>
          <div className="mb-2">
            <input
              id="correo"
              type="text"
              className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md p-2"
              defaultValue={usuario}
              readOnly
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h2 className="text-1xl font-bold text-center dark:text-blue-300">Ingrese su nueva contraseña:</h2>
          </div>
          <div>
            <input
              id="currentPassword"
              type="password"
              className="border-gray-300 block w-full sm:text-sm border rounded-md p-2"
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
              className="border-gray-300 block w-full sm:text-sm border rounded-md p-2"
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
              className="border-gray-300 block w-full sm:text-sm border rounded-md p-2"
              placeholder="Reingrese su nueva contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-colors duration-300 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default CambiarPassword;





// import { Navigate, useParams } from "react-router-dom";
// import { useContext, useState } from "react";
// import { Context } from "../../../store/context";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import { useNavigate } from "react-router-dom";

// const MySwal = withReactContent(Swal);

// const CambiarPassword = () => {
//   let { data } = useParams();
//   const { actions } = useContext(Context);
//   const navigate = useNavigate();

//   const deserializedData = JSON.parse(decodeURIComponent(data));

//   // console.log({deserializedData});

//   const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, usuario, id_cuenta, estado, id_persona} = deserializedData;

//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     //* Para validar que las contraseñas coincidan
//     if (newPassword !== confirmPassword) {
//       setErrorMessage("Las contraseñas nuevas no coinciden");
//       return;
//     }

//     const verificar_password = await actions.verificate_password(id_cuenta, currentPassword)
//     // console.log(verificar_password);
//     if (verificar_password) {
//       data = {
//         id_persona,
//         usuario,
//         password: newPassword,
//         estado
//       }
//       await actions.update_password(id_cuenta, data)
//       MySwal.fire({
//         icon: "success",
//         title: "Cambio de contraseña exitoso",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       const path = `/`;
//       navigate(path)
//     }else {
//       setErrorMessage("La contraseña actual no es correcta");
//     }
//     // setErrorMessage("");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold text-black mb-4 text-center">Perfil de usuario</h1>
//         <div className="text-center mb-6">
//           <h2 className="text-1xl font-bold mb-3">Datos Personales:</h2>
//           <div className="mb-2">
//             <input
//               id="nombre"
//               type="text"
//               className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md p-2"
//               defaultValue={`${primer_nombre} ${segundo_nombre} ${primer_apellido} ${segundo_apellido}`}
//               readOnly
//             />
//           </div>
//           <div className="mb-2">
//             <input
//               id="correo"
//               type="text"
//               className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border rounded-md p-2"
//               defaultValue={usuario}
//               readOnly
//             />
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <h2 className="text-1xl font-bold text-center">Ingrese su nueva contraseña:</h2>
//           </div>
//           <div>
//             <input
//               id="currentPassword"
//               type="password"
//               className="border-gray-300 block w-full sm:text-sm border rounded-md p-2"
//               placeholder="Ingrese su contraseña actual"
//               value={currentPassword}
//               onChange={(e) => setCurrentPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <input
//               id="newPassword"
//               type="password"
//               className="border-gray-300 block w-full sm:text-sm border rounded-md p-2"
//               placeholder="Ingrese su nueva contraseña"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <input
//               id="confirmPassword"
//               type="password"
//               className="border-gray-300 block w-full sm:text-sm border rounded-md p-2"
//               placeholder="Reingrese su nueva contraseña"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//           {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}
//           <button
//             type="submit"
//             className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-colors duration-300"
//           >
//             Cambiar contraseña
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CambiarPassword;
