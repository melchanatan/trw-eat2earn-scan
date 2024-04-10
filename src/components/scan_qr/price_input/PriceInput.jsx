import React, { useContext } from "react";
import { FormContext } from "../../../utils/scan_qr/FormProvider";

const PriceInput = () => {
  const { amount, setAmount } = useContext(FormContext);

  return (
    <div className="input !px-6">
      <input
        value={amount}
        type="number"
        min="1"
        step="any"
        className="bg-transparent text-lg text-black outline-0 font-futura placeholder:text-gray-300 text-center w-full"
        placeholder="0.00"
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="flex items-center">
        <div className="h-[28px] bg-red-300/50 w-[2px] mx-2"></div>
        <span className="text-xl  text-primary font-avant">$</span>
      </div>
    </div>
  );
};

export default PriceInput;
