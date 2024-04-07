import React, { createContext } from "react";

const FormContext = createContext({
  image: "",
  setImage: () => {},
  amount: 0,
  setAmount: () => {},
});

const FormProvider = ({ children }) => {
  const [image, setImage] = useState("");
  const [amount, setAmount] = useState(0);

  return (
    <FormContext.Provider value={{ image, setImage, amount, setAmount }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
