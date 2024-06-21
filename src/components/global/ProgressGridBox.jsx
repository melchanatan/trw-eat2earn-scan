"use client";
import React, { useEffect, useState } from "react";
import { RiCoupon3Fill } from "react-icons/ri";
import { FaGift } from "react-icons/fa6";

const ProgressGridBox = ({ point, maxPoint, isLoading, className = "" }) => {
  const percent = Math.min((point / maxPoint) * 100, 100);
  return (
    <div
      className={`grid-box bg-gradient-secondary box-container flex-col w-full items-start text-background ${className}`}
    >
      <span className="p-1 bg-white/20 inline-block rounded-full mb-2">
        <RiCoupon3Fill className="fill-white w-[32px] h-[32px]" />
      </span>
      <span className="mb-1 flex flex-cols justify-between w-full">
        <div>
          <p>Coupon</p>

          {point < 0 ? (
            <div className="w-[12ch] h-6 loading !bg-white/50"></div>
          ) : (
            <p className="text-sm">Just {point} points away!</p>
          )}
        </div>
        <span className="w-[48px] h-[48px] bg-orange-lighter rounded-[14px] flex justify-center items-center">
          <FaGift className="w-[28px] h-[28px] fill-background animate-shake" />
        </span>
      </span>

      <span className="w-full h-[10px] bg-white rounded-[14px] p-[2px]">
        <div
          className=" h-full bg-orange rounded-[14px]"
          style={{
            width: `${percent}%`,
          }}
        ></div>
      </span>
    </div>
  );
};

export default ProgressGridBox;
