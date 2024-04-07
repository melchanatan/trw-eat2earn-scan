import React, { useContext } from "react";
import Button from "../../global/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import PriceInput from "./PriceInput";
import UserAvatar from "../../global/UserAvatar";
import { StepContext } from "../Stepper";

const PriceInputContainer = ({ isCompact = false }) => {
  const { goNext } = useContext(StepContext);

  const onSubmit = () => {
    goNext();
  };

  return (
    <>
      {!isCompact ? (
        <h1 className="mb-[40px] text-dark">
          Enter your <br /> spend amount
        </h1>
      ) : (
        <h1 className="mb-3 text-dark">your spend amount</h1>
      )}
      <form className="flex flex-col gap-2 mb-[40px]" onSubmit={onSubmit}>
        <PriceInput />
        {!isCompact && (
          <Button color="accent" className="self-end">
            Next step <FaArrowRightLong />
          </Button>
        )}
      </form>
    </>
  );
};

export default PriceInputContainer;
