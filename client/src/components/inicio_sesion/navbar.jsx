import {
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { createContext, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children, actions }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className="h-screen text-white rounded-lg border-none"
      style={{ backgroundColor: "#151924" }}
    >
      <nav className="h-full flex flex-col drop-shadow-lg">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="/img/unl.png"
            className={`overflow-hidden transition-all ${
              expanded ? "w-auto" : "w-0"
            }`}
            alt="unl-logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
          >
            {expanded ? <ChevronsLeft /> : <ChevronsRight />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 space-y-3 my-auto">{children}</ul>
          <div className="mt-auto px-3 mb-4">
            <SidebarItem
              text="Cerrar Sesión"
              icon={<LogOut size={20} />}
              to="/"
              click={() => actions.logout()}
            />
          </div>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}
export function SidebarItem({ icon, text, active, alert, to, click }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      onClick={() => {
        click && click();
      }}
      className={`relative flex items-center py-2 px-3 font-medium rounded-md cursor-pointer transition-colors group ${
        active ? "bg-aux text-white" : "hover:bg-gray-700 text-gray-400"
      } ${alert ? "mt-4" : "mt-2"}`}
    >
      <Link className="flex items-center w-full text-gray-300" to={to}>
        <span className="mr-2">{icon}</span>
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded-full bg-red-500 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}
        {!expanded && (
          <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-gray-600 text-white text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
            {text}
          </div>
        )}
      </Link>
    </li>
  );
}

export function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const closeMenu = () => {
    setMenuAbierto(false);
  };

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4">
      <div>
        <Link to="/" className="text-2xl font-bold tracking-wider ml-2">
          <span className="text-blue-400 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:text-transparent hover:bg-clip-text">
            UNL
          </span>
        </Link>
        <button
          onClick={handleChangeTheme}
          className="text-gray-400 dark:text-gray-200 focus:text-gray-900 dark:focus:text-gray-100 focus:outline-none ml-6 bg-transparent border-none p-0"
        >
          {theme === "dark" ? (
            <Sun className="h-8 w-8" />
          ) : (
            <Moon className="h-8 w-8" />
          )}
        </button>
      </div>
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="text-gray-400 focus:text-gray-900 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-none"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div
          className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 transition-all duration-600 ease-in-out transform dark:bg-green-900  ${
            menuAbierto
              ? "opacity-100 scale-100 z-50"
              : "opacity-0 scale-95 z-50"
          }`}
          style={{ display: menuAbierto ? "block" : "none" }}
        >
          <Link
            to="/login"
            className="text-gray-800 text-center block px-4 py-2 m-1 text-sm font-bold hover:bg-gray-800 hover:text-white rounded-md dark:text-white dark:hover:bg-green-950"
            onClick={closeMenu}
          >
            Inicio Sesion
          </Link>
          <Link
            to="/acciones_password"
            className="text-gray-800 text-center block px-4 py-2 m-1 text-sm font-bold hover:bg-gray-800 hover:text-white rounded-md dark:text-white dark:hover:bg-green-950"
            onClick={closeMenu}
          >
            Acciones - Contraseña
          </Link>
          <Link
            to="/"
            className="text-gray-800 text-center block px-4 py-2 m-1 text-sm font-bold hover:bg-gray-800 hover:text-white rounded-md dark:text-white dark:hover:bg-green-950"
            onClick={closeMenu}
          >
            Contactanos
          </Link>
        </div>
      </div>
    </nav>
  );
}
