import React, { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Searchbar = ({
  searchTerm,
  setSearchTerm,
  filteredItems,
  setFilteredItems,
  allItems,
}) => {
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
    <>
      <span className=" px-3 py-2 rounded-full flex items-center gap-2 glassmorphism !border-gray-500 ">
        <IoSearch className="fill-gray-500" />
        <input
          type="text"
          onChange={handleSearch}
          value={searchTerm}
          placeholder={"search..."}
          className="placeholder:text-gray-500 placeholder:select-none focus:outline-none bg-transparent paragraph text-center w-full pr-2"
        />
      </span>
      <div>
        {filteredItems.map((item, index) => {
          return <li> {item} </li>;
        })}
      </div>
    </>
  );
};

export default Searchbar;
