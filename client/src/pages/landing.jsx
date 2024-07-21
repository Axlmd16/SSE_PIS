import { FileCode, Github, SquareChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  { name: "Jan", uv: 400, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 300, pv: 4567, amt: 2400 },
  { name: "Mar", uv: 200, pv: 1398, amt: 2400 },
  { name: "Apr", uv: 278, pv: 3908, amt: 2400 },
  { name: "May", uv: 189, pv: 4800, amt: 2400 },
  // ... más datos
];

const pieData = [
  { name: "Aprobado", value: 400 },
  { name: "Reprobado", value: 300 },
  // ... más datos
];

const colors = ["#0088FE", "#FFBB28", "#FF8042"];

const Landing = () => (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
    <div className="flex-1 w-full">
      <main className="flex-1">
        <section className="bg-gradient-to-r from-gray-900 to-gray-700 py-20 md:py-32 text-center relative dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-400">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-6xl font-bold animate-fade-in text-white">
              Impulsa el Éxito Estudiantil
            </h1>
            <p className="text-lg md:text-xl text-white mt-4 animate-fade-in-up">
              Transforma la gestión académica con herramientas avanzadas para
              monitorear, evaluar y potenciar el rendimiento estudiantil.
            </p>
            <div className="mt-8 animate-fade-in-up">
              <Link
                to={"/login"}
                className="btn btn-accent btn-lg active:scale-95 dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-400"
              >
                Iniciar Sesión!
              </Link>
            </div>
          </div>
        </section>
        <section id="features" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="animate-slide-in-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-12 h-12 text-primary"
                >
                  <rect width={8} height={4} x={8} y={2} rx={1} ry={1} />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                </svg>
                <h2 className="text-2xl font-bold mt-4 dark:text-blue-400">
                  Seguimiento de Calificaciones
                </h2>
                <p className="text-muted-foreground mt-2 dark:text-gray-300">
                  Monitorea fácilmente las calificaciones y el progreso de los
                  estudiantes. Obtén actualizaciones y análisis en tiempo real.
                </p>
              </div>
              <div className="animate-slide-in-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-12 h-12 text-primary"
                >
                  <line x1={12} x2={12} y1={20} y2={10} />
                  <line x1={18} x2={18} y1={20} y2={4} />
                  <line x1={6} x2={6} y1={20} y2={16} />
                </svg>
                <h2 className="text-2xl font-bold mt-4 dark:text-blue-400">
                  Informes Completos
                </h2>
                <p className="text-muted-foreground mt-2 dark:text-gray-300">
                  Genera informes de progreso detallados para estudiantes
                  individuales o para todo el cuerpo estudiantil.
                </p>
              </div>
              <div className="animate-slide-in-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-12 h-12 text-primary dark:text-blue-400"
                >
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                  <path d="M22 12A10 10 0 0 0 12 2v10z" />
                </svg>
                <h2 className="text-2xl font-bold mt-4 dark:text-blue-400">
                  Análisis Basados en Datos
                </h2>
                <p className="text-muted-foreground mt-2 dark:text-gray-300">
                  Aprovecha los poderosos análisis para identificar tendencias,
                  patrones y áreas de mejora.
                </p>
              </div>
              <div className="animate-slide-in-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={50}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-12 h-12 text-primary dark:text-blue-400"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width={18} height={18} x={3} y={4} rx={2} />
                  <path d="M3 10h18" />
                </svg>
                <h2 className="text-2xl font-bold mt-4 dark:text-blue-400">
                  Seguimiento de Asistencia
                </h2>
                <p className="text-muted-foreground mt-2 dark:text-gray-300">
                  Monitorea la asistencia y el compromiso de los estudiantes
                  para garantizar el éxito académico.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="stats" className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold animate-fade-in text-gray-900 dark:text-blue-400">
              Estadísticas Clave
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8 animate-fade-in-up">
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-gray-800 dark:text-gray-100"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight dark:text-blue-400">
                    Tasa de Aprobación
                  </h3>
                </div>
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                      <CartesianGrid
                        stroke="#ccc"
                        strokeDasharray="3 3"
                        strokeOpacity={0}
                      />
                      <XAxis
                        dataKey="name"
                        tickFormatter={(value) => value.slice(0, 3)}
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-gray-800 dark:text-gray-100"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight dark:text-blue-400">
                    Promedio de Calificaciones
                  </h3>
                </div>
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0} />{" "}
                      <XAxis
                        dataKey="name"
                        tickFormatter={(value) => value.slice(0, 3)}
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="pv" fill="#82ca9d" radius={10} />{" "}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm dark:bg-gray-800 dark:text-gray-100"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight dark:text-blue-400">
                    Distribución de Calificaciones
                  </h3>
                </div>
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    <footer className="bg-gray-900 py-6 text-white text-center animate-slide-up">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center">
          <div className="flex justify-center space-x-4 items-center">
            <Link
              to="/autores"
              className="flex items-center hover:text-purple-700 dark:hover:text-purple-400 font-bold transition-colors duration-300 dark:gradient-text p-2 rounded-md"
            >
              <SquareChevronRight size={18} className="mr-2" />
              <span>Equipo</span>
            </Link>
            <a
              href="https://github.com/Axlmd16/SSE_PIS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-purple-700 dark:hover:text-purple-400 font-bold transition-colors duration-300 dark:gradient-text p-2 rounded-md"
            >
              <Github size={18} className="mr-2" />
              <span>Git</span>
            </a>
            <Link
              to="/"
              className="flex items-center hover:text-purple-700 dark:hover:text-purple-400 font-bold transition-colors duration-300 dark:gradient-text p-2 rounded-md"
            >
              <FileCode size={18} className="mr-2" />
              <span>Documentación</span>
            </Link>
          </div>
        </div>
        <p className="text-sm mt-2">
          &copy; 2023 Sistema de Seguimiento Académico. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  </div>
);

export default Landing;
