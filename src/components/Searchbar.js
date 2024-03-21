import React, { useContext, useEffect, useState, useRef } from "react";

import { IoSearch } from "react-icons/io5";

const Searchbar = ({
  searchTerm,
  setSearchTerm,
  filteredItems,
  setFilteredItems,
  allItems,
}) => {
  const wrapperRef = useRef(null);
  const [showingOption, setShowingOption] = useState(false);
  const toggleShowingOption = () => {
    setShowingOption((prev) => !prev);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return document.addEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = () => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowingOption(false);
    }
  };

  const handleSearch = (e) => {
    console.log(filteredItems);
    setSearchTerm(e.target.value);
    const searchTerm = e.target.value.toLowerCase();
    const filtered = allItems.filter((item) => {
      return item.toLowerCase().includes(searchTerm);
    });
    setFilteredItems(filtered);
  };

  return (
    <div onClick={() => setShowingOption(true)} ref={wrapperRef}>
      <span className=" px-3 py-2 rounded-full flex items-center gap-2 bg-white !border-gray-500 text-black">
        <IoSearch className="fill-gray-500" />
        <input
          type="text"
          onChange={handleSearch}
          value={searchTerm}
          placeholder={"search..."}
          className="placeholder:text-gray-500 placeholder:select-none focus:outline-none bg-transparent paragraph text-center w-full pr-2"
        />
      </span>
      {showingOption && (
        <div className="p-2 bg-white text-black rounded-xl flex flex-col mt-2">
          {filteredItems.length != 0 ? (
            filteredItems.map((item, index) => {
              return (
                <a className="p-2 hover:bg-gray-400 flex-1 rounded-lg">
                  {" "}
                  {item}{" "}
                </a>
              );
            })
          ) : (
            <p className="text-gray-400">no search result</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
