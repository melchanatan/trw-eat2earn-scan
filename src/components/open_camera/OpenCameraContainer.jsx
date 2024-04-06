"use client";
import React, { useState } from "react";
import BottomContainer from "../global/BottomContainer";
import Button from "../global/Button";
import { FaCamera } from "react-icons/fa";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

import MyWebcam from "./../MyWebcam";
const OpenCameraContainer = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <div>
      <BottomContainer color="accent" className="flex  flex-col items-center">
        {isCameraOpen ? (
          <WebcamComponent />
        ) : (
          <WebcamPlaceholder onClick={() => setIsCameraOpen(true)} />
        )}
      </BottomContainer>
    </div>
  );
};

export default OpenCameraContainer;

const WebcamComponent = () => {
  const [image, setImage] = useState("");

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
            <Button>
              Submit <FaArrowRightLong />{" "}
            </Button>
          </div>
        </>
      ) : (
        <MyWebcam setImage={setImage} />
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
