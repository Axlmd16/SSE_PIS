import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../../store/context";
import { Menu, LogOut, FileText, BookOpen, TrendingUp } from "lucide-react";

function Nav_Rol() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [permisosdb, setPermisosdb] = useState([]);
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
      route: "/#",
      icon: <TrendingUp size={20} className="mr-2" />,
    },
  };

  const permisosDisponibles = permisosUsuario
    .map((permiso) => {
      const permisoNombre = permiso.permiso_nombre;
      return permisosList[permisoNombre] ? permisosList[permisoNombre] : null;
    })
    .filter(Boolean);

  return (
    <div className="navbar bg-white text-gray-800 shadow-md w-full px-4 py-2 flex items-center justify-between">
      <div className="navbar-start flex items-center">
        <Menu className="mr-2 text-gray-800" size={24} />
        <NavLink to="/home" className="text-xl font-semibold">
          UNL
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex space-x-4">
          {permisosDisponibles.map((permiso, index) => (
            <li key={index}>
              <NavLink
                to={permiso.route}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-gray-800 hover:text-gray-600 hover:bg-gray-100 ${
                    isActive ? "bg-blue-700 text-white" : ""
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
      <div className="navbar-end">
        <button
          className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-md"
          onClick={handleLogout}
        >
          <LogOut className="mr-1" size={20} />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Nav_Rol;
