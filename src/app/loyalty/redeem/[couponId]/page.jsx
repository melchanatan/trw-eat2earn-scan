'use client'
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import Lottie from "react-lottie";
import * as doneAnimationData from "../../../../../public/assets/done-lottie.json";
import * as loadingAnimationData from "../../../../../public/assets/loading-lottie.json";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa";
import Confetti from "react-confetti";
import Button from "../../../../components/global/Button";
import { UserInfoContext } from '../../../../utils/UserInfoProvider';

const RedeemSummaryPage = ({ params }) => {
  const { phone, restId } = useContext(UserInfoContext);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserCoupon, setSelectedUserCoupon] = useState({});
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
      setSelectedUserCoupon(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (phone && restId) redeemCoupon();
  }, [phone, restId]);

  return (
    <AnimatePresence>
      <div
        className="h-screen flex flex-col "
        onClick={redirect}
      >
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          gravity={0.3}
          recycle={false}
          initialVelocityY={10}
        />
        <div className="box-container mt-10">
          <h1 className="text-dark pb-5 flex flex-col gap-5">
            Succeeded! <br />
            Show this to a staff member.
            <Button onClick={redirect} color="outline" className='!border-dark !text-dark'>Go Back</Button>
          </h1>
        </div>
        <CouponInfoPopup>
          <div className="flex flex-col text-white font-avant">
            <div className="flex flex-col gap-2 border-b-2 border-white border-dashed mb-5">
              <span className='text-sm opacity-50'>{selectedUserCoupon.type}</span>
              <h3 className='text-lg'>{selectedUserCoupon.name}</h3>
              <p className='mt-auto mb-3'>redeemed: {new Date(Number(selectedUserCoupon.redeemDate)).toLocaleDateString('en-EN', {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                            })}
              </p>
            </div>
            <p className='h-full'>{selectedUserCoupon.detail}</p>
          </div>
        </CouponInfoPopup >
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

const CouponInfoPopup = ({ children }) => {

  useEffect(() => {
    document.body.style.overflow = "hidden"
    window.scrollTo(0, document.body.scrollHeight);
    return () => {
      document.body.style.overflow = "auto"
    }
  })

  return (
    <motion.div
      className='absolute bottom-0 left-1/2 -translate-x-1/2 min-h-[550px] w-[350px] rounded-lg z-50 flex flex-col gap-2 bg-[url(/assets/big-coupon.svg)] bg-cover bg-no-repeat pt-20 px-5 justify-between pb-[60px]'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}