import { useContext, useEffect, useState } from "react";
import { Context } from "../../../store/context";
import { Link } from "react-router-dom";

const CursosDocente = () => {
  const { store, actions } = useContext(Context);

  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  const personaString = sessionStorage.getItem("persona");
  const persona = JSON.parse(personaString || "{}");

  const id_docente = persona.id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await actions.get_all_cursos_docente(id_docente);
        // const data = await actions.get_all_docentes_asignaturas(id_docente);
        setCursos(data);
      } catch (error) {
        console.error("Error al obtener los docentesAsignaturas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [actions, id_docente]);

  // Función para formatear la fecha
  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-white via-white to-white dark:bg-gradient-to-bg dark:from-gray-800 dark:via-gray-900 dark:to-gray-950">

    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 dark:text-blue-400">Cursos del Docente</h2>
      {loading ? (
        <p className="dark:text-blue-400">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cursos.map((curso) => (
            <Link
              to={`/course/detail/${curso.curso_id}/${curso.asignatura_id}`}
              key={curso.curso_id}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img
                  src="../../../../public/img/unl.jpg"
                  className="w-full object-cover"
                  style={{ height: "200px" }}
                />
                <div className="p-4 dark:bg-green-900">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center dark:text-gray-300">
                    {curso.asignatura_nombre} - {curso.curso_paralelo}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Periodo académico: <br />
                    {formatearFecha(
                      curso.periodo_academico_fecha_inicio
                    )} - {formatearFecha(curso.periodo_academico_fecha_fin)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default CursosDocente;
