import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const HistoryGridBox = ({ onClick, historySum }) => {
  return (
    <div className="col-span-full bg-gradient-primary-lighter grid-box grid grid-cols-2 !p-4 !pb-0">
      <div className="flex flex-col items-start justify-between translate-x-[10px]">
        <h2 className="!text-xl !leading-6 !font-bold">
          {" "}
          Wow, <br /> you've piled up {historySum} points this week!
        </h2>
        <button
          href=""
          className="flex gap-2 items-center justify-center bg-gradient-primary text-white rounded-full px-5 py-1 mb-5 group"
          onClick={onClick}
        >
          Check <FaArrowRightLong className="group-hover:animate-slide" />
        </button>
      </div>
      <img src="/assets/go-you-tickets.svg" alt="tickets image" className="translate-y-[9px] translate-x-[10px]" />
    </div>
  );
};

export default HistoryGridBox;
