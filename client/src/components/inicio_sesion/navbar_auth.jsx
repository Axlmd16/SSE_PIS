import React, { useState, useEffect, useRef } from "react";

export default function Navbar_Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-end justify-between">
          <div className="relative ml-auto ">
            <button
              type="button"
              onClick={toggleDropdown}
              className="relative flex items-center rounded-full bg-gray-800 text-sm"
              id="user-menu-button"
              aria-expanded={isDropdownOpen ? "true" : "false"}
              aria-haspopup="true"
            >
              <img
                className="h-10 w-10 rounded-full object-cover"
                src="/img/user.png"
                alt="user.png"
              />
            </button>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                >
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
