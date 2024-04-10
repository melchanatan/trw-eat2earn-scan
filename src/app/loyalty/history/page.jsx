import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
import BackButton from "../../../components/global/BackButton";

const HistoryPage = () => {
  return (
    <div className="h-screen flex flex-col justify-end  box-container">
      <BackButton />
      <h2 className="mb-10">Your reward history</h2>
      <div className="h-[80vh] w-full bg-gradient-accent-lighter rounded-t-[14px] p-5 overflow-y-auto">
        <HistoryListItem />
      </div>
    </div>
  );
};

export default HistoryPage;

const HistoryListItem = () => {
  return (
    <div className="w-full border-background border-[1px] rounded-[12px] text-background p-5 flex justify-between ">
      <div>
        <p className="opacity-60 font-thin">restaurant</p>
        <h3 className="text-xl">mels kitchen</h3>
      </div>

      <h3 className="flex flex-row items-center gap-2 text-xl ">
        +40
        <TiStarFullOutline className="w-[32px] h-[32px] text-secondary" />
      </h3>
    </div>
  );
};
