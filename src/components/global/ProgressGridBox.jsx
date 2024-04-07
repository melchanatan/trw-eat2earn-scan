import React from "react";
import { RiCoupon3Fill } from "react-icons/ri";
import { FaGift } from "react-icons/fa6";

const ProgressGridBox = () => {
  return (
    <div className="box-container rounded-[14px] bg-gradient-secondary p-4 flex flex-col w-full items-start text-background">
      <span className="p-1 bg-white/20 inline-block rounded-full mb-2">
        <RiCoupon3Fill className="fill-primary w-[32px] h-[32px]" />
      </span>
      <span className="mb-1 flex flex-cols justify-between w-full">
        <div>
          <p>E-book</p>
          <p>486 points to go!</p>
        </div>
        <span className="w-[48px] h-[48px] bg-gradient-primary rounded-[14px] flex justify-center items-center">
          <FaGift className="w-[28px] h-[28px] fill-background" />
        </span>
      </span>

      <span className="w-full h-[10px] bg-white rounded-[14px] p-[2px]">
        <div
          className=" h-full bg-gradient-primary rounded-[14px]"
          style={{
            width: "50%",
          }}
        ></div>
      </span>
    </div>
  );
};

export default ProgressGridBox;
