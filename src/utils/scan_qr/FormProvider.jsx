"use client";
import React, { createContext, useState } from "react";

const FormContext = createContext(0);

const FormProvider = ({ children }) => {
  const [image, setImage] = useState("");
  const [amount, setAmount] = useState(0);
  const [restaurantId, setRestaurantId] = useState("");

  return (
    <FormContext.Provider
      value={{
        image,
        setImage,
        amount,
        setAmount,
        restaurantId,
        setRestaurantId,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider as default, FormContext };
