'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Lottie from "react-lottie";
import * as doneAnimationData from "../../../../../public/assets/done-lottie.json";
import * as loadingAnimationData from "../../../../../public/assets/loading-lottie.json";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa";
import Confetti from "react-confetti";
import Button from "../../../../components/global/Button";

const RedeemSummaryPage = ({ params }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("something went wrong!");
  const router = useRouter();

  const doneAnimationOptions = {
    loop: false,
    autoplay: true,
    animationData: doneAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const redirect = () => {
    router.push("/loyalty#redeem");
  };

  // send loading page to user while fetching data.
  if (isLoading) {
    return <LoadingPage />;
  }

  // send error page to user if there is an error fetching data.
  if (isError) {
    return <ErrorPage errorMessage={errorMessage} redirect={redirect} />;
  }

  const redeemCoupon = async () => {
    // TODO: handle redeem coupon

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URI + "/v1/coupon/use",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: phone,
            userCouponId: params.couponId,
            restId: restId,
          }),
        }
      );

      const data = await response.json();
      fetchUserCoupon();
      setIsVisible(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    redeemCoupon();
  }, []);

  return (
    <AnimatePresence>
      <div
        className="h-screen flex flex-col justify-center items-center"
        onClick={redirect}
      >
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          gravity={0.3}
          recycle={false}
          onConfettiComplete={redirect}
          initialVelocityY={10}
        />
        <div className="box-container rounded-[14px] bg-gradient-primary p-[32px] ">
          <h1 className="text-background pb-5 flex flex-col gap-5">
            Succeeded! <br />
            Check reward in your wallet here.
            <Button onClick={redirect} color="outline">Check Wallet</Button>
          </h1>
        </div>
        <div className="h-10"></div>
      </div>
    </AnimatePresence>
  );
}

export default RedeemSummaryPage


const ErrorPage = ({ errorMessage, redirect }) => {
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
      onClick={redirect}
    >
      <div className="w-[80%] flex justify-center flex-col">
        <h1 className="mb-10">
          Sorry, 🥲 <br /> {errorMessage}
        </h1>
        <p className="flex flex-row gap-2 items-center animate-bounce opacity-90">
          click anywhere to go back <FaArrowRightLong />
        </p>
      </div>
    </motion.div>
  );
};

const LoadingPage = () => {
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
      <h1 className="animate-bounce">Processing</h1>
    </motion.div>
  );
};
