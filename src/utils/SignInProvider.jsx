"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { UserInfoContext } from "./UserInfoProvider";
import { CookiesProvider, useCookies } from "react-cookie";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";

const SignInContext = createContext(0);

const SignInProvider = ({ children, setSignedIn }) => {
  //const [signedIn, setSignedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { phone, setPhone, setName, setPoint, history, setHistory } = useContext(UserInfoContext);
  const [cookies, setCookie] = useCookies(['user'])

  const checkCookies = async () => {
    console.log("checking cookies")
    if(cookies.user){
      setName(cookies.user.firstName + " " + cookies.user.lastName[0] + ".");
      setPhone(cookies.user.phone);
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URI + "/v1/user/" + cookies.user.phone, { method: "GET", }
      );
      const data = await response.json();
      if(response.status == 200){
        setName(data.firstName + " " + data.lastName[0] + ".");
        setPoint(Number(data.point));
        setCookie("user", data, { path: '/' });
      }
      console.log(cookies.user.phone);
    }
    else setSignedIn(false)
  }
  useEffect(() => {
    checkCookies();
  }, []);

  const migrateUserToDB = async () => {
    // check Shopify database and migrate into our database
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URI + "/v1/user/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      }
    );

    const data = await response.json();

    if (response.status == 201) {
      setName(data.firstName + " " + data.lastName[0] + ".");
      setPoint(0);
      setPhone(phoneNumber);
      setSignedIn(true);
    } else {
      setErrorMessage("Phone number is not registered");
      setSignedIn(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // check is phone number valid
    if (!isPossiblePhoneNumber(phoneNumber)) {
      setErrorMessage("Phone number is not valid");

      return;
    }

    // check user in Our DB
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URI + "/v1/user/" + phoneNumber,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    // if user is not in Our DB, add
    if (response.status == 404) {
      migrateUserToDB();
    }

    if (response.status == 200) {
      setName(data.firstName + " " + data.lastName[0] + ".");
      setPoint(Number(data.point));
      setPhone(phoneNumber);
      setCookie("user", data, { path: "/" });
      setSignedIn(true);
    }
  };

  return (
    <SignInContext.Provider
      value={{
        migrateUserToDB,
        onSubmit,
        phoneNumber,
        setPhoneNumber,
        checkCookies,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </SignInContext.Provider>
  );
};

export { SignInProvider as default, SignInContext };
