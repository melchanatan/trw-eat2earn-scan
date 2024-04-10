"use client";
import React from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

const BackButton = ({ className = "" }) => {
  const goBack = (e) => {
    window.history.back();
  };

  return (
    <button
      className={`mb-4 active:bg-white-500/20 active:translate-x-[-1px] rounded-full absolute top-5 flex flex-row justify-center gap-2 py-2 ${className}`}
      onClick={goBack}
    >
      <FaArrowLeftLong className="w-[24px] h-[24px]" /> <p className="">back</p>
    </button>
  );
};

export default BackButton;
