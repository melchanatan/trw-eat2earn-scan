import React, { useContext, useEffect, useState, useRef } from "react";

import { IoSearch } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";

const Searchbar = ({
  searchTerm,
  setSearchTerm,
  filteredItems,
  setFilteredItems,
  allItems,
  setSelectedItem,
  onSelect,
}) => {
  const wrapperRef = useRef(null);
  const [showingOption, setShowingOption] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = () => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowingOption(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const searchTerm = e.target.value.toLowerCase();
    const filtered = allItems.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm);
    });
    setFilteredItems(filtered);
  };

  return (
    <div>
      <span className=" px-3 py-2 rounded-full flex items-center gap-2 bg-white !border-gray-500 text-black mb-2 relative">
        <IoSearch className="fill-gray-500" />
        <input
          onClick={() => setShowingOption(true)}
          tabIndex={0}
          type="text"
          onChange={handleSearch}
          value={searchTerm}
          placeholder={"search..."}
          className="placeholder:text-gray-500 placeholder:select-none focus:outline-none bg-transparent paragraph text-center w-full pr-2"
        />
      </span>
      {showingOption && searchTerm != 0 && (
        <ul className="p-2 bg-white text-black rounded-xl flex flex-col my-2 absolute min-w-[230px] right-[50%] translate-x-[50%]">
          {filteredItems.length != 0 ? (
            filteredItems.map((item, index) => {
              return (
                <li
                  key={"search-result-" + index}
                  tabIndex={0}
                  className="p-2 hover:bg-gray-400 flex-1 rounded-lg"
                  onClick={() => {
                    setSearchTerm(item.name);
                    setShowingOption(false);
                    setSelectedItem(item);
                    onSelect();
                  }}
                >
                  <a> {item.name} </a>
                </li>
              );
            })
          ) : (
            <p className="text-gray-400">no search result</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
