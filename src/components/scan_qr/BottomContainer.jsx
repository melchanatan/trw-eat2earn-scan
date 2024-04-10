import React from "react";
import { motion } from "framer-motion";

const BottomContainer = ({ children, color = "primary", className = "" }) => {
  const avaliableColor = {
    primary: "bg-gradient-primary-lighter",
    accent: "bg-gradient-accent-lighter",
    transparent: "bg-transparent",
  };

  if (!avaliableColor[color]) {
    throw new Error(`Color ${color} is not avaliable`);
  }

  return (
    <motion.div
      className={`${avaliableColor[color]} w-full box-container absolute bottom-0 right-0 left-0 rounded-t-[14px] py-[44px] px-[32px] pb-20 ${className} `}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default BottomContainer;
