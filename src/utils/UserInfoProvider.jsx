"use client";
import React, { createContext, useState } from "react";

const UserInfoContext = createContext(0);

const UserInfoProvider = ({ children }) => {
  const [name, setName] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [point, setPoint] = useState(undefined);
  const [restId, setRestId] = useState(undefined);

  return (
    <UserInfoContext.Provider
      value={{
        name,
        setName,
        phone,
        setPhone,
        point,
        setPoint,
        restId,
        setRestId
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export { UserInfoProvider as default, UserInfoContext };
