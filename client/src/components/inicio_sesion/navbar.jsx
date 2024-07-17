import { ChevronFirst, ChevronLast, Menu } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="h-screen bg-gray-900 text-white">
      <nav className="h-full flex flex-col border-r border-gray-700 shadow-lg">
        <div className="p-4 pb-2 flex justify-between items-center">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition duration-300"
          >
            {expanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-2 space-y-1">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, to, click }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      onClick={click}
      className={`relative flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 
        ${active ? "bg-gray-700 text-white" : "hover:bg-gray-700 text-gray-400"}
      `}
    >
      <Link
        to={to}
        className="flex items-center space-x-3 text-gray-400 hover:text-white"
      >
        {icon}
        <span
          className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
            expanded ? "w-auto" : "w-0"
          }`}
        >
          {text}
        </span>
      </Link>
      {alert && (
        <div
          className={`absolute right-3 w-2 h-2 rounded-full bg-red-500 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
      {!expanded && (
        <div
          className={`
            absolute left-full ml-2 px-2 py-1 rounded-md bg-gray-600 text-white text-xs
            opacity-0 transform -translate-x-3 transition-all duration-300
            group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}

export function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const closeMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4">
      <div>
        <Link to="/" className="text-2xl font-bold tracking-wider ml-2">
          <span className="text-blue-400 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:text-transparent hover:bg-clip-text">
            UNL
          </span>
        </Link>
      </div>
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="text-gray-400 focus:text-gray-900 focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div
          className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 transition-all duration-600 ease-in-out transform ${
            menuAbierto
              ? "opacity-100 scale-100 z-50"
              : "opacity-0 scale-95 z-50"
          }`}
          style={{ display: menuAbierto ? "block" : "none" }}
        >
          <Link
            to="/login"
            className="text-gray-800 text-center block px-4 py-2 m-1 text-sm font-bold hover:bg-gray-800 hover:text-white rounded-md"
            onClick={closeMenu}
          >
            Inicio Sesion
          </Link>
          <Link
            to="/acciones_password"
            className="text-gray-800 text-center block px-4 py-2 m-1 text-sm font-bold hover:bg-gray-800 hover:text-white rounded-md"
            onClick={closeMenu}
          >
            Acciones - Contraseña
          </Link>
          <Link
            to="/"
            className="text-gray-800 text-center block px-4 py-2 m-1 text-sm font-bold hover:bg-gray-800 hover:text-white rounded-md"
            onClick={closeMenu}
          >
            Contactanos
          </Link>
        </div>
      </div>
    </nav>
  );
}
