import React from "react";

const Button = ({ children, color = "primary", className = "", onClick }) => {
  const avaliableColor = {
    accent: "primary-button--accent",
    primary: "primary-button--primary",
  };

  if (!avaliableColor[color]) {
    throw new Error(`Color ${color} is not avaliable`);
  }

  return (
    <button
      className={`primary-button ${avaliableColor[color]} ${className}`}
      onClick={onClick}
    >
      <p className="flex flex-row items-center justify-center gap-4 text-xl">
        {children}
      </p>
    </button>
  );
};

export default Button;
