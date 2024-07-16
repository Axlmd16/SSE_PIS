import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BuscarAsignaturaDocente = ({ actions, onDataSelect, update = false }) => {
  //*UseState de Docentes
  const [searchTermDocente, setSearchTermDocente] = useState("");
  const [searchResultsDocente, setSearchResultsDocente] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [Docentes, setDocentes] = useState([]);

  //*UseState de Asignatura
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAsignatura, setSelectedAsignatura] = useState(null);
  const [Asignatura, setAsignatura] = useState([]);

  //*UseState de Periodos Academicos
  const [PeriodoAcedemico, setPeriodoAcedemico] = useState([]);

  const handleSearchDocente = (event) => {
    const searchTerm = event.target.value;
    setSearchTermDocente(searchTerm);

    //* Verificar si Docentes tiene datos antes de filtrar
    if (Docentes.length > 0) {
      const filteredResults = Docentes.filter(
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
            .includes(searchTerm.toLowerCase()) ||
          person.cubiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.dni.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResultsDocente(filteredResults);
      setSelectedPerson(null); //* Limpiar
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    //* Si Asignatura tiene datos antes de filtrar
    if (Asignatura.length > 0) {
      const filteredResults = Asignatura.filter((asignatura) =>
        asignatura.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
      setSelectedAsignatura(null); //* Limpiar
    }
  };

  //* Para seleccionar una docente
  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
    setSearchTermDocente("");
    setSearchResultsDocente([]);
    //* Enviar los datos seleccionados al componente padre
    onDataSelect(person, selectedAsignatura);
  };

  //* Para seleccionar una asignatura
  const handleSelectAsignatura = (asignatura) => {
    setSelectedAsignatura(asignatura);
    setSearchTerm("");
    setSearchResults([]);
    //* Enviar los datos seleccionados al componente padre
    onDataSelect(selectedPerson, asignatura);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataDocentes = await actions.get_all_docentes();
        const dataAsignatura = await actions.get_all_asignaturas();
        const dataPeriodoAcademico =
          await actions.get_all_periodos_academicos();
        setDocentes(dataDocentes);
        setAsignatura(dataAsignatura);
        setPeriodoAcedemico(dataPeriodoAcademico);
      } catch (error) {
        console.error(
          "Error al obtener los docentes o las asignaturas:",
          error
        );
      }
    };

    fetchData();
  }, [actions]);

  return (
    <div>
      {update ? (
        <div className="">
          <div className="p-4 bg-white shadow rounded-lg mb-6">
            <input
              type="text"
              className="w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Seleccione un Docente..."
              value={searchTermDocente}
              onChange={handleSearchDocente}
            />

            <ul className="divide-y divide-gray-200">
              {searchResultsDocente.map((person) => (
                <li
                  key={person.id}
                  onClick={() => handleSelectPerson(person)}
                  className="p-2 cursor-pointer hover:bg-gray-800 hover:text-white rounded-md"
                >
                  {person.primer_nombre} {person.segundo_nombre}{" "}
                  {person.primer_apellido} {person.segundo_apellido}
                </li>
              ))}
            </ul>

            {selectedPerson && (
              <div className="mt-4">
                <h2 className="text-lg font-bold">Docente seleccionado:</h2>
                <p className="mt-2">
                  {selectedPerson.primer_nombre} {selectedPerson.segundo_nombre}{" "}
                  {selectedPerson.primer_apellido}{" "}
                  {selectedPerson.segundo_apellido}
                </p>
              </div>
            )}
          </div>
          <div className="p-4 bg-white shadow rounded-lg mb-6">
            <input
              type="text"
              className="w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Buscar Asignatura..."
              value={searchTerm}
              onChange={handleSearch}
            />

            <ul className="divide-y divide-gray-200">
              {searchResults.map((asignatura) => (
                <li
                  key={asignatura.id}
                  onClick={() => handleSelectAsignatura(asignatura)}
                  className="p-2 cursor-pointer hover:bg-gray-800 hover:text-white rounded-md"
                >
                  {asignatura.nombre}
                </li>
              ))}
            </ul>

            {selectedAsignatura && (
              <div className="mt-4">
                <h2 className="text-lg font-bold">Asignatura seleccionada:</h2>
                <p className="mt-2">{selectedAsignatura.nombre}</p>
              </div>
            )}
          </div>
          <div className="my-2">
            <label className="text-black text-sm" htmlFor="genero">
              PeriodoAcademico
            </label>
            <select
              className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="peridodo_academico"
              aria-label="PeriodoAcademico"
            >
              {PeriodoAcedemico.map((periodo_academico) => (
                <option key={periodo_academico.id} value={periodo_academico.id}>
                  {periodo_academico.fecha_inicio} -{" "}
                  {periodo_academico.fecha_fin}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <div className="p-4 bg-white shadow rounded-lg w-1/3">
            <input
              type="text"
              className="w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Buscar personas..."
              value={searchTermDocente}
              onChange={handleSearchDocente}
            />

            <ul className="divide-y divide-gray-200">
              {searchResultsDocente.map((person) => (
                <li
                  key={person.id}
                  onClick={() => handleSelectPerson(person)}
                  className="p-2 cursor-pointer hover:bg-gray-800 hover:text-white rounded-md"
                >
                  {person.primer_nombre} {person.segundo_nombre}{" "}
                  {person.primer_apellido} {person.segundo_apellido}
                </li>
              ))}
            </ul>

            {selectedPerson && (
              <div className="mt-4">
                <h2 className="text-lg font-bold">Docente seleccionado:</h2>
                <p className="mt-2">
                  {selectedPerson.primer_nombre} {selectedPerson.segundo_nombre}{" "}
                  {selectedPerson.primer_apellido}{" "}
                  {selectedPerson.segundo_apellido}
                </p>
              </div>
            )}
          </div>
          <div className="p-4 bg-white shadow rounded-lg w-1/3">
            <div className="flex">
              <input
                type="text"
                className="w-full px-4 py-2 mb-4 leading-tight text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Buscar Asignatura..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <Link
                to={"/subjects"}
                className="btn btn-sm btn-ghost ml-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Plus size={18} />
              </Link>
            </div>

            <ul className="divide-y divide-gray-200">
              {searchResults.map((asignatura) => (
                <li
                  key={asignatura.id}
                  onClick={() => handleSelectAsignatura(asignatura)}
                  className="p-2 cursor-pointer hover:bg-gray-800 hover:text-white rounded-md"
                >
                  {asignatura.nombre}
                </li>
              ))}
            </ul>

            {selectedAsignatura && (
              <div className="mt-4">
                <h2 className="text-lg font-bold">Asignatura seleccionada:</h2>
                <p className="mt-2">{selectedAsignatura.nombre}</p>
              </div>
            )}
          </div>
          <div className="w-1/3 p-4 bg-white shadow rounded-lg  ">
            <div className="flex ">
              <select
                className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="peridodo_academico"
                aria-label="PeriodoAcademico"
              >
                {PeriodoAcedemico.map((periodo_academico) => (
                  <option
                    key={periodo_academico.id}
                    value={periodo_academico.id}
                    className="p-2 cursor-pointer hover:bg-gray-800 hover:text-white rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {periodo_academico.fecha_inicio} -{" "}
                    {periodo_academico.fecha_fin}
                  </option>
                ))}
              </select>
              <Link
                to={"#"}
                className="btn btn-sm btn-ghost ml-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Plus size={18} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuscarAsignaturaDocente;
