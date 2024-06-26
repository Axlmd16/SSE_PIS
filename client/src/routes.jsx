import {
  BookMarked,
  Calendar,
  GraduationCap,
  LayoutDashboard,
  Library,
  LogOut,
  LucidePencil,
  LucideReceiptPoundSterling,
  LucideSchool,
  NotebookTabs,
  PersonStandingIcon,
  RefreshCcw,
} from "lucide-react";
import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import About from "./components/inicio_sesion/about";
import Home_Docente from "./components/inicio_sesion/docente/home_docente";
import Nav_Rol from "./components/inicio_sesion/docente/nav_rol";
import Login from "./components/inicio_sesion/login";
import Sidebar, {
  Navbar,
  SidebarItem,
} from "./components/inicio_sesion/navbar";
import AsignacionDocente from "./pages/Academico/AsignacionDocente";
import Docentes from "./pages/Academico/Docentes";
import Estudiantes from "./pages/Academico/Estudiantes";
import Asignaturas from "./pages/Adminitracion/asignaturas";
import Carreras from "./pages/Adminitracion/carreras";
import Mallas from "./pages/Adminitracion/mallas";
import Permisos from "./pages/Adminitracion/permisos";
import Roles from "./pages/Adminitracion/roles";
import Cursa from "./pages/Notas/Cursa";
import EstudianteCursa from "./pages/Notas/Estudiantes_Cursa";
import { Home_Principal } from "./pages/Principal/Home_Principal";
import User from "./pages/User/user";
import Landing from "./pages/landing";
import { Context } from "./store/context";
import Roles_Usuarios from "./pages/Adminitracion/roles_usuarios";
import CursosDocente from "./components/inicio_sesion/docente/cursos_docente";
import TablaCalificaciones from "./components/inicio_sesion/docente/TablaCalificaciones";
import Reportes from "./components/reportes/Reportes";

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
          <div className="w-full h-full overflow-y-auto p-9">
            <Routes>
              <Route>
                <Route path="/home-admin" element={<Home_Principal />} />
                <Route path="/users" element={<User />} />
                <Route path="/careers" element={<Carreras />} />
                <Route path="/meshes" element={<Mallas />} />
                <Route path="/subjects" element={<Asignaturas />} />
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
                path="/tabla_calificaciones/:id_asignacion/:asignatura_nombre"
                element={<TablaCalificaciones />}
              />
              <Route
                path="/reportes"
                element={<Reportes />}
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
          </Routes>
        </div>
      )}
    </Router>
  );
};

export default Rutas;

function Navigation_Auth() {
  const { actions } = useContext(Context);

  return (
    <Sidebar>
      <SidebarItem
        text="Inicio"
        icon={<LayoutDashboard size={20} />}
        to="/home-admin"
      />

      {/* <DropdownMenu text="Académico" icon={<BookOpen size={20} />}> */}
      <SidebarItem
        text="Estudiantes"
        icon={<GraduationCap size={20} />}
        to="/estudiantes"
      />
      <SidebarItem
        text="Docentes"
        icon={<GraduationCap size={20} />}
        to="/docentes"
      />
      <SidebarItem
        text="Asignar Docente"
        icon={<LucidePencil size={20} />}
        to="/asignacion-docente"
      />
      <SidebarItem text="Cursa" icon={<LucideSchool size={20} />} to="/cursa" />
      <SidebarItem
        text="Estudaintes-A-Cursos"
        icon={<LucideSchool size={20} />}
        to="/estudiante-cursa"
      />
      {/* </DropdownMenu> */}

      {/* <DropdownMenu text="Administrativo" icon={<BookOpen size={20} />}> */}
      <SidebarItem
        text="Carreras"
        icon={<LayoutDashboard size={20} />}
        to="/careers"
      />
      <SidebarItem
        text="Mallas Académicas"
        icon={<Library size={20} />}
        to="/meshes"
      />
      <SidebarItem
        text="Asignaturas"
        icon={<BookMarked size={20} />}
        to="/subjects"
      />
      {/* </DropdownMenu> */}
      <SidebarItem
        text="Usuarios"
        icon={<PersonStandingIcon size={20} />}
        to="/users"
      />
      <SidebarItem
        text="Roles de Usuario"
        icon={<LucideReceiptPoundSterling size={20} />}
        to={"/roles"}
      />
      <SidebarItem
        click={() => actions.logout()}
        text="Cerrar Sesión"
        icon={<LogOut size={20} />}
        to={"/"}
      />
    </Sidebar>
  );
}
