import React from "react";
import ProgressGridBox from "../../components/global/ProgressGridBox";
import { RiCoupon3Fill } from "react-icons/ri";
import { TiStarFullOutline } from "react-icons/ti";
import { RiQrScanLine } from "react-icons/ri";
import UserAvatar from "./../../components/global/UserAvatar";
import { FaArrowRightLong } from "react-icons/fa6";

const LoyaltyPage = () => {
  return (
    <div className="grid grid-cols-3 gap-2 box-container">
      <UserAvatar className="col-span-full" />
      <div className="bg-gradient-primary grid-box justify-center items-center flex-col text-background">
        <span className="p-1 bg-white/20 inline-block rounded-full mb-3">
          <TiStarFullOutline className="fill-secondary w-[32px] h-[32px] " />
        </span>
        <h2 className="font-medium">12,000</h2>
        <p className="">points</p>
      </div>
      <ProgressGridBox className="col-span-2" point={23} maxPoint={100} />

      <button className=" col-span-full border-[2px] rounded-[14px] border-black py-5 flex justify-center items-center gap-2">
        <h4 className="text-dark">Scan QR Code</h4>{" "}
        <RiQrScanLine className="w-[24px] h-[24px] fill-dark" />
      </button>

      <div className="col-span-full bg-gradient-primary-lighter grid-box grid grid-cols-2 !p-6 !pb-0">
        <div className="flex flex-col items-start justify-between translate-x-[10px]">
          <h2>
            {" "}
            You got <br /> 3000 points this week
          </h2>
          <a
            href=""
            className="flex gap-2 items-center justify-center bg-gradient-primary text-white rounded-full px-5 py-1 mb-5"
          >
            Check <FaArrowRightLong />
          </a>
        </div>
        <img src="/assets/tickets.svg" alt="tickets image" className="" />
      </div>
      <img
        src="/assets/coming-soon-gridbox.png"
        alt="tickets image"
        className="col-span-full"
      />
    </div>
  );
};

export default LoyaltyPage;
