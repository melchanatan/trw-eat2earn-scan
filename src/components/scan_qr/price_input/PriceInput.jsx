import React, { useContext } from "react";
import { FormContext } from "../../../utils/scan_qr/FormProvider";

const PriceInput = () => {
  const { amount, setAmount } = useContext(FormContext);

  const handleChange = (e) => {
    var buffer = e.target.value;
    // handle us dollar formatting

    // remove leading zero
    if (buffer.startsWith("0")) {
      buffer = buffer.substring(1);
    }

    // limit to 2 decimal places
    if (buffer.includes(".")) {
      const parts = buffer.split(".");
      if (parts[1].length > 2) {
        buffer = parts[0] + "." + parts[1].substring(0, 2);
      }
    }

    setAmount(buffer);
  };

  const handleOnBlur = (e) => {
    var buffer = e.target.value;

    // handle us dollar formatting
    if (buffer === "" || buffer === "0" || buffer === ".00") {
      buffer = "0.00";
    }

    // set .00 on the back of the string
    if (!buffer.includes(".")) {
      buffer = buffer + ".00";
    }

    // set 0 on the front of the string
    if (buffer.startsWith(".")) {
      buffer = "0" + buffer;
    }

    // add leading zero if there is only one decimal placement
    if (buffer.includes(".")) {
      const parts = buffer.split(".");
      if (parts[1].length < 2) {
        buffer = parts[0] + "." + parts[1] + "0";
      }
    }

    setAmount(buffer);
  };

  return (
    <div className="input !px-6">
      <input
        value={amount}
        type="number"
        min="1"
        step="any"
        className="bg-transparent text-lg text-black outline-0 font-futura placeholder:text-gray-300 text-center w-full"
        placeholder="0.00"
        onChange={handleChange}
        onBlur={handleOnBlur}
      />

      <div className="flex items-center">
        <div className="h-[28px] bg-red-300/50 w-[2px] mx-2"></div>
        <span className="text-xl  text-primary font-avant">$</span>
      </div>
    </div>
  );
};

export default PriceInput;
