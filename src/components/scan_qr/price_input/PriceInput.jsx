import React from "react";

const PriceInput = () => {
  return (
    <div className="input !px-6">
      <input
        type="number"
        min="1"
        step="any"
        className="bg-transparent text-lg text-black outline-0 font-futura placeholder:text-gray-300 text-center w-full"
        placeholder="0.00"
      />

      <div className="flex items-center">
        <div className="h-[28px] bg-red-300/50 w-[2px] mx-2"></div>
        <span className="text-xl  text-primary font-avant">$</span>
      </div>
    </div>
  );
};

export default PriceInput;
