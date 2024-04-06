import React from "react";
import PhoneInput from "../global/PhoneInput";
import Button from "../global/Button";
import BottomContainer from "../global/BottomContainer";
const SignInContainer = () => {
  return (
    <div className="">
      <h1 className="font-avant font-bold text-4xl absolute top-10 left-[16px]">
        Eat2Earn <br />
        start collecting <br />
        points!
      </h1>
      <BottomContainer color="accent">
        <h1 className="text-background mb-[40px]">
          Enter your <br /> phone number
        </h1>
        <form className="flex flex-col gap-2 mb-[40px]">
          <PhoneInput></PhoneInput>
          <Button>Sign In</Button>
        </form>
        <a href="" className="text-white font-avant underline ">
          Not a member?
        </a>
      </BottomContainer>
    </div>
  );
};

export default SignInContainer;
