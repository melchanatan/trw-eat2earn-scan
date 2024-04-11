"use client";
import React, { createContext, useState } from "react";

const FormContext = createContext(0);

const FormProvider = ({ children }) => {
  const [image, setImage] = useState("N/A");
  const [amount, setAmount] = useState(0);
  const [restaurantId, setRestaurantId] = useState("N/A");
  const [restaurantName, setRestaurantName] = useState("N/A");

  return (
    <FormContext.Provider
      value={{
        image,
        setImage,
        amount,
        setAmount,
        restaurantId,
        setRestaurantId,
        restaurantName,
        setRestaurantName
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider as default, FormContext };
