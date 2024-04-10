import React from "react";
import { TiStarFullOutline } from "react-icons/ti";

const HistoryGridBox = () => {
  return (
    <div className="bg-gradient-primary grid-box justify-center items-center flex-col text-background">
      <span className="p-1 bg-white/20 inline-block rounded-full mb-3">
        <TiStarFullOutline className="fill-secondary w-[32px] h-[32px] " />
      </span>
      <h2 className="font-medium">12,000</h2>
      <p className="">points</p>
    </div>
  );
};

export default HistoryGridBox;
