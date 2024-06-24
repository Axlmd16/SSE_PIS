import { useEffect, useState } from "react";

const BuscarAsignacionDocente = ({ actions, onDataSelect }) => {

    //*UseState de Docentes
    const [searchTermDocente, setSearchTermDocente] = useState('');
    const [searchResultsDocente, setSearchResultsDocente] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [DocentesAsignatura, setDocentesAsignatura] = useState([]);

    const handleSearchDocente = (event) => {
        const searchTerm = event.target.value;
        setSearchTermDocente(searchTerm);

        //* Verificar si Docentes tiene datos antes de filtrar
        if (DocentesAsignatura.length > 0) {
            const filteredResults = DocentesAsignatura.filter(person =>
                person.docente_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                person.asignatura_nombre.toLowerCase().includes(searchTerm.toLowerCase()) 
            );
            setSearchResultsDocente(filteredResults);
            setSelectedPerson(null); //* Limpiar la selección al cambiar el término de búsqueda
        }
    };

    //* Función para seleccionar una persona
    const handleSelectPerson = (person) => {
        setSelectedPerson(person);
        setSearchTermDocente('');
        setSearchResultsDocente([]);
        //* Sirve para enviar los datos seleccionados al componente padre
        onDataSelect(person);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataDocentes = await actions.get_all_docentes_asignaturas();
                setDocentesAsignatura(dataDocentes);
            } catch (error) {
                console.error("Error al obtener los docentes o las asignaturas:", error);
            }
        };

        fetchData();
    }, [actions]);

    return (
        <div className="">
            <div className="p-4 bg-white shadow rounded-lg">
                <input
                    type="text"
                    className="w-full px-3 py-2 mb-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    placeholder="Buscar personas..."
                    value={searchTermDocente}
                    onChange={handleSearchDocente}
                />

                <ul className="divide-y divide-gray-200">
                    {searchResultsDocente.map(person => (
                        <li
                            key={person.id}
                            onClick={() => handleSelectPerson(person)}
                            className="py-2 cursor-pointer hover:bg-gray-100"
                        >
                            {person.docente_nombre} - {person.asignatura_nombre}
                        </li>
                    ))}
                </ul>

                {selectedPerson && (
                    <div className="mt-4">
                        <h2 className="text-lg font-bold">Persona seleccionada:</h2>
                        <p className="mt-2">{selectedPerson.docente_nombre} {selectedPerson.asignatura_nombre}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuscarAsignacionDocente;
