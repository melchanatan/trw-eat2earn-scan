"use client";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });
import UserInfoProvider from "../utils/scan_qr/UserInfoProvider";
import FormProvider from "../utils/scan_qr/FormProvider";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className + " relative"}>
        <UserInfoProvider>
          <FormProvider>
            <SessionProvider>{children}</SessionProvider>
          </FormProvider>
        </UserInfoProvider>
      </body>
    </html>
  );
};

export default RootLayout;
