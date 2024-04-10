"use client";
import React, { createContext, useState } from "react";

const UserInfoContext = createContext(0);

const UserInfoProvider = ({ children }) => {
  const [name, setName] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [point, setPoint] = useState(undefined);

  return (
    <UserInfoContext.Provider
      value={{
        name,
        setName,
        phone,
        setPhone,
        point,
        setPoint,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export { UserInfoProvider as default, UserInfoContext };
