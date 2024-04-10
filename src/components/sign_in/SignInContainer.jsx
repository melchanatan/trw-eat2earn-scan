import React, { useContext, useState, useEffect } from "react";
import PhoneInputField from "../global/PhoneInputField";
import Button from "../global/Button";
import { SignInContext } from "../../utils/SignInProvider";

const SignInContainer = ({}) => {
  const { onSubmit, phoneNumber, setPhoneNumber, errorMessage } =
    useContext(SignInContext);

  return (
    <>
      <h1 className="text-background mb-[40px]">
        Enter your <br /> phone number
      </h1>
      <form className="flex flex-col gap-2 mb-[40px]" onSubmit={onSubmit}>
        <PhoneInputField value={phoneNumber} setValue={setPhoneNumber} />
        <Button>Sign In</Button>
        <p className="text-white/60">{errorMessage}</p>
      </form>
      <a href="" className="text-white font-avant underline ">
        Not a member?
      </a>
    </>
  );
};

const Top = () => {
  return (
    <h1 className="font-avant font-bold text-4xl absolute top-10 left-[16px]">
      Eat2Earn <br />
      start collecting <br />
      points!
    </h1>
  );
};

SignInContainer.top = Top;
export default SignInContainer;
