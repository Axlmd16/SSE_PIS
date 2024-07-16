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
          cursa.docente_nombre
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          cursa.ciclo_id.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="flex gap-4">
      <div className="relative p-4 bg-white shadow rounded-lg w-1/2">
        <input
          type="text"
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Buscar Estudiantes..."
          value={searchTermEstudiante}
          onChange={handleSearchDocente}
        />
        {searchTermEstudiante && (
          <button
            onClick={handleClearSearchEstudiante}
            className="absolute top-5 right-5 btn btn-ghost btn-sm"
          >
            <XCircle size={16} className="text-gray-800" />
          </button>
        )}
        <ul className="divide-y divide-gray-200 mt-2">
          {searchResultsEstudiante.map((person) => (
            <li
              key={person.id}
              onClick={() => handleSelectPerson(person)}
              className="py-2 cursor-pointer hover:bg-gray-100"
            >
              {person.primer_nombre} {person.segundo_nombre}{" "}
              {person.primer_apellido} {person.segundo_apellido}
            </li>
          ))}
        </ul>

        {selectedEstudiante && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Estudiante seleccionado:</h2>
            <p className="mt-2">
              {selectedEstudiante.primer_nombre}{" "}
              {selectedEstudiante.segundo_nombre}{" "}
              {selectedEstudiante.primer_apellido}{" "}
              {selectedEstudiante.segundo_apellido}
            </p>
          </div>
        )}
      </div>
      <div className="relative p-4 bg-white shadow rounded-lg w-1/2">
        <input
          type="text"
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Buscar Cursos..."
          value={searchTermCursa}
          onChange={handleSearchCursa}
        />
        {searchTermCursa && (
          <button
            onClick={handleClearSearchCursa}
            className="absolute top-5 right-5 btn btn-ghost btn-sm"
          >
            <XCircle size={16} className="text-gray-800" />
          </button>
        )}
        <ul className="divide-y divide-gray-200 mt-2">
          {searchResultsCursa.map((cursa) => (
            <li
              key={cursa.id}
              onClick={() => handleSelectCursa(cursa)}
              className="py-2 cursor-pointer hover:bg-gray-100"
            >
              {cursa.ciclo_id}° {cursa.paralelo} - {cursa.asignatura_nombre} -{" "}
              {cursa.docente_nombre}
            </li>
          ))}
        </ul>

        {selectedCursa && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Curso seleccionado:</h2>
            <p className="mt-2">{`${selectedCursa.ciclo_id}° - ${selectedCursa.paralelo} - ${selectedCursa.asignatura_nombre}`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuscarCursaEstudiante;
