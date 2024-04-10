"use client";
import React from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

const BackButton = ({ className = "" }) => {
  const goBack = (e) => {
    window.history.back();
  };

  return (
    <button
      className={`mb-4 active:bg-slate-50/20 rounded-full absolute top-5 ${className}`}
      onClick={goBack}
    >
      <FaArrowLeftLong className="w-[24px] h-[24px]" />
    </button>
  );
};

export default BackButton;
