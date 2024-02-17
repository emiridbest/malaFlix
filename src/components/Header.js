import React, { useState } from 'react';
import { MagnifyingGlassIcon, BellAlertIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [searchVisible, setSearchVisible] = useState(false); // State for search visibility
  const [searchValue, setSearchValue] = useState(''); // State for search input value

  // Function to handle search icon click
  const handleSearchIconClick = () => {
    setSearchVisible(true);
  };

  return (
    <header className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-red-500">MalaFlix</div>
        <nav>
          <ul className="flex space-x-6 text-white">
            <li className="cursor-pointer hover:text-red-500">Home</li>
            <li className="cursor-pointer hover:text-red-500">TV Shows</li>
            <li className="cursor-pointer hover:text-red-500">Movies</li>
            <li className="cursor-pointer hover:text-red-500">My List</li>
            <li className="relative mr-0 flex flex-row px-8 gap-7">
              {searchVisible ? (
                <div className="relative">
                  <input
                    className="border-2 border-gray-300 bg-white text-prosperity h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search"
                    name="search"
                    placeholder="Search for videos here"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 mt-2 mr-2"
                  >
                    <MagnifyingGlassIcon className="text-snow transition" />
                  </button>
                </div>
              ) : (
                <div
                  className="text-snow hover:text-snow cursor-pointer"
                  onClick={handleSearchIconClick}
                >
                  <MagnifyingGlassIcon className="h-8" />
                </div>
              )}
              <div className="text-snow-100 hover:text-snow cursor-pointer">
                <BellAlertIcon className="h-8" />
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
