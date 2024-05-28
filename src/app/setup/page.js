'use client'
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import Lottie from "react-lottie";
import * as loadingAnimationData from "../../../public/assets/loading-lottie.json";
import { motion } from "framer-motion";
import { UserInfoContext } from "../../utils/UserInfoProvider"

const Setup = () => {
  const { phone } = useContext(UserInfoContext);
  const router = useRouter();

  const redirect = () => {
    router.push("/loyalty");
  };

  useEffect(() => {
    if(phone) redirect();
  }, [phone]);

  const loadingAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
      className="info-page--accent text-white"
    >
      <Lottie options={loadingAnimationOptions} height={140} width={140} />
      <h1 className="animate-bounce">Loading</h1>
    </motion.div>
  );
}

export default Setup
