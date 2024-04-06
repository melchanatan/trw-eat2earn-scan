import React from "react";
import BottomContainer from "../global/BottomContainer";
import Button from "../global/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import PriceInput from "./PriceInput";
import UserAvatar from "../global/UserAvatar";

const PriceInputContainer = () => (
  <div>
    <UserAvatar />
    <BottomContainer color="primary">
      <h1 className="mb-[40px] text-dark">
        Enter your <br /> spend amount
      </h1>
      <form className="flex flex-col gap-2 mb-[40px] ">
        <PriceInput />
        <Button color="accent" className=" self-end">
          Next step <FaArrowRightLong />
        </Button>
      </form>
    </BottomContainer>
  </div>
);

export default PriceInputContainer;
