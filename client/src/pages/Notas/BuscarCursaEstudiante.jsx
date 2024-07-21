import { XCircle } from "lucide-react";
import { useEffect, useState } from "react";

const BuscarCursaEstudiante = ({ actions, onDataSelect, update = false }) => {
  const [searchTermEstudiante, setSearchTermEstudiante] = useState("");
  const [searchResultsEstudiante, setSearchResultsEstudiante] = useState([]);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [Estudiantes, setEstudiantes] = useState([]);

  const [searchTermCursa, setSearchTermCursa] = useState("");
  const [searchResultsCursa, setSearchResultsCursa] = useState([]);
  const [selectedCursa, setSelectedCursa] = useState(null);
  const [Cursa, setCursa] = useState([]);

  const handleSearchDocente = (event) => {
    const searchTerm = event.target.value;
    setSearchTermEstudiante(searchTerm);

    if (Estudiantes.length > 0) {
      const filteredResults = Estudiantes.filter(
        (person) =>
          person.primer_nombre
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          person.segundo_nombre
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          person.primer_apellido
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          person.segundo_apellido
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setSearchResultsEstudiante(filteredResults);
      setSelectedEstudiante(null);
    }
  };

  const handleSearchCursa = (event) => {
    const searchTerm = event.target.value;
    setSearchTermCursa(searchTerm);

    if (Cursa.length > 0) {
      const filteredResults = Cursa.filter(
        (cursa) =>
          cursa.asignatura_nombre
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          cursa.paralelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cursa.docente_nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResultsCursa(filteredResults);
      setSelectedCursa(null);
    }
  };

  const handleSelectPerson = (estudiante) => {
    setSelectedEstudiante(estudiante);
    setSearchTermEstudiante("");
    setSearchResultsEstudiante([]);
    onDataSelect(estudiante, selectedCursa);
  };

  const handleSelectCursa = (cursa) => {
    setSelectedCursa(cursa);
    setSearchTermCursa("");
    setSearchResultsCursa([]);
    onDataSelect(selectedEstudiante, cursa);
  };

  const handleClearSearchEstudiante = () => {
    setSearchTermEstudiante("");
    setSearchResultsEstudiante([]);
    setSelectedEstudiante(null);
  };

  const handleClearSearchCursa = () => {
    setSearchTermCursa("");
    setSearchResultsCursa([]);
    setSelectedCursa(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataEstudiante = await actions.get_all_estudiantes();
        const dataCursa = await actions.get_all_cursas();
        setEstudiantes(dataEstudiante);
        setCursa(dataCursa);
      } catch (error) {
        console.error("Error al obtener los estudiantes y cursas:", error);
      }
    };

    fetchData();
  }, [actions]);

  return (
    <div className="flex gap-6">
      <div className="relative p-4 bg-white shadow-lg rounded-lg w-1/2 dark:bg-gray-800">
        <input
          type="text"
          className="w-full px-4 py-2 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Buscar Estudiantes..."
          value={searchTermEstudiante}
          onChange={handleSearchDocente}
        />
        {searchTermEstudiante && (
          <button
            onClick={handleClearSearchEstudiante}
            className="absolute top-5 right-5 btn btn-sm btn-circle dark:bg-green-700 dark:hover:bg-green-800 dark:text-white dark:border-none"
          >
            <XCircle size={20} />
          </button>
        )}
        <ul className="mt-3 divide-y divide-gray-200 dark:divide-gray-700">
          {searchResultsEstudiante.map((person) => (
            <li
              key={person.id}
              onClick={() => handleSelectPerson(person)}
              className="p-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-800 rounded-md transition-colors duration-150"
            >
              {person.primer_nombre} {person.segundo_nombre}{" "}
              {person.primer_apellido} {person.segundo_apellido}
            </li>
          ))}
        </ul>

        {selectedEstudiante && (
          <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Estudiante seleccionado:
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {selectedEstudiante.primer_nombre}{" "}
              {selectedEstudiante.segundo_nombre}{" "}
              {selectedEstudiante.primer_apellido}{" "}
              {selectedEstudiante.segundo_apellido}
            </p>
          </div>
        )}
      </div>
      <div className="relative p-4 bg-white shadow-lg rounded-lg w-1/2 dark:bg-gray-800">
        <input
          type="text"
          className="w-full px-4 py-2 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Buscar Cursos..."
          value={searchTermCursa}
          onChange={handleSearchCursa}
        />
        {searchTermCursa && (
          <button
            onClick={handleClearSearchEstudiante}
            className="absolute top-5 right-5 btn btn-sm btn-circle dark:bg-green-700 dark:hover:bg-green-800 dark:text-white dark:border-none"
          >
            <XCircle size={20} />
          </button>
        )}
        <ul className="mt-3 divide-y divide-gray-200 dark:divide-gray-700">
          {searchResultsCursa.map((cursa) => (
            <li
              key={cursa.id}
              onClick={() => handleSelectCursa(cursa)}
              className="p-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-800 rounded-md transition-colors duration-150"
            >
              {cursa.ciclo_id}° {cursa.paralelo} - {cursa.asignatura_nombre} -{" "}
              {cursa.docente_nombre}
            </li>
          ))}
        </ul>

        {selectedCursa && (
          <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Curso seleccionado:
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{`${selectedCursa.ciclo_id}° - ${selectedCursa.paralelo} - ${selectedCursa.asignatura_nombre}`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuscarCursaEstudiante;
