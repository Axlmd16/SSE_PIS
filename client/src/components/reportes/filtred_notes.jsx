import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

function Filtred_notes({
  handleSearch,
  performanceFilter,
  setPerformanceFilter,
  studentCount,
  setStudentCount,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { label: "Todos", value: "" }, // Opción para limpiar el filtro
    { label: "Bajo rendimiento", value: "Bajo rendimiento" },
    { label: "Alto rendimiento", value: "Alto rendimiento" },
  ];

  const handleSelect = (option) => {
    setPerformanceFilter(option.value);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between items-center my-2  w-full">
      {/* Sección de búsqueda */}
      <div className="flex items-center">
        <Search className="mr-2 text-gray-600" size={20} />
        <input
          className="input rounded-lg border border-gray-400 font-poppins w-auto h-8 text-sm px-2 py-1"
          type="text"
          onChange={handleSearch}
          placeholder="Buscar"
        />
      </div>

      {/* Sección de filtro de rendimiento */}
      <div className="relative ml-4">
        <div
          className="flex items-center bg-white rounded-lg shadow-sm border border-gray-300 p-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-sm text-gray-500 truncate">
            {performanceFilter || "Tipo de reporte"}
          </span>
          <ChevronDown className="text-gray-500 w-4 h-4 ml-2" />
        </div>
        {isOpen && (
          <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-md z-10 text-sm">
            {options.map((option, index) => (
              <li
                key={index}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  option.value === performanceFilter ? "bg-gray-100" : ""
                }`}
                onMouseDown={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sección de entrada de cantidad de estudiantes */}
      {performanceFilter && (
        <input
          type="number"
          value={studentCount}
          onChange={(e) => setStudentCount(e.target.value)}
          placeholder="Cantidad"
          className="input rounded-lg border border-gray-400 font-poppins w-1/5 h-8 text-sm px-2 py-1"
        />
      )}
    </div>
  );
}

export default Filtred_notes;
