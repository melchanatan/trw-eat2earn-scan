"use client";
import React, { useState } from "react";
import Webcam from "react-webcam";
import { IoCameraOutline } from "react-icons/io5";

const MyWebcam = ({ params, setImage }) => {
  const [cameraFakeCapturing, setCameraFakeCapturing] = useState(false);

  const videoConstraints = {
    width: 720,
    height: 1280,
    facingMode: "environment",
  };

  const handleCameraCapturing = () => {
    setCameraFakeCapturing(true);

    setTimeout(() => {
      setCameraFakeCapturing(false);
    }, 100);
  };

  return (
    <>
      <div className="w-[100%] h-[100%] relative flex justify-center items-center">
        {cameraFakeCapturing && (
          <div className="w-full h-full bg-gray-200 absolute top-0 left-0"></div>
        )}
        <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        >
          {({ getScreenshot }) => (
            <button
              className="bg-white p-5 rounded-full absolute left-[50%] translate-x-[-50%] bottom-[-48px] active:scale-90 transition-all active:brightness-75"
              onClick={() => {
                const imageSrc = getScreenshot();
                setImage(imageSrc);
                handleCameraCapturing();
              }}
            >
              <IoCameraOutline className="w-[48px] h-[48px] fill-black stroke-black" />
            </button>
          )}
        </Webcam>
      </div>
    </>
  );
};

export default MyWebcam;
