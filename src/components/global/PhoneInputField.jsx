import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PhoneInputField = ({ value, setValue }) => {
  const handleChange = (e) => {
    //TODO: validate phone number and format string for better UX

    setValue(e.target.value);
    isValidPhoneNumber(value);
  };

  return (
    <div className="mt-2 input">
      <PhoneInput
        international
        placeholder="+00 00-000-0000"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default PhoneInputField;
