"use client";
import React, { useState } from "react";
import MyWebcam from "@/components/MyWebcam";

const ScanPage = () => {
  const [image, setImage] = useState(null);

  const getScreenshot = () => {
    getScreenshot({ width: 1920, height: 1080 });
  };

  return (
    <div className="flex flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-10">Scan Page</h1>
      <label htmlFor="">Enter paid amount:</label>
      <input
        type="text"
        placeholder="Enter text"
        className=" placeholder:text-gray-600 text-black"
      />
      <MyWebcam setImage={setImage} />
      <button onClick={getScreenshot}>Scan</button>
      {image && (
        <div>
          <img src={`${image}`} alt="My webcam" />
          <button clsa>send to db</button>
        </div>
      )}
    </div>
  );
};

export default ScanPage;
