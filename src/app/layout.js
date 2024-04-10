"use client";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });
import UserInfoProvider from "../utils/UserInfoProvider"
import FormProvider from "../utils/scan_qr/FormProvider";
import SignInProvider from "../utils/SignInProvider"
import BottomContainer from "../components/scan_qr/BottomContainer";
import { useContext, useEffect, useState } from "react";
import SignInContainer from "../components/sign_in/SignInContainer";

const RootLayout = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className + " relative"}>
        <UserInfoProvider>
          <SignInProvider>
            {signedIn ?
              <SessionProvider>{children}</SessionProvider>
            :
            <FormProvider>
              <SignInContainer.top />
              <BottomContainer color="accent">
                <SignInContainer setSignedIn={setSignedIn}/>
              </BottomContainer>
            </FormProvider>
            }
          </SignInProvider>
        </UserInfoProvider>
      </body>
    </html>
  );
};

export default RootLayout;
