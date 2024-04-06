import React from "react";
import PhoneInput from "../global/PhoneInput";
import Button from "../global/Button";
const SignInContainer = () => {
  return (
    <div className="">
      <h1 className="font-avant font-bold text-4xl absolute top-10 left-[16px]">
        Eat2Earn <br />
        start collecting <br />
        points!
      </h1>
      <main className="bg-gradient-primary-lighter w-full h-[490px] box-container absolute bottom-0 right-0 left-0 rounded-t-[14px] py-[44px] px-[32px]">
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
      </main>
    </div>
  );
};

export default SignInContainer;
