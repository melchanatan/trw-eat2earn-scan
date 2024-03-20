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
      <h1>Scan Page</h1>
      <input type="text" placeholder="Enter text" />
      <MyWebcam />
      <button onClick={getScreenshot}>Scan</button>
    </div>
  );
};

export default ScanPage;
