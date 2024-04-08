"use client";
import React, { useState, useEffect } from "react";
import ProgressGridBox from "../../global/ProgressGridBox";
import Confetti from "react-confetti";
import Lottie from "react-lottie";
import * as animationData from "../../../../public/assets/done-lottie.json";

const SummaryContainer = () => {
  const [currentPoint, setCurrentPoint] = useState(451);
  const fetchUserData = async () => {
    //TODO: fetch user current Point point and setCurrentPoint
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const redirect = () => {
    //TODO: redirect back to home page
  };

  return (
    <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-full gap-3">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.3}
        recycle={false}
        onConfettiComplete={redirect}
        initialVelocityY={10}
      />
      <ProgressGridBox point={currentPoint} maxPoint={500} />
      <div className="box-container rounded-[14px] bg-gradient-primary p-[32px]">
        <h1 className="text-background pb-5">
          Yay, <br />
          you have receive 14 points
        </h1>
        <Lottie options={defaultOptions} height={140} width={140} />
      </div>
      <div className="h-10"></div>
    </div>
  );
};

export default SummaryContainer;
