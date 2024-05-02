"use client";
import React, { useEffect, useState, useContext } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import BackButton from "../../../components/global/BackButton";
import { UserInfoContext } from "../../../utils/UserInfoProvider";
import SortByTimestamp from "../../../utils/SortByTimestamp";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const { phone } = useContext(UserInfoContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchHistory = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URI + "/v1/user/pointhistory/" + phone,
      { method: "GET" }
    );

    const data = await response.json();
    setIsLoading(false)

    if (response.status == 200) {
      const sorted = SortByTimestamp(data);
      setHistory(sorted);
    }
  };

  useEffect(() => {
    if (phone) fetchHistory();
  }, [phone]);

  return (
    <div className="h-screen flex flex-col justify-end box-container">
      <BackButton />
      <h2 className="mb-10">Your reward history</h2>
      <div className="h-[80vh] w-full bg-gradient-accent-lighter rounded-t-[14px] p-5 overflow-y-auto">
        {isLoading && (
          <div className="w-full h-full flex justify-center items-center font-avant text-4xl font-bold text-background animate-pulse">
            Loading...
          </div>
        )}
        {history.map((item) => (
          <HistoryListItem
            key={item.dateTime}
            name={item.name}
            amount={item.amount}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;

const HistoryListItem = ({ name, amount }) => {
  return (
    <div className="w-full border-background border-[1px] rounded-[12px] text-background p-5 flex justify-between mb-4">
      <div>
        <p className="opacity-60 font-thin">restaurant</p>
        <h3 className="text-xl">{name}</h3>
      </div>

      <h3 className="flex flex-row items-center gap-2 text-xl ">
        {Number(amount) > 0 ? "+" + amount : amount}
        <TiStarFullOutline className="w-[32px] h-[32px] text-secondary" />
      </h3>
    </div>
  );
};
