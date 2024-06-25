import { useContext, useEffect, useState } from "react";
import { Context } from "../../../store/context";
import { Link } from "react-router-dom";

const CursosDocente = () => {
    const { store, actions } = useContext(Context);

    const [docenteCursos, setDocenteCursos] = useState([]);
    const [loading, setLoading] = useState(true);

    const personaString = sessionStorage.getItem("persona");
    const persona = JSON.parse(personaString || "{}");
    //console.log("Persona autenticada:", persona);
    //console.log("Persona ID:", persona.id);

    const id_docente = persona.id

    console.log(`Persona autenticada informacion: ${store.persona_auth}`);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await actions.get_all_docentes_asignaturas();
                // console.log(data);
                const docente_cursos = data.filter((item) => item.docente_id === id_docente);
                // console.log(docente_cursos);
                setDocenteCursos(docente_cursos);
            } catch (error) {
                console.error("Error al obtener los docentesAsignaturas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [actions, id_docente]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Cursos del Docente</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {docenteCursos.map((curso) => (
                            <Link to={`/tabla_calificaciones/${curso.id}/${curso.asignatura_nombre}`} key={curso.id}>
                            <div className="bg-white rounded-lg overflow-hidden shadow-md">
                                <img
                                    src="../../../../public/img/unl.jpg"
                                    className="w-full object-cover"
                                    style={{ height: "200px" }}
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">{curso.asignatura_nombre}</h3>
                                    <p className="text-sm text-gray-600">Docente: {curso.docente_nombre}</p>
                                    <p className="text-sm text-gray-600">Periodo académico: {curso.periodo_academico_fecha_inicio} - {curso.periodo_academico_fecha_fin}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CursosDocente;
