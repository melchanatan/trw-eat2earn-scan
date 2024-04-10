"use client";
import React, { useState, useContext } from "react";
import Button from "../../global/Button";
import { FaCamera } from "react-icons/fa";
import Image from "next/image";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import MyWebcam from "../../global/MyWebcam";
import { FormContext } from "../../../utils/scan_qr/FormProvider";
import { StepContext } from "../Stepper";
import { UserInfoContext } from "../../../utils/scan_qr/UserInfoProvider";

const OpenCameraContainer = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <div className="flex items-center flex-col">
      {isCameraOpen ? (
        <WebcamComponent setIsCameraOpen={setIsCameraOpen} />
      ) : (
        <WebcamPlaceholder onClick={() => setIsCameraOpen(true)} />
      )}
    </div>
  );
};

export default OpenCameraContainer;

const WebcamComponent = ({ setIsCameraOpen }) => {
  const { image, setImage, amount } = useContext(FormContext);
  const { goNext } = useContext(StepContext);

  const onSubmit = () => {
    goNext();
  };

  const retake = () => {
    setImage("");
  };

  return (
    <>
      <h1 className="mb-[20px] text-center text-background">
        Make sure to get the whole receipt
      </h1>
      {image ? (
        <>
          <img
            src={image}
            alt="your receipt"
            className="max-h-[300px] w-full object-cover mb-3 rounded-[14px]
            "
          />
          <div className="flex items-center justify-between w-full">
            <a onClick={() => retake()} className="link-button">
              Retake?
            </a>
            <Button onClick={onSubmit}>
              Submit <FaArrowRightLong />
            </Button>
          </div>
        </>
      ) : (
        <div className="pb-10">
          <MyWebcam setImage={setImage} />
          <a
            onClick={(e) => {
              e.preventDefault();
              setIsCameraOpen(false);
            }}
            className="absolute bottom-20 left-10"
          >
            <FaArrowLeftLong className="w-[24px] h-[24px] fill-background" />
          </a>
        </div>
      )}
    </>
  );
};

const WebcamPlaceholder = ({ onClick }) => {
  return (
    <>
      <h1 className="mb-[40px] text-center text-background">
        Take an image <br /> of your receipt
      </h1>
      <Image
        src={"/assets/receipt-icon.png"}
        width={150}
        height={150}
        alt="receipt-icon"
        className="mb-6"
      />
      <p className="text-white/70 text-center mb-8">
        Don’t forget to enable camera permission on the popup
      </p>
      <Button onClick={onClick}>
        Open camera <FaCamera className="w-[24px] h-[24px]" />
      </Button>
    </>
  );
};
