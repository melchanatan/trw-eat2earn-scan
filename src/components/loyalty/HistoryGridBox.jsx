import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiQrScanLine } from "react-icons/ri";

const HistoryGridBox = ({ onClick, historySum }) => {
  return (
    <div
      onClick={onClick}
      className="col-span-full bg-gradient-primary-lighter grid-box grid grid-cols-2 !p-4 !pb-0 cursor-pointer h-[220px] relative"
    >
      <div className="ml-auto flex flex-col items-start justify-between translate-x-[10px] z-10">
        <tl className="text-sm w-[20ch] pt-6 list-decimal text-slate-600">
          <li>Enter your spend amount</li>
          <li>Upload your receipt</li>
          <li>Scan the restaurant QR code</li>
        </tl>
        <button
          href=""
          className="text-md flex gap-2 items-center justify-center bg-gradient-primary text-white rounded-lg px-3 py-2 mb-5 group"
          onClick={onClick}
        >
          Scan QR Code <RiQrScanLine className="w-[24px] h-[24px]" />
        </button>
      </div>
      <img
        src="/assets/eat2earn-tickets.svg"
        alt="tickets image"
        className="absolute bottom-[-9px] left-[4px] w-[60%]"
      />
    </div>
  );
};

export default HistoryGridBox;
