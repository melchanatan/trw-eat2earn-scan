import React from "react";
import ProgressGridBox from "../../global/ProgressGridBox";

const SummaryContainer = () => {
  return (
    <div className="flex flex-col gap-3">
      <ProgressGridBox />
      <div className="box-container rounded-[14px] bg-gradient-primary p-[32px]">
        <h1 className="text-background">
          Yay, <br />
          you have receive 14 points
        </h1>
      </div>
    </div>
  );
};

export default SummaryContainer;
