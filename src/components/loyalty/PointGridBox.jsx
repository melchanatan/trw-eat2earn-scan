import React from "react";
import { TiStarFullOutline } from "react-icons/ti";

const PointGridBox = ({ point, isLoading }) => {
  return (
    <div className="bg-gradient-primary grid-box justify-center items-center flex-col text-background">
      <span className="p-1 bg-white/20 inline-block rounded-full mb-3">
        <TiStarFullOutline className="fill-secondary w-[32px] h-[32px] " />
      </span>
      <h2 className="font-medium">
        {point < 0 ? (
          <div className="w-[7ch] h-6 loading !bg-white/50"></div>
        ) : (
            point   
        )}
     
      </h2>
      <p className="">points</p>
    </div>
  );
};

export default PointGridBox;
