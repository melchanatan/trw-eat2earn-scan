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

const RootLayout = ({ children }) => {
  const [signedIn, setSignedIn] = useState(true);

  return (
    <html lang="en">
      <body className={inter.className + " relative"}>
        <UserInfoProvider>
          <FormProvider>
            <SignInProvider setSignedIn={setSignedIn}>
              {signedIn ? (
                <SessionProvider>{children}</SessionProvider>
              ) : (
                <>
                  <SignInContainer.top />
                  <BottomContainer color="accent">
                    <SignInContainer />
                  </BottomContainer>
                </>
              )}
            </SignInProvider>
          </FormProvider>
        </UserInfoProvider>
      </body>
    </html>
  );
};

export default RootLayout;
