"use client";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });
import UserInfoProvider from "../utils/UserInfoProvider";
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className + " relative"}>
        <UserInfoProvider>
          <SessionProvider>{children}</SessionProvider>
        </UserInfoProvider>
      </body>
    </html>
  );
};

export default RootLayout;
