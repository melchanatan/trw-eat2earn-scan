"use client";
import React, { useState } from "react";
import Webcam from "react-webcam";

const MyWebcam = () => {
  const [image, setImage] = useState("");

  return (
    <>
      {image && <img src={`${image}`} alt="My webcam" />}
      <Webcam
        audio={false}
        height={720}
        screenshotFormat="image/jpeg"
        width={1280}
      >
        {({ getScreenshot }) => (
          <button
            onClick={() => {
              const imageSrc = getScreenshot();
              setImage(imageSrc);
            }}
          >
            Capture photo
          </button>
        )}
      </Webcam>
    </>
  );
};

export default MyWebcam;
