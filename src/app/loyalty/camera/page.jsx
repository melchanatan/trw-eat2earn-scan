"use client";
import React from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";
import BackButton from "../../../components/global/BackButton";

const CameraPage = () => {
  const router = useRouter();

  let Audio;
  if (typeof window !== "undefined") {
    Audio = window.Audio;
  }

  const handleResult = (text, result) => {
    // TODO: link validation
    router.push(text);
  };

  return (
    <div className="info-page--accent relative">
      <BackButton className="left-4" />
      {Audio && (
        <Scanner
          onResult={handleResult}
          onError={(error) => console.log(error?.message)}
          components={{
            audio: false,
          }}
        />
      )}
    </div>
  );
};

export default CameraPage;
