"use client";
import React, { useState, useEffect, useContext } from "react";
import ProgressGridBox from "../../global/ProgressGridBox";
import Confetti from "react-confetti";
import Lottie from "react-lottie";
import * as doneAnimationData from "../../../../public/assets/done-lottie.json";
import * as loadingAnimationData from "../../../../public/assets/loading-lottie.json";
import { UserInfoContext } from "../../../utils/UserInfoProvider";
import { FormContext } from "../../../utils/scan_qr/FormProvider";
import { StepContext } from "../Stepper";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { redirect, useRouter } from "next/navigation";


const SummaryContainer = () => {
  const [currentPoint, setCurrentPoint] = useState(-1);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("something went wrong!");
  const router = useRouter();

  const { image, setImage, amount, restaurantId, restaurantName, resetForm } = useContext(FormContext);
  const { id, setPoint, point } = useContext(UserInfoContext);

  const awardedPoint = Math.round(Number(amount));


  const checkRestaurantId = async () => {
    var flag = false
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/v1/rest`
      );
      const data = await response.json();

      data.map((restaurant) => {
        if (restaurant.id == restaurantId) {
          flag = true
        }
      })
    } catch (error) {
      console.log(error);
    }

    if (flag) return true
    else return false
  };

  const submitForm = async () => {

    // Check is resturant is registered or not.
    const isResturantInDb = await checkRestaurantId()
    if (!isResturantInDb) {
      setErrorMessage("Restaurant is not registered with us.");
      setIsLoading(false);
      setIsError(true);
      return;
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URI + "/v1/user/point/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
            resId: restaurantId,
            resName: restaurantName,
            image: image,
            amount: awardedPoint,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      setIsLoading(false);
      if (response.status == 201) {
        const newPoint = Number(point) + awardedPoint;
        setPoint(newPoint);
        setCurrentPoint(newPoint);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    submitForm();
  }, []);

  const doneAnimationOptions = {
    loop: false,
    autoplay: true,
    animationData: doneAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const redirect = () => {
    resetForm();
    router.push("/loyalty");
  };

  // send loading page to user while fetching data.
  if (isLoading) {
    return <LoadingPage />;
  }

  // send error page to user if there is an error fetching data.
  if (isError) {
    return <ErrorPage errorMessage={errorMessage} redirect={redirect} />;
  }

  // finally, send the summary page to user, if everything is fine.
  return (
    <AnimatePresence>
      <div
        className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-full gap-3"
        onClick={redirect}
      >
        {
          typeof window !== "undefined" &&
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            gravity={0.3}
            recycle={false}
            onConfettiComplete={redirect}
            initialVelocityY={10}
          />
        }
        <ProgressGridBox point={currentPoint} maxPoint={500} />
        <div className="box-container rounded-[14px] bg-gradient-primary p-[32px]">
          <h1 className="text-background pb-5">
            Whoop!  <br />
            You've just scored {awardedPoint}  points!
            <br /> High five
          </h1>
          <Lottie options={doneAnimationOptions} height={140} width={140} />
        </div>
        <div className="h-10"></div>
      </div>
    </AnimatePresence>
  );
};

export default SummaryContainer;

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
