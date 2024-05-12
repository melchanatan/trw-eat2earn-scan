"use client";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });
import UserInfoProvider from "../utils/UserInfoProvider";
import FormProvider from "../utils/scan_qr/FormProvider";
import SignInProvider from "../utils/SignInProvider";
import React, { useState } from "react";
import SignInContainer from "../components/sign_in/SignInContainer";
import BottomContainer from "../components/scan_qr/BottomContainer";
import SignInError from "../components/sign_in/SignInError"
import { Suspense } from 'react'

function SearchBarFallback() {
  return <>placeholder</>
}
const RootLayout = ({ children }) => {
  const [signedIn, setSignedIn] = useState(true);

  return (
    <html lang="en">
      <body className={inter.className + " relative"}>
        <Suspense fallback={<SearchBarFallback />}>

          <UserInfoProvider>
            <FormProvider>
              <SignInProvider setSignedIn={setSignedIn}>
                {signedIn ? (
                  <>{children}</>
                ) : (
                  <SignInError />
                )}
              </SignInProvider>
            </FormProvider>
          </UserInfoProvider>

        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
