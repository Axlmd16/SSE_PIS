import React, { useState } from "react";
import { Search, XCircle } from "lucide-react";

const SearchableDropdown = ({
  options,
  label,
  placeholder,
  onSelect,
  displayKey,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const filteredOptions = options.filter((option) =>
    option[displayKey].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
    setSearchTerm(option ? option[displayKey] : "");
    onSelect(option === selectedOption ? null : option);
    setIsOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedOption(null);
    onSelect(null);
  };

  return (
    <div className="relative w-full">
      <label className="block text-gray-700 mb-2.5 text-sm">{label}</label>
      <div className="flex items-center border border-gray-300 rounded focus-within:ring p-1 bg-white">
        <Search className="text-gray-500 mr-2 w-4 h-4" />
        <input
          type="text"
          className="w-full focus:outline-none text-sm"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="text-gray-500 hover:text-gray-700 focus:outline-none btn btn-sm"
          >
            <XCircle size={16} />
          </button>
        )}
      </div>
      {isOpen && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full rounded shadow mt-1 max-h-40 overflow-y-auto text-sm">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
                option === selectedOption ? "bg-gray-100" : ""
              }`}
              onMouseDown={() => handleSelect(option)}
            >
              {option[displayKey] + " " + option.paralelo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
