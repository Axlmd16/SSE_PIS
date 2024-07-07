import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({ options, label, onSelect, displayKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
    onSelect(option === selectedOption ? null : option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <label className="block text-gray-700 mb-1 text-sm">{label}</label>
      <div
        className="flex items-center border border-gray-300 rounded focus-within:ring p-1 bg-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm flex-1 truncate pr-2 text-gray-500">
          {selectedOption ? selectedOption[displayKey] : "Seleccione"}
        </span>
        <ChevronDown className="text-gray-500 w-4 h-4" />
      </div>
      {isOpen && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full rounded shadow mt-1 max-h-40 overflow-y-auto text-sm">
          <li
            className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
              selectedOption === null ? "bg-gray-100" : ""
            }`}
            onMouseDown={() => handleSelect(null)}
          >
            Ninguna
          </li>
          {options.map((option, index) => (
            <li
              key={index}
              className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
                option === selectedOption ? "bg-gray-100" : ""
              }`}
              onMouseDown={() => handleSelect(option)}
            >
              {option[displayKey]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
