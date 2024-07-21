import {
  BarChart2,
  Book,
  GraduationCap,
  Layers,
  User,
  Users,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const userData = [
  { name: "Activos", value: 15 },
  { name: "Inactivos", value: 5 },
];

const userDataColors = ["#8884d8", "#82ca9d"];

export const Home_Admin = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-10 font-poppins">
      <header className="flex justify-between items-center py-4 mb-5">
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-200">
          Administrador
        </h1>
      </header>
      <hr className="border border-gray-300 dark:border-gray-700" />
      <br />
      <br />
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 dark:text-gray-200">
        {/* Cards */}
        <Link to="/users" className="">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
            <User className="text-blue-500 dark:text-blue-400 w-12 h-12" />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Usuarios
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Gestión de cuentas y roles
              </p>
            </div>
          </div>
        </Link>

        <Link to="/estudiantes">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
            <GraduationCap className="text-green-500 dark:text-green-400 w-12 h-12" />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Estudiantes
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Gestión de estudiantes
              </p>
            </div>
          </div>
        </Link>

        <Link to="/docentes">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
            <Users className="text-yellow-500 dark:text-yellow-400 w-12 h-12" />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Docentes
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Gestión de docentes
              </p>
            </div>
          </div>
        </Link>

        <Link to="/cursa">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
            <Book className="text-yellow-500 dark:text-yellow-400 w-12 h-12" />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Cursos
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Gestión de cursos y materias
              </p>
            </div>
          </div>
        </Link>

        <Link to="/careers">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
            <Layers className="text-purple-500 dark:text-purple-400 w-12 h-12" />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Carreras
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Gestión de carreras
              </p>
            </div>
          </div>
        </Link>

        <Link to="/roles">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
            <BarChart2 className="text-red-500 dark:text-red-400 w-12 h-12" />
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Roles de Usuario
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Gestión de roles y permisos de usuario
              </p>
            </div>
          </div>
        </Link>

        {/* Gráficos */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Estado de Usuarios
            </h2>
            <div className="stats shadow p-4 grid grid-cols-2 gap-4 w-1/5 bg-white dark:bg-gray-800">
              <div className="stat">
                <div className="stat-title text-gray-600 dark:text-gray-400">
                  Total de Usuarios
                </div>
                <div className="stat-value text-gray-800 dark:text-gray-200">
                  20
                </div>
                <div className="stat-desc text-gray-600 dark:text-gray-400">
                  Usuarios registrados
                </div>
              </div>
            </div>
            <PieChart width={400} height={300}>
              <Pie
                data={userData}
                cx={200}
                cy={150}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {userData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={userDataColors[index % userDataColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home_Admin;
