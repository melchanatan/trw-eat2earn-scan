import React from "react";

const Button = ({ children, color = "primary", className = "", onClick, isDisabled = false }) => {
  const avaliableColor = {
    purple: "bg-gradient-secondary",
    accent: "primary-button--accent",
    primary: "primary-button--primary",
    outline: "transparent"
  };

  if (!avaliableColor[color]) {
    throw new Error(`Color ${color} is not avaliable`);
  }

  return (
    <button
      className={`primary-button ${avaliableColor[color]} ${className} ${color === "outline" ? "border-[1px] border-white" : ""}`}
      onClick={onClick}
      type="submit"
      disabled={isDisabled}
    >
      <p className="flex flex-row items-center justify-center gap-4 ">
        {children}
      </p>
    </button>
  );
};

export default Button;
