import { useContext, useEffect, useState } from "react";
import { Context } from "../../../store/context";

const PerfilUsuario = () => {
    const { store, actions } = useContext(Context);
    const [infoDocente, setInfoDocente] = useState(null);
    const [loading, setLoading] = useState(true);

    const personaString = sessionStorage.getItem("persona");
    const persona = JSON.parse(personaString || "{}");

    const id_docente = persona.id;

    // console.log(id_docente);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await actions.get_docente(id_docente);
                setInfoDocente(data);
            } catch (error) {
                console.error("Error al obtener la información del docente:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [actions, id_docente]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl">
                <h1 className="text-3xl font-extrabold mb-6 text-gray-900 border-b-2 border-gray-200 pb-3 text-center">Perfil del Usuario</h1>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                    </div>
                ) : infoDocente ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                            <div className="mb-6">
                                <label className="block text-gray-700 font-bold">Nombre</label>
                                <span className="block text-gray-800 text-lg">{infoDocente.primer_nombre} {infoDocente.segundo_nombre}</span>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 font-bold">Apellidos</label>
                                <span className="block text-gray-800 text-lg">{infoDocente.primer_apellido} {infoDocente.segundo_apellido}</span>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 font-bold">Título</label>
                                <span className="block text-gray-800 text-lg">{infoDocente.titulo}</span>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 font-bold">Cubículo</label>
                                <span className="block text-gray-800 text-lg">{infoDocente.cubiculo}</span>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                            <div className="mb-6">
                                <label className="block text-gray-700 font-bold">Teléfono</label>
                                <span className="block text-gray-800 text-lg">{infoDocente.telefono}</span>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 font-bold">DNI</label>
                                <span className="block text-gray-800 text-lg">{infoDocente.dni}</span>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 font-bold">Correo Electrónico</label>
                                <span className="block text-gray-800 text-lg">{infoDocente.email}</span>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 font-bold">Experiencia Laboral</label>
                                <span className="block text-gray-800 text-lg">{infoDocente.experiencia_laboral} años</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No se encontró información del docente.</p>
                )}
            </div>
        </div>
    );
}

export default PerfilUsuario;
