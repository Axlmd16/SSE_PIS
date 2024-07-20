import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Context } from "../../../store/context";
import { Menu, LogOut, FileText, BookOpen, TrendingUp, Sun, Moon } from "lucide-react";

function Nav_Rol() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [permisosdb, setPermisosdb] = useState([]);
  const [theme, setTheme] = useState("light");
  const permisosString = sessionStorage.getItem("permisos");
  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  const personaString = sessionStorage.getItem("persona");
  const persona = JSON.parse(personaString || "{}");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await actions.get_all_permissions();
        setPermisosdb(data);
      } catch (error) {
        console.error("Error al obtener los permisos:", error);
      }
    };
    fetchData();
  }, [actions]);

  const permisosUsuario = JSON.parse(permisosString || "[]");

  const permisosList = {
    INFORMES: {
      name: "Generar Informes",
      route: "/reportes",
      icon: <FileText size={20} className="mr-2" />,
    },
    CURSOS_ASIGNADOS: {
      name: "Cursos Asignados",
      route: "/cursos_docente",
      icon: <BookOpen size={20} className="mr-2" />,
    },
    PROYECCIONES: {
      name: "Proyecciones",
      route: "/proyeccion",
      icon: <TrendingUp size={20} className="mr-2" />,
    },
  };

  const permisosDisponibles = permisosUsuario
    .map((permiso) => {
      const permisoNombre = permiso.permiso_nombre;
      return permisosList[permisoNombre] ? permisosList[permisoNombre] : null;
    })
    .filter(Boolean);

  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const closeMenu = () => {
    setMenuAbierto(false);
  };

  const handleChangeTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (theme === 'dark') {
      // console.log(theme);
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="navbar bg-white text-gray-800 shadow-md w-full px-4 py-2 flex items-center justify-between dark:bg-gray-900 ">
      <div className="navbar-start flex items-center ">
        <NavLink to="/home" className="text-xl font-semibold ml-5 ">
          UNL
        </NavLink>
        <button
          onClick={handleChangeTheme}
          className="text-gray-400 dark:text-gray-200 focus:text-gray-900 dark:focus:text-gray-100 focus:outline-none ml-6 bg-transparent border-none p-0"
        >
          {theme === 'dark' ? <Sun className="h-8 w-8" /> : <Moon className="h-8 w-8" />}
        </button>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex space-x-4 ">
          {permisosDisponibles.map((permiso, index) => (
            <li key={index}>
              <NavLink
                to={permiso.route}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-gray-800 hover:text-gray-600 hover:bg-gray-100 dark:text-white dark:hover:bg-indigo-600 ${isActive ? "bg-blue-700 text-white" : ""
                  }`
                }
              >
                {permiso.icon}
                {permiso.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end flex items-center ">
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="text-gray-400 focus:text-gray-900 focus:outline-none dark:bg-gray-900 dark:text-white dark:border-none"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div
            className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 transition-all duration-600 ease-in-out transform dark:bg-green-900  ${menuAbierto ? "opacity-100 scale-100 z-50" : "opacity-0 scale-95 z-50"
              }`}
            style={{ display: menuAbierto ? "block" : "none" }}
          >
            <Link
              to="/perfil_docente"
              className="text-gray-800 text-center block px-4 py-2 m-1 text-sm font-bold hover:bg-gray-800 hover:text-white rounded-md dark:text-white dark:hover:bg-green-950 "
              onClick={closeMenu}
            >
              Mi Perfil
            </Link>
            <Link
              to="/verificar_usuario_docente"
              className="text-gray-800 text-center block px-4 py-2 m-1 text-sm font-bold hover:bg-gray-800 hover:text-white rounded-md dark:text-white dark:hover:bg-green-950 "
              onClick={closeMenu}
            >
              Cambiar Contraseña
            </Link>
            <button
              className="text-gray-800 w-full text-center block px-4 py-2 bg-white text-sm font-bold hover:bg-gray-800 hover:text-white rounded-md dark:bg-green-900 dark:hover:bg-green-950 dark:text-white dark:border-none"
              onClick={() => {
                closeMenu();
                handleLogout();
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav_Rol;
