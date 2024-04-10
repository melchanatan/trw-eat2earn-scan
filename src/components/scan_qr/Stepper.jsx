"use client";
import React, { useState, createContext } from "react";
import { useRouter } from "next/navigation";
import SignInContainer from "../sign_in/SignInContainer";
import BottomContainer from "./BottomContainer";
import OpenCameraContainer from "./open_camera/OpenCameraContainer";
import PriceInputContainer from "./price_input/PriceInputContainer";
import SummaryContainer from "./summary/SummaryContainer";
import UserAvatar from "./../global/UserAvatar";
import { motion, AnimatePresence } from "framer-motion";

const StepContext = createContext(0);

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  //const {setName} = useContext(FormContext)

  const step = [
    // {
    //   top: <SignInContainer.top />,
    //   bottom: <SignInContainer />,
    //   color: "accent",
    // },
    {
      top: <UserAvatar className="box-container" />,
      bottom: <PriceInputContainer />,
      color: "primary",
    },
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
      top: <SummaryContainer />,
      bottom: null,
      color: "transparent",
    },
  ];

  const submitForm = () => {
    alert("Form submitted");
  };

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
