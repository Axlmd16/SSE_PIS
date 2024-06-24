import { Search } from "lucide-react";
import React from "react";

function SearchBar({ handleSearch }) {
  return (
    <div>
      <div className="flex justify-start items-center my-5">
        <Search className="mr-2" size={20} />
        <input
          className="input rounded-lg border border-gray-400 font-poppins w-1/5 h-8 text-sm px-2 py-1"
          type="text"
          onChange={handleSearch}
          placeholder="Buscar"
        />
      </div>
    </div>
  );
}

export default SearchBar;
