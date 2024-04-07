"use client";
import React, { createContext, useState } from "react";

const UserInfoContext = createContext(0);

const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export { UserInfoProvider as default, UserInfoContext };
