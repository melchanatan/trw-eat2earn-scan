import React from "react";

const Button = ({ children }) => {
  return (
    <button className="primary-button--yellow">
      <p>{children}</p>
    </button>
  );
};

export default Button;
