import React, { useContext, useState } from "react";
import PhoneInput from "../../global/PhoneInput";
import Button from "../../global/Button";
import { StepContext } from "../Stepper";
import { UserInfoContext } from "../../../utils/scan_qr/UserInfoProvider";

const SignInContainer = () => {
  const { goNext } = useContext(StepContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { setPhone, setName, setPoint } = useContext(UserInfoContext);

  const register = async () => {
    console.log("Register User");
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URI + "/v1/user/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      }
    );
    const data = await response.json();
    console.log(data);

    if (response.status == 201) {
      setName(data.firstName + " " + data.lastName[0] + ".");
      setPoint(0)
      setPhone(phoneNumber)
      goNext();
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    // Bypass for development mode
    if (process.env.NEXT_PUBLIC_MODE == "development") {
      setName("John Doe");
      goNext();
      return;
    }

    // TODO: check phone number with database
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URI + "/v1/user/" + phoneNumber,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);
    if(response.status == 404){
      register();
    }
    if(response.status == 200){
      setName(data.firstName + " " + data.lastName[0] + ".");
      setPoint(Number(data.point));
      setPhone(phoneNumber)
      goNext();
    }
  };

  return (
    <>
      <h1 className="text-background mb-[40px]">
        Enter your <br /> phone number
      </h1>
      <form className="flex flex-col gap-2 mb-[40px]" onSubmit={onSubmit}>
        <PhoneInput value={phoneNumber} setValue={setPhoneNumber} />
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
