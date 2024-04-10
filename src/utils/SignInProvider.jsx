"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { UserInfoContext } from "./UserInfoProvider";
import { CookiesProvider, useCookies } from 'react-cookie'

const SignInContext = createContext(0);

const SignInProvider = ({ children, setSignedIn }) => {
  //const [signedIn, setSignedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { setPhone, setName, setPoint } = useContext(UserInfoContext);
  const [cookies, setCookie] = useCookies(['user'])

  const checkCookies = () => {
    console.log("checking cookies")
    if(cookies.user){
      setName(cookies.user.firstName + " " + cookies.user.lastName[0] + ".");
      setPoint(Number(cookies.user.point));
      setPhone(cookies.user.phone);
      console.log(cookies.user)
    }
    else setSignedIn(false)
  }
  useEffect(() => {
    checkCookies()
  }, [])

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
      setPhone(phoneNumber);
      setCookie("user", data, { path: '/' });
      setSignedIn(true);
    }
  };

  return (
    <SignInContext.Provider value={{ register, onSubmit, phoneNumber, setPhoneNumber, checkCookies }}>
      {children}
    </SignInContext.Provider>
  );
};

export { SignInProvider as default, SignInContext };
