"use client";
import React, { useState, useEffect, useContext } from "react";
import ProgressGridBox from "../../global/ProgressGridBox";
import Confetti from "react-confetti";
import Lottie from "react-lottie";
import * as animationData from "../../../../public/assets/done-lottie.json";
import { UserInfoContext } from "../../../utils/scan_qr/UserInfoProvider";
import { FormContext } from "../../../utils/scan_qr/FormProvider";
import { StepContext } from "../Stepper";

const SummaryContainer = () => {
  const [currentPoint, setCurrentPoint] = useState(-1);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { image, setImage, amount } = useContext(FormContext);
  const { phone, setPoint, point } = useContext(UserInfoContext);

  const submitForm = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URI + "/v1/user/point/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone,
          resId: "1234",
          image: image,
          amount: Number(amount),
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    // setIsLoading(false);
    if (response.status == 201) {
      setPoint(Number(point) + Number(amount));
      goNext();
    } else {
      // setIsError(true);
    }
  };

  const fetchUserData = async () => {
    //TODO: fetch user current Point point and setCurrentPoint
    setCurrentPoint(point);
  };

  useEffect(() => {
    fetchUserData();
    submitForm();
  }, []);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const redirect = () => {
    //TODO: redirect back to home page
  };

  // send loading page to user while fetching data.
  if (isLoading) {
    return <LoadingPage />;
  }

  // send error page to user if there is an error fetching data.
  if (isError) {
    return (
      <div>
        <h1>Error</h1>
        <button onClick={redirect}>Redirect</button>
      </div>
    );
  }

  // finally, send the summary page to user, if everything is fine.
  return (
    <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-full gap-3">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.3}
        recycle={false}
        onConfettiComplete={redirect}
        initialVelocityY={10}
      />
      <ProgressGridBox point={currentPoint} maxPoint={500} />
      <div className="box-container rounded-[14px] bg-gradient-primary p-[32px]">
        <h1 className="text-background pb-5">
          Yay, <br />
          you have receive {amount} points
        </h1>
        <Lottie options={defaultOptions} height={140} width={140} />
      </div>
      <div className="h-10"></div>
    </div>
  );
};

export default SummaryContainer;

const LoadingPage = () => {
  return (
    <main className="info-page--accent text-white">
      <span className=" animate-spin w-20 h-20 bg-white"></span>
      <h1 className="">Processing</h1>
    </main>
  );
};
