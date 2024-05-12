"use client"
import React, { useContext, useState } from "react";
import Image from "next/image";
import { UserInfoContext } from "../../utils/UserInfoProvider";
import { LuLogOut } from "react-icons/lu";
import { SignInContext } from "../../utils/SignInProvider";
import { signOut } from "next-auth/react";

const UserAvatar = ({ className = "", label = "Welcome back," }) => {
  const { signOut } = useContext(SignInContext);
  const { name } = useContext(UserInfoContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className={`flex font-avant gap-3 pl-0 relative ${className}`} onClick={toggleIsOpen}>
      <button  className="">
        <Image
          src={"/assets/avatar-placeholder.png"}
          width={48}
          height={48}
          alt={"usa-flag-avatar"}
          className="rounded-[14px]"
        />
      </button>
       {
        isOpen && ( 
          <Overlay />
         )
      } 
      <div className="flex flex-col justify-center items-start">
        <label>{label}</label>
        <h2>{!name ? <div className="w-[10ch] h-6 loading"></div> : name}</h2>
      </div>
    </div>
  );
};

const Overlay = () => {
  const goBack = () => {
    document.location.href = 'https://f012bd-c0.myshopify.com/';
  }

  return (
      <>
          <div
              className="absolute bottom-[-42px] left-0 bg-white rounded-md py-2 px-6 divide-y shadow-md"
          >
             <button onClick={goBack} className="font-bold flex gap-2 items-center"> <LuLogOut /> Back</button>
          </div >
      </>
  )
}

export default UserAvatar;
