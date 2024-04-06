import React from "react";

const Button = ({ children, color = "primary" }) => {
  const avaliableColor = {
    accent: "primary-button--accent",
    primary: "primary-button--primary",
  };

  if (!avaliableColor[color]) {
    throw new Error(`Color ${color} is not avaliable`);
  }

  return (
    <button className={`primary-button ${avaliableColor[color]}`}>
      <p>{children}</p>
    </button>
  );
};

export default Button;
