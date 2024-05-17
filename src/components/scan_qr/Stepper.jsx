"use client";
import React, { useState, createContext } from "react";
import { useRouter } from "next/navigation";
import SignInContainer from "../sign_in/SignInContainer";
import BottomContainer from "./BottomContainer";
import OpenCameraContainer from "./open_camera/OpenCameraContainer";
import PriceInputContainer from "./price_input/PriceInputContainer";
import UserAvatar from "./../global/UserAvatar";
import TutorialContainer from "./tutorial/TutorialContainer";
import ConfirmationContainer from './confirmation/ConfirmationContainer';
import OpenScanContainer from './open_scan/OpenScanContainer';

import dynamic from 'next/dynamic'

const SummaryContainer = dynamic(() => import("./summary/SummaryContainer"), {
  ssr: false
})

const StepContext = createContext(0);

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  //const {setName} = useContext(FormContext)

  const step = [
    // {
    //   top: <SignInContainer.top />,
    //   bottom: <SignInContainer />,
    //   color: "accent",
    // },
    {
      bottom: <TutorialContainer />,
      color: "accent"
    },
    {
      top: <UserAvatar className="box-container pt-10" />,
      bottom: <PriceInputContainer />,
      color: "primary",
    },
    {
      top: <ConfirmationContainer />,
      bottom: null,
      color: "transparent",
    },
    {
      top: (
        <BottomContainer className="top-[6rem] !max-w-[350px] pt-5">
          <PriceInputContainer isCompact={true} />
        </BottomContainer>
      ),
      bottom: <OpenScanContainer />,
      color: "accent",
    },
    {
      top: <SummaryContainer />,
      bottom: null,
      color: "transparent",
    },
  ];

  const submitForm = () => { };

  const goNext = () => {
    if (currentStep >= step.length - 2) {
      submitForm();
    }

    if (currentStep >= step.length - 1) return;

    setCurrentStep(currentStep + 1);
  };

  const goBack = () => {
    setCurrentStep(currentStep - 1);
  };

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
