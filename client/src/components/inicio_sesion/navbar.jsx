import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronUp, ChevronDown } from "lucide-react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="h-screen bg-gray-900 text-white">
      <nav className="h-full flex flex-col border-r border-gray-700 shadow-md">
        <div className="p-4 pb-2 flex justify-between items-center">
          {/* <img
            src="/img/unl.png"
            className={`overflow-hidden transition-all ${
              expanded ? "w-auto" : "w-0"
            }`}
            alt="unl-logo"
          /> */}
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
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
      className={`relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active ? "bg-gray-600 text-white" : "hover:bg-gray-700 text-gray-400"
        }`}
    >
      <Link
        className="flex items-center text-gray-400 text-xxs font-poppins"
        to={to}
      >
        {icon}
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
          <div
            className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-gray-600 text-white text-sm
          invisible opacity-0 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </Link>
    </li>
  );
}

export function DropdownMenu({ icon, text, children }) {
  const { expanded } = useContext(SidebarContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="relative flex flex-col">
      <button
        className={`flex items-center py-2 px-3 my-1 border-none bg-transparent 
          ${expanded ? "hover:bg-gray-700 text-gray-400 text-xxs" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-40 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {expanded &&
          (isOpen ? (
            <ChevronUp className="ml-auto" />
          ) : (
            <ChevronDown className="ml-auto" />
          ))}
      </button>
      {isOpen && (
        <ul className={`pl-4 transition-all ${expanded ? "block" : "hidden"}`}>
          {children}
        </ul>
      )}
    </li>
  );
}

export function Navbar() {
  return (
    <div className="navbar bg-gray-800 text-white w-full shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <button className="btn btn-ghost lg:hidden">
            <MoreVertical />
          </button>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-800 rounded-box w-52 text-white"
          >
            <li>
              <Link to="/">Item 1</Link>
            </li>
            <li>
              <Link to="/">Parent</Link>
              <ul className="p-2 bg-gray-700 rounded-md">
                <li>
                  <Link to="/">Submenu 1</Link>
                </li>
                <li>
                  <Link to="/">Submenu 2</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/">Item 3</Link>
            </li>
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl">
          UNL
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Item 1</Link>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2 bg-gray-700 rounded-md">
                <li>
                  <Link to="/">Submenu 1</Link>
                </li>
                <li>
                  <Link to="/">Submenu 2</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link to="/">Item 3</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link
          className="btn bg-gray-700 hover:bg-gray-600 text-white"
          to={"/login"}
        >
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}
