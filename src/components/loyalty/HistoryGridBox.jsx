import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiQrScanLine } from "react-icons/ri";

const HistoryGridBox = ({ onClick, historySum }) => {
  return (
    <div
      onClick={onClick}
      className="col-span-full bg-gradient-primary-lighter grid-box grid grid-cols-2 !p-4 !pb-0 cursor-pointer h-[220px] relative"
    >
      <div className="flex flex-col items-start justify-between translate-x-[10px] z-10">
        <h2 className="!text-2xl !leading-8 !font-bold w-[13ch] pt-6">
          {" "}
          Wow, <br /> you've piled up {historySum} points
        </h2>
        <button
          href=""
          className="text-md flex gap-2 items-center justify-center bg-gradient-primary text-white rounded-lg px-3 py-2 mb-5 group"
          onClick={onClick}
        >
          Scan QR Code <RiQrScanLine className="w-[24px] h-[24px]" />
        </button>
      </div>
      <img
        src="/assets/go-you-tickets.svg"
        alt="tickets image"
        className="absolute bottom-[-9px] right-[4px] w-[60%]"
      />
    </div>
  );
};

export default HistoryGridBox;
