import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";

const SignInOverlay = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-black/50 absolute top-0 left-0 z-10 backdrop-blur-lg ">
      <h1>Please sign In first</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </div>
  );
};

export default SignInOverlay;
