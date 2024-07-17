import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({ options, label, onSelect, displayKey, resetKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSelectedOption(null);
  }, [resetKey]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
    onSelect(option === selectedOption ? null : option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-gray-700 mb-1 text-sm font-medium">
        {label}
      </label>
      <div
        className="flex items-center border border-gray-300 rounded-md focus-within:ring focus-within:ring-blue-500 p-2 bg-white cursor-pointer shadow-sm transition duration-200 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm flex-1 truncate pr-2 text-gray-500">
          {selectedOption ? selectedOption[displayKey] : "Seleccione"}
        </span>
        <ChevronDown className="text-gray-500 w-5 h-5" />
      </div>
      {isOpen && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto text-sm transition duration-200 ease-in-out">
          <li
            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
              selectedOption === null ? "bg-gray-100" : ""
            }`}
            onMouseDown={() => handleSelect(null)}
          >
            Ninguna
          </li>
          {options.map((option, index) => (
            <li
              key={index}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
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
