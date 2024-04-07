"use client";
import React, { useState, createContext } from "react";
import SignInContainer from "./sign_in/SignInContainer";
import BottomContainer from "./BottomContainer";
import OpenCameraContainer from "./open_camera/OpenCameraContainer";
import PriceInputContainer from "./price_input/PriceInputContainer";
import SummaryContainer from "./summary/SummaryContainer";
import UserAvatar from "./../global/UserAvatar";

const StepContext = createContext(0);

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const goNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const goBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const step = [
    {
      top: (
        <BottomContainer className="top-[6rem] !max-w-[350px] pt-5">
          <PriceInputContainer isCompact={true} />
        </BottomContainer>
      ),
      bottom: <OpenCameraContainer />,
      color: "accent",
    },
    {
      top: <SignInContainer.top />,
      bottom: <SignInContainer />,
      color: "accent",
    },
    {
      top: <UserAvatar />,
      bottom: <PriceInputContainer />,
      color: "primary",
    },
  ];

  const currentContainer = step[currentStep];
  return (
    <StepContext.Provider value={{ currentStep, goNext, goBack }}>
      {currentContainer.top}

      <BottomContainer color={currentContainer.color}>
        {currentContainer.bottom}
      </BottomContainer>
    </StepContext.Provider>
  );
};

export { StepContext, Stepper as default };
