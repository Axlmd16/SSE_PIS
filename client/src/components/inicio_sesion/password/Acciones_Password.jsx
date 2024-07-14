import { Link } from 'react-router-dom';
import { User, Key, HelpCircle } from 'lucide-react';

const AccionPassword = ({ to, IconComponent, titulo, descripcion }) => (
  <div className='text-center bg-gray-800 p-3 rounded-lg mb-4 w-full transform transition duration-300 ease-in-out hover:scale-105'>
    <Link to={to} className="block h-full">
      <div className="flex flex-col items-center">
        <IconComponent size={24} className="mb-2 text-white" />
        <div className='text-white'>
          <p className='font-bold text-blue-400'>{titulo}</p>
          <p className='text-sm'>{descripcion}</p>
        </div>
      </div>
    </Link>
  </div>
);

const AccionesPassword = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center space-y-4">
        <div className="w-3/4">
          <AccionPassword
            to="/verificar_usuario"
            IconComponent={User} 
            titulo="Cambiar contraseña"
            descripcion="Para cambiar su contraseña actual ingrese aquí"
          />
        </div>
        <div className="w-3/4">
          <AccionPassword
            to="/recuperar_password"
            IconComponent={Key} 
            titulo="Restablecer contrasenia"
            descripcion="Si olvidó su contraseña puede recuperarla aquí"
          />
        </div>
        <div className="w-3/4">
          <AccionPassword
            to="/manual-de-usuario"
            IconComponent={HelpCircle} 
            titulo="Manual de usuario"
            descripcion="Descargar el manual de usuario"
          />
        </div>
      </div>
      <div className="w-1/2 blue-filter relative">
        <img src="../../../../public/img/Unl_4.jpeg" alt="Descripción de la imagen" className="object-cover h-full w-full" />
      </div>
    </div>
  );
}

export default AccionesPassword;
