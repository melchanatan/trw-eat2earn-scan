import React, { useContext, useState, useEffect } from "react";

const SignInError = ({ }) => {

  return (
    <div className="text-md h-svh">
      <h1 className="justify-center text-center h-2/4 mt-20">
        Please sign-in first.
      </h1>
      <a
        href={process.env.NEXT_PUBLIC_SIGN_UP_URL}
        className="text-white font-avant underline "
      >
        Not a member?
      </a>
    </div>
  );
};


export default SignInError;
