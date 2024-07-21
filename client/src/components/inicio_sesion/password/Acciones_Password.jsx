import { Link } from 'react-router-dom';
import { User, Key, HelpCircle } from 'lucide-react';

const AccionPassword = ({ to, IconComponent, titulo, descripcion }) => {
  const commonClasses = 'bg-gradient-to-r from-cyan-300 to-blue-300 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-800 p-2 rounded-lg mb-3 w-11/12 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg';

  return (
    <div className={commonClasses}>
      {to.startsWith('https://') ? (
        <a href={to} className="block h-full" target="_blank" rel="noopener noreferrer">
          <div className="flex flex-col items-center">
            <IconComponent size={28} className="mb-2 text-white dark:text-white" />
            <div className='text-black dark:text-white text-center'>
              <p className='font-bold text-lg text-gray-800 dark:text-green-600'>{titulo}</p>
              <p className='text-sm dark:text-white'>{descripcion}</p>
            </div>
          </div>
        </a>
      ) : (
        <Link to={to} className="block h-full">
          <div className="flex flex-col items-center">
            <IconComponent size={28} className="mb-2 text-white dark:text-white" />
            <div className='text-black dark:text-white text-center'>
              <p className='font-bold text-lg text-gray-800 dark:text-green-600'>{titulo}</p>
              <p className='text-sm dark:text-white'>{descripcion}</p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

const AccionesPassword = () => {
  return (
    <div className="flex h-screen bg-gradient-to-r from-cyan-600 via-cyan-700 to-blue-600 dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-700 dark:to-gray-900">
      <div className="w-1/2 flex flex-col justify-center items-center space-y-6  p-6 border-white dark:border-gray-900 rounded-lg">
        <h1 className='text-3xl font-extrabold text-white dark:text-green-500 mb-4'>ACCIONES DE CONTRASEÑA</h1>
        <AccionPassword
          to="/verificar_usuario"
          IconComponent={User} 
          titulo="Cambiar contraseña"
          descripcion="Para cambiar su contraseña actual ingrese aquí"
        />
        <AccionPassword
          to="/recuperar_password"
          IconComponent={Key} 
          titulo="Restablecer contraseña"
          descripcion="Si olvidó su contraseña puede recuperarla aquí"
        />
        <AccionPassword
          to="https://drive.google.com/file/d/1YzLjpp9PpUaoIYZmc4-M5KFkPOHfmsxa/view?usp=drive_link"
          IconComponent={HelpCircle} 
          titulo="Manual de usuario"
          descripcion="Descargar el manual de usuario"
        />
      </div>
      <div className="w-1/2 relative">
        <img src="../../../../public/img/unlhd.jpeg" alt="Descripción de la imagen" className="object-cover h-full w-full rounded-l-lg" />
      </div>
    </div>
  );
}

export default AccionesPassword;
