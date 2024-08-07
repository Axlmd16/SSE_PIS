import {
  BookMarked,
  GraduationCap,
  LayoutDashboard,
  Library,
  LucidePencil,
  LucideSchool,
  PersonStandingIcon,
  SlidersVertical,
  UsersRound,
  Sun,
  Moon,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

import N_asignatura from "./components/administrativo/n_asignatura";
import About from "./components/inicio_sesion/about";
import CursosDocente from "./components/inicio_sesion/docente/cursos_docente";
import Estudiantes_Curso from "./components/inicio_sesion/docente/estudiantes_curso";
import Nav_Rol from "./components/inicio_sesion/docente/nav_rol";
import Sidebar_Docente from "./components/inicio_sesion/docente/sidebar_docente";
import TablaCalificaciones from "./components/inicio_sesion/docente/TablaCalificaciones";
import Unidad_Curso from "./components/inicio_sesion/docente/unidad_curso";
import Login from "./components/inicio_sesion/login";
import Sidebar, {
  Navbar,
  SidebarItem,
} from "./components/inicio_sesion/navbar";
import AccionesPassword from "./components/inicio_sesion/password/Acciones_Password";
import CambiarPassword from "./components/inicio_sesion/password/CambiarPassword";
import RecuperarPassword from "./components/inicio_sesion/password/RecuperarPassword";
import ResetPassword from "./components/inicio_sesion/password/ResetPassword";
import VerificarUsuario from "./components/inicio_sesion/password/VerificarUsuario";
import Proyeccion from "./components/proyeccion/Proyeecion";
import Reportes from "./components/reportes/Reportes";
import AsignacionDocente from "./pages/Academico/AsignacionDocente";
import Docentes from "./pages/Academico/Docentes";
import Estudiantes from "./pages/Academico/Estudiantes";
import Asignaturas from "./pages/Adminitracion/asignaturas";
import Carreras from "./pages/Adminitracion/carreras";
import Mallas from "./pages/Adminitracion/mallas";
import Permisos from "./pages/Adminitracion/permisos";
import Roles from "./pages/Adminitracion/roles";
import Roles_Usuarios from "./pages/Adminitracion/roles_usuarios";
import CrearCatalogo from "./pages/Catalogos/Catalogo";
import Ciclos from "./pages/Catalogos/Ciclos";
import CriterioEvaluacion from "./pages/Catalogos/CriterioEvaluacion";
import Generos from "./pages/Catalogos/Generos";
import PeriodoAcademico from "./pages/Catalogos/PeriodoAcademico";
import Landing from "./pages/landing";
import Cursa from "./pages/Notas/Cursa";
import EstudianteCursa from "./pages/Notas/Estudiantes_Cursa";
import { Home_Principal } from "./pages/Principal/Home_Principal";
import User from "./pages/User/user";
import { Context } from "./store/context";

import PerfilUsuario from "./components/inicio_sesion/password/PerfilUsuario";
import VerificarUsuarioDocente from "./components/inicio_sesion/password/VerificarUsuarioDocente";
import Autores from "./pages/Autores";
import Home_Admin from "./pages/Principal/Home_Admin";

const Rutas = () => {
  const { store, actions } = useContext(Context);
  const token = store.token;

  const permisos = store.permissions;

  const rolesString = sessionStorage.getItem("roles");
  const roles = JSON.parse(rolesString || "[]");

  const isAdmin = roles.some(
    (role) =>
      role.rol_nombre === "admin" ||
      role.rol_nombre === "Administrador" ||
      role.rol_nombre === "Admin"
  );
  const isOther = roles.some((role) =>
    ["Docente", "Comision"].includes(role.rol_nombre)
  );

  return (
    <Router>
      {token && isAdmin ? (
        <div className="flex h-screen text-sm ">
          <Navigation_Auth />
          <div className="w-full h-full overflow-y-auto">
            <Routes>
              <Route>
                <Route path="/home-admin" element={<Home_Admin />} />
                <Route path="/users" element={<User />} />
                <Route path="/careers" element={<Carreras />} />
                <Route path="/meshes" element={<Mallas />} />
                <Route path="/subjects" element={<Asignaturas />} />
                <Route path="/new" element={<N_asignatura />} />
                <Route path="/roles" element={<Roles />} />
                <Route path="/roles/permissions/:id" element={<Permisos />} />
                <Route path="/users/detail/:id" element={<Roles_Usuarios />} />
                <Route path="/estudiantes" element={<Estudiantes />} />
                <Route path="/docentes" element={<Docentes />} />
                <Route
                  path="/asignacion-docente"
                  element={<AsignacionDocente />}
                />
                <Route path="/cursa" element={<Cursa />} />
                <Route path="/estudiante-cursa" element={<EstudianteCursa />} />
                <Route path="/crear-catalogo" element={<CrearCatalogo />} />
                <Route path="/generos" element={<Generos />} />
                <Route path="/ciclos" element={<Ciclos />} />
                <Route
                  path="/periodos_academicos"
                  element={<PeriodoAcademico />}
                />
                <Route
                  path="/criterio-evaluacion"
                  element={<CriterioEvaluacion />}
                />
              </Route>
            </Routes>
          </div>
        </div>
      ) : token && isOther ? (
        <div>
          <Nav_Rol actions={actions} store={store} />
          <Routes>
            <Route>
              <Route path="/home" element={<Home_Principal />} />
              <Route
                path="/cursos_docente"
                element={<CursosDocente actions={actions} store={store} />}
              />
              <Route
                path="/course/detail/:curso_id/:asignatura_id"
                element={<Sidebar_Docente actions={actions} store={store} />}
              >
                <Route
                  path="estudiantes"
                  element={
                    <Estudiantes_Curso actions={actions} store={store} />
                  }
                />
                {/* <Route path="calificaciones" element={<Calificaciones />} /> */}
                <Route
                  path="unidad/:unidad_id"
                  element={<Unidad_Curso actions={actions} store={store} />}
                />
              </Route>

              <Route
                path="/course/detail/:curso_id/:asignatura_id/students"
                element={<Sidebar_Docente actions={actions} store={store} />}
              />

              <Route
                path="/tabla_calificaciones/:id_asignacion/:asignatura_nombre"
                element={<TablaCalificaciones />}
              />
              <Route
                path="/reportes"
                element={<Reportes actions={actions} />}
              />
              <Route
                path="/proyeccion"
                element={<Proyeccion actions={actions} />}
              />
              <Route path="/perfil_docente" element={<PerfilUsuario />} />
              <Route
                path="/verificar_usuario_docente"
                element={<VerificarUsuarioDocente />}
              />
              <Route
                path="/cambiar_password/:data"
                element={<CambiarPassword />}
              />
            </Route>
          </Routes>
        </div>
      ) : (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/acciones_password" element={<AccionesPassword />} />
            <Route path="/verificar_usuario" element={<VerificarUsuario />} />
            <Route
              path="/cambiar_password/:data"
              element={<CambiarPassword />}
            />
            <Route path="/recuperar_password" element={<RecuperarPassword />} />
            <Route
              path="/reset_password/:token/:id_cuenta"
              element={<ResetPassword />}
            />
            <Route path="/autores" element={<Autores />} />
          </Routes>
        </div>
      )}
    </Router>
  );
};

export default Rutas;

function Navigation_Auth() {
  const [theme, setTheme] = useState("light");
  const { actions } = useContext(Context);
  const location = useLocation();

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (theme === "dark") {
      // console.log(theme);
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="z-50 font-poppins shadow-lg">
      <Sidebar actions={actions}>
        <SidebarItem
          text="Inicio"
          icon={<LayoutDashboard size={20} />}
          to="/home-admin"
          active={location.pathname === "/home-admin"}
        />
        <SidebarItem
          text="Estudiantes"
          icon={<GraduationCap size={20} />}
          to="/estudiantes"
          active={location.pathname === "/estudiantes"}
        />
        <SidebarItem
          text="Docentes"
          icon={<UsersRound size={20} />}
          to="/docentes"
          active={location.pathname === "/docentes"}
        />
        <SidebarItem
          text="Asignar Docente"
          icon={<LucidePencil size={20} />}
          to="/asignacion-docente"
          active={location.pathname === "/asignacion-docente"}
        />
        <SidebarItem
          text="Cursa"
          icon={<LucideSchool size={20} />}
          to="/cursa"
          active={location.pathname === "/cursa"}
        />
        <SidebarItem
          text="Estudiantes-A-Cursos"
          icon={<LucideSchool size={20} />}
          to="/estudiante-cursa"
          active={location.pathname === "/estudiante-cursa"}
        />
        <SidebarItem
          text="Carreras"
          icon={<LayoutDashboard size={20} />}
          to="/careers"
          active={location.pathname === "/careers"}
        />
        <SidebarItem
          text="Mallas Académicas"
          icon={<Library size={20} />}
          to="/meshes"
          active={location.pathname === "/meshes"}
        />
        <SidebarItem
          text="Asignaturas"
          icon={<BookMarked size={20} />}
          to="/subjects"
          active={location.pathname === "/subjects"}
        />
        <SidebarItem
          text="Usuarios"
          icon={<PersonStandingIcon size={20} />}
          to="/users"
          active={location.pathname === "/users"}
        />
        <SidebarItem
          text="Roles de Usuario"
          icon={<SlidersVertical size={20} />}
          to="/roles"
          active={location.pathname === "/roles"}
        />
        <SidebarItem
          text="Catálogos"
          icon={<Library size={20} />}
          to="/crear-catalogo"
          active={location.pathname === "/crear-catalogo"}
        />
        <button
          onClick={handleChangeTheme}
          className="flex items-center px-2 py-2 text-white  focus:outline-none bg-gray-900"
        >
          {theme === "dark" ? (
            <div className="flex items-center">
              <Sun className="h-6 w-6" />
              {/* <span className="ml-2">Modo Claro</span> */}
            </div>
          ) : (
            <div className="flex items-center">
              <Moon className="h-6 w-6" />
              {/* <span className="ml-2">Modo Oscuro</span> */}
            </div>
          )}
        </button>
      </Sidebar>
    </div>
  );
}
