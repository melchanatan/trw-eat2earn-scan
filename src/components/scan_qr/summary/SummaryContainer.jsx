"use client";
import React, { useState, useEffect } from "react";
import ProgressGridBox from "../../global/ProgressGridBox";

const SummaryContainer = () => {
  const [currentPoint, setCurrentPoint] = useState(451);
  const fetchUserData = async () => {
    //TODO: fetch user current Point point and setCurrentPoint
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <ProgressGridBox point={currentPoint} maxPoint={500} />
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
