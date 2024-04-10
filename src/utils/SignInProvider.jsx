"use client";
import React, { createContext, useContext, useState } from "react";
import { UserInfoContext } from "./UserInfoProvider";

const SignInContext = createContext(0);

const SignInProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);
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
      setSignedIn(true);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();

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
      setSignedIn(true);
    }
  };

  return (
    <SignInContext.Provider value={{ register, onSubmit, phoneNumber, setPhoneNumber, signedIn }}>
      {children}
    </SignInContext.Provider>
  );
};

export { SignInProvider as default, SignInContext };
