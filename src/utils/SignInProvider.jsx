"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { UserInfoContext } from "./UserInfoProvider";
import { CookiesProvider, useCookies } from "react-cookie";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";

const SignInContext = createContext(0);

const SignInProvider = ({ children, setSignedIn }) => {
  const searchParams = useSearchParams();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { phone, setPhone, setName, setPoint, history, setHistory, setId } = useContext(UserInfoContext);
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [isLoading, setIsLoading] = useState(false);

  // const checkCookies = async () => {
  //   console.log("user", searchParams.get("id"))
  //   if (cookies.user) {
  //     setName(cookies.user.firstName + " " + cookies.user.lastName[0] + ".");
  //     setPhone(cookies.user.phone);
  //     const response = await fetch(
  //       process.env.NEXT_PUBLIC_SERVER_URI + "/v1/user/" + cookies.user.phone, { method: "GET", }
  //     );

  //     const data = await response.json();

  //     if (response.status == 200) {
  //       setName(data.firstName + " " + data.lastName[0] + ".");
  //       setPoint(Number(data.point));
  //       setCookie("user", data, { path: '/' });
  //     }

  //     if (response.status == 404) {
  //       setSignedIn(false)
  //     }

  //   }
  //   else setSignedIn(false)
  // }

  // const signOut = () => {
  //   console.log("signing out")
  //   removeCookie("user", { path: '/' });
  //   setSignedIn(false);
  // }

  const getUser = async () => {
    setIsLoading(true);
    let uid = searchParams.get("id");
    if(uid){
      setCookie("user", {uid: uid} , { path: "/" });
    }
    else if(cookies.user) {
      uid = cookies.user.uid;
    }
    if(uid){
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URI + "/v1/user/id/" + uid, { method: "GET", }
      );

      const data = await response.json();
      console.log(data)

      if (response.status == 200) {
        setName(data.firstName + " " + data.lastName[0] + ".");
        //setPhone(data.phone);
        setId(uid);
        setPoint(Number(data.point));
        setSignedIn(true);
      }

      if (response.status == 404) {
        migrateUserToDB({uid});
      }
      setIsLoading(false);
    }
    else setSignedIn(false);
  }

  useEffect(() => {
    getUser();
  }, []);

  const migrateUserToDB = async ({uid}) => {
    // check Shopify database and migrate into our database
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URI + "/v1/user/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: uid }),
      }
    );

    const data = await response.json();

    if (response.status == 201) {
      setName(data.firstName + " " + data.lastName[0] + ".");
      setPoint(0);
      setId(uid);
      //setPhone(data.phone);
      setSignedIn(true);
    } else {
      console.log(data)
      setSignedIn(false);
    }
  };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   // check is phone number valid
  //   if (!isPossiblePhoneNumber(phoneNumber)) {
  //     setErrorMessage("Phone number is not valid");
  //     return;
  //   }

  //   // check user in Our DB
  //   const response = await fetch(
  //     process.env.NEXT_PUBLIC_SERVER_URI + "/v1/user/" + phoneNumber,
  //     {
  //       method: "GET",
  //     }
  //   );
  //   const data = await response.json();

  //   // if user is not in Our DB, add
  //   if (response.status == 404) {
  //     migrateUserToDB();
  //   }

  //   if (response.status == 200) {
  //     setName(data.firstName + " " + data.lastName[0] + ".");
  //     setPoint(Number(data.point));
  //     setPhone(phoneNumber);
  //     setCookie("user", data, { path: "/" });
  //     setSignedIn(true);
  //   }
  //   setIsLoading(false);
  // };

  return (
    <SignInContext.Provider
      value={{
        migrateUserToDB,
        //onSubmit,
        phoneNumber,
        setPhoneNumber,
        //checkCookies,
        //signOut,
        errorMessage,
        setErrorMessage,
        isLoading
      }}
    >
      {children}
    </SignInContext.Provider>
  );
};

export { SignInProvider as default, SignInContext };
