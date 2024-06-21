"use client";
import React, { useState, useContext, useEffect } from "react";
import ProgressGridBox from "../../components/global/ProgressGridBox";
import { RiQrScanLine } from "react-icons/ri";
import UserAvatar from "./../../components/global/UserAvatar";
import { useRouter } from "next/navigation";
import { MdHistory } from "react-icons/md";
import HistoryGridBox from "../../components/loyalty/HistoryGridBox";
import PointGridBox from "../../components/loyalty/PointGridBox";
import { UserInfoContext } from "../../utils/UserInfoProvider";
import RedeemGridBox from "../../components/loyalty/reward/RedeemGridBox";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomNav from '../../components/global/BottomNav'

const LoyaltyPage = () => {
  const [currentPoint, setCurrentPoint] = useState(-1)
  const { point, id } = useContext(UserInfoContext);
  const [historySum, setHistorySum] = useState(0);

  useEffect(() => {
    setCurrentPoint(point);
  }, [point])


  const fetchHistorySum = async () => {
    let date = new Date(Date.now());
    date.setDate(date.getDate() - 7);
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URI + "/v1/user/pointhistory/" + id + "/" + date.getTime(), { method: "GET" }
    );
    const data = await response.json();
    if (response.status == 200) {
      setHistorySum(data.sum);
    }
  }

  useEffect(() => {
    if (id) fetchHistorySum();
  }, [id])

  const router = useRouter();
  const pushToScan = () => {
    router.push("/loyalty/scan");
  };

  const pushToHistory = () => {
    router.push("/loyalty/history");
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2 box-container">
        <ToastContainer limit={1}/>
        <div className="col-span-full flex justify-between items-end mb-3">
          <UserAvatar />
          <a
            onClick={pushToHistory}
            className="mt-6 w-[48px] h-[48px] bg-[yellow] rounded-[14px] flex justify-center items-center transition-all duration-300 text-orange"
          >
            <MdHistory className="w-[36px] h-[36px]" />
          </a>
        </div>
        <PointGridBox point={currentPoint} />

        <ProgressGridBox className="col-span-2" point={currentPoint} maxPoint={100} />

        <button
          onClick={pushToScan}
          className="col-span-full border-[2px] rounded-[14px] border-primary py-5 flex justify-center items-center gap-2 text-primary transition-all duration-300 hover:fill-background "
        >
          <h4 className="">Scan QR Code</h4>{" "}
          <RiQrScanLine className="w-[24px] h-[24px]" />
        </button>

        <HistoryGridBox onClick={pushToHistory} historySum={historySum} />

        <RedeemGridBox />
      </div>
      <BottomNav />
    </>
  );
};

export default LoyaltyPage;
