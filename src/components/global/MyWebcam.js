"use client";
import React, { useState } from "react";
import Webcam from "react-webcam";
import { FaCamera } from "react-icons/fa";

const MyWebcam = ({ params, setImage }) => {
  const [cameraFakeCapturing, setCameraFakeCapturing] = useState(false);

  const videoConstraints = {
    width: 720,
    height: 1280,
    facingMode: "environment",
  };

  const handleCameraCapturing = (imageSrc) => {
    setCameraFakeCapturing(true);

    setTimeout(() => {
      setCameraFakeCapturing(false);
      setImage(imageSrc);
    }, 100);
  };

  return (
    <>
      <div className="w-[100%] h-[100%] relative flex justify-center items-center">
        <span className="w-[calc(100%-2rem)] h-[calc(100%-2rem)] absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] opacity-50">
          <img
            src="/assets/camera-frame.svg"
            alt=""
            className="absolute bottom-0 right-0"
          />
          <img
            src="/assets/camera-frame.svg"
            alt=""
            className="absolute bottom-0 left-0 rotate-90"
          />
          <img
            src="/assets/camera-frame.svg"
            alt=""
            className="absolute top-0 left-0 rotate-[-180deg]"
          />
          <img
            src="/assets/camera-frame.svg"
            alt=""
            className="absolute top-0 right-0 rotate-[270deg]"
          />
        </span>

        <div
          className="w-full h-full bg-gray-200 absolute top-0 left-0 rounded-[28px] duration-[2000ms] transition-all ease-[cubic-bezier(0,1.67,.08,1.06)]"
          style={{
            opacity: cameraFakeCapturing ? "100%" : "0%",
          }}
        ></div>

        <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="rounded-[26px]"
        >
          {({ getScreenshot }) => (
            <button
              className="floating-icon-button"
              onClick={() => {
                const imageSrc = getScreenshot();
                handleCameraCapturing(imageSrc);
              }}
            >
              <FaCamera className="w-[32px] h-[32px] fill-white stroke-white" />
            </button>
          )}
        </Webcam>
      </div>
    </>
  );
};

export default MyWebcam;
