"use client";
import React, { useState, useContext } from "react";
import Button from "../../global/Button";
import { FaCamera } from "react-icons/fa";
import Image from "next/image";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { FormContext } from "../../../utils/scan_qr/FormProvider";
import { StepContext } from "../Stepper";
import { UserInfoContext } from "../../../utils/UserInfoProvider";
import { Scanner } from "@yudiel/react-qr-scanner";
import BackButton from "../../global/BackButton";

const OpenScanContainer = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <div className="flex items-center flex-col">
      {isCameraOpen ? (
        <QrScanner setIsCameraOpen={setIsCameraOpen} />
      ) : (
        <WebcamPlaceholder onClick={() => setIsCameraOpen(true)} />
      )}
    </div>
  );
};

export default OpenScanContainer;

const WebcamPlaceholder = ({ onClick }) => {
  return (
    <>
      <h1 className="mb-[40px] text-center text-primary flex items-center flex-col">
        Snap QR code <br />{" "}
        <h3 className="text-xl opacity-80 w-[20ch]">
          from the staff and let the points roll in!
        </h3>
      </h1>
      <Image
        src={"/assets/scan-qr-graphic.png"}
        width={150}
        height={150}
        alt="receipt-icon"
        className="mb-6"
      />
      <p className="text-primary/70 text-center mb-8 w-[26ch]">
        Oh, and don’t forget to enable your camera.
      </p>
      <Button onClick={onClick} color="purple">
        Open camera <FaCamera className="w-[16px] h-[16px]" />
      </Button>
    </>
  );
};

const QrScanner = ({ setIsCameraOpen }) => {
  const { setRestaurantId, setRestaurantName } = useContext(FormContext);
  const { goNext } = useContext(StepContext);
  let Audio;
  if (typeof window !== "undefined") {
    Audio = window.Audio;
  }

  const fetchRestaurantName = async ({ text }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/v1/rest`
      );
      const data = await response.json();
      data.map((item) => {
        if (item.id == text) setRestaurantName(item.title);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleResult = async (text, result) => {
    await fetchRestaurantName({ text });
    setRestaurantId(text);
    goNext();
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mb-10">
      <h1 className="mb-[20px] text-primary">Snap the QR code</h1>
      {Audio && (
        <Scanner
          onResult={handleResult}
          onError={(error) => console.log(error?.message)}
          components={{
            audio: false,
          }}
        />
      )}
      <a
        onClick={(e) => {
          e.preventDefault();
          setIsCameraOpen(false);
        }}
        className="absolute bottom-20 left-10 mt-20"
      >
        <FaArrowLeftLong className="w-[24px] h-[24px] fill-primary" />
      </a>
    </div>
  );
};
