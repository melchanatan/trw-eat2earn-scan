import React from "react";

const BottomContainer = ({ children, color = "primary", className = "" }) => {
  const avaliableColor = {
    primary: "bg-gradient-primary-lighter",
    accent: "bg-gradient-accent-lighter",
  };

  if (!avaliableColor[color]) {
    throw new Error(`Color ${color} is not avaliable`);
  }

  return (
    <main
      className={`${avaliableColor[color]} w-full min-h-[490px] box-container absolute bottom-0 right-0 left-0 rounded-t-[14px] py-[44px] px-[32px] pb-20 ${className} `}
    >
      {children}
    </main>
  );
};

export default BottomContainer;
