import React from "react";
import BottomContainer from "../global/BottomContainer";
import Button from "../global/Button";

const PriceInputContainer = () => {
  return (
    <div>
      {" "}
      <BottomContainer color="primary">
        <h1 className="text-background mb-[40px]">
          Enter your <br /> phone number
        </h1>
        <form className="flex flex-col gap-2 mb-[40px]">
          <Button>Sign In</Button>
        </form>
        <a href="" className="text-white font-avant underline ">
          Not a member?
        </a>
      </BottomContainer>
    </div>
  );
};

export default PriceInputContainer;
