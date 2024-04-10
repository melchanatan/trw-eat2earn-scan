"use client";
import React from "react";
import ProgressGridBox from "../../components/global/ProgressGridBox";
import { RiCoupon3Fill } from "react-icons/ri";
import { RiQrScanLine } from "react-icons/ri";
import UserAvatar from "./../../components/global/UserAvatar";
import { useRouter } from "next/navigation";
import { MdHistory } from "react-icons/md";
import HistoryGridBox from "../../components/loyalty/HistoryGridBox";
import PointGridBox from "../../components/loyalty/PointGridBox";
import { UserInfoContext } from "../../utils/UserInfoProvider";
import { useContext } from "react";

const LoyaltyPage = () => {
  const { point } = useContext(UserInfoContext);

  const router = useRouter();
  const pushToScan = () => {
    router.push("/loyalty/camera");
  };

  const pushToHistory = () => {
    router.push("/loyalty/history");
  };

  return (
    <div className="grid grid-cols-3 gap-2 box-container mt-6">
      <div className="col-span-full flex justify-between items-end mb-3">
        <UserAvatar />
        <a
          onClick={pushToHistory}
          className="mt-6 w-[48px] h-[48px] bg-[#F68C23]/30 rounded-[14px] flex justify-center items-center hover:bg-[#F68C23]/60 transition-all duration-300  text-primary hover:text-background"
        >
          <MdHistory className="w-[36px] h-[36px]" />
        </a>
      </div>
      <PointGridBox point={point} />

      <ProgressGridBox className="col-span-2" point={point} maxPoint={100} />

      <button
        onClick={pushToScan}
        className="col-span-full border-[2px] rounded-[14px] border-dark py-5 flex justify-center items-center gap-2 hover:bg-dark hover:text-white transition-all duration-300 hover:fill-background "
      >
        <h4 className="">Scan QR Code</h4>{" "}
        <RiQrScanLine className="w-[24px] h-[24px]" />
      </button>

      <HistoryGridBox onClick={pushToHistory} />
      <img
        src="/assets/coming-soon-gridbox.png"
        alt="tickets image"
        className="col-span-full"
      />
    </div>
  );
};

export default LoyaltyPage;
