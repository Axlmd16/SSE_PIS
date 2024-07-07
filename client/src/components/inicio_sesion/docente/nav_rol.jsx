import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../store/context";

function Nav_Rol() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [permisosdb, setPermisosdb] = useState([]);
  const permisosString = sessionStorage.getItem("permisos");
  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  // converir el string de la persona guardda en el session storage a un objeto
  const personaString = sessionStorage.getItem("persona");
  const persona = JSON.parse(personaString || "{}");
  //console.log("Persona autenticada:", persona);
  //console.log("Persona ID:", persona.id);

  // Llamada a la API para obtener todos los permisos de la base de datos asociados al usuario
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
    INFORMES: { name: "Generar Informes", route: "/reportes" },
    // CARGA_NOTAS: { name: "Carga de Notas", route: "/#" },
    CURSOS_ASIGNADOS: {
      name: "Cursos Asignados",
      route: "/cursos_docente",
    },
    PROYECCIONES: { name: "Proyecciones", route: "/#" },
  };

  const permisosDisponibles = permisosUsuario
    .map((permiso) => {
      const permisoNombre = permiso.permiso_nombre;
      return permisosList[permisoNombre] ? permisosList[permisoNombre] : null;
    })
    .filter(Boolean); // Filtra nulos

  return (
    <div className="navbar bg-gray-800 text-white w-full shadow-md">
      <div className="navbar-start">
        <Link to={"/home"} className="btn btn-ghost text-xl">
          UNL
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {permisosDisponibles.map((permiso, index) => (
            <li key={index}>
              <Link to={permiso.route}>{permiso.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <button
          className="btn bg-gray-700 hover:bg-gray-600 text-white"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Nav_Rol;
