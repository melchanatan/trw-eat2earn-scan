import React, { useContext } from "react";
import PhoneInput from "../../global/PhoneInput";
import Button from "../../global/Button";
import { StepContext } from "../Stepper";

const SignInContainer = () => {
  const { goNext } = useContext(StepContext);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: add to input amount to form provider

    goNext();
  };

  return (
    <>
      <h1 className="text-background mb-[40px]">
        Enter your <br /> phone number
      </h1>
      <form className="flex flex-col gap-2 mb-[40px]" onSubmit={onSubmit}>
        <PhoneInput></PhoneInput>
        <Button>Sign In</Button>
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
