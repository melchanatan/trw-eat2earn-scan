import React from "react";

const PhoneInput = ({ value, setValue }) => {
  const handleChange = (e) => {
    //TODO: validate phone number and format string for better UX
    
    setValue(e.target.value);
  };

  return (
    <div className="mt-2 input">
      <div className="flex gap-2">
        <img src="/assets/usa-flag-avatar.png" alt="" />
        <h4>US+1</h4>
      </div>
      <div className="h-[28px] bg-red-300/50 w-[2px] mx-2"></div>

      <input
        type="number"
        value={value}
        onChange={handleChange}
        className="bg-transparent text-lg text-black outline-0 font-futura placeholder:text-gray-300 text-center "
        placeholder="(000) 000 - 0000"
      />
    </div>
  );
};

export default PhoneInput;
