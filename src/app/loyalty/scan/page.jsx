"use client";
import React, { useContext, useState, useEffect } from "react";

import Stepper from "../../../components/scan_qr/Stepper";
import SummaryContainer from "../../../components/scan_qr/summary/SummaryContainer";
import { isMobile } from "react-device-detect";
import { CiMobile1 } from "react-icons/ci";
import { FormContext } from "../../../utils/scan_qr/FormProvider";

const ScanPage = () => {
  // User can access content only on mobile device
  // or is in development mode
  if (!isMobile && process.env.NEXT_PUBLIC_MODE !== "development") {
    return (
      <div className="info-page--accent">
        <h1 className="text-center text-background">
          Sorry, <br /> This app is mobile devices only.
        </h1>
        <CiMobile1 className="max-w-[200px] max-h-[200px] w-[80%] h-[80%] text-white/80 mx-auto mt-5 animate-shake" />
      </div>
    );
  }

  return (
    <div className="">
      <Stepper />
    </div>
  );
};

export default ScanPage;
