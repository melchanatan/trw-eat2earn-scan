import React, { useState } from 'react'
import { IoHome } from "react-icons/io5";
import { HiUserCircle } from "react-icons/hi2";
import { BsFillGiftFill } from "react-icons/bs";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

const Expanded = ({isOpen}) => {
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className='nav-expand'>
      <a href="https://www.everythai.net/pages/contact" className='nav-expand__link'>
        <AiFillDollarCircle className='w-6 h-6'/> Pay2Earn
      </a>
      <a href="/loyalty" className='nav-expand__link'>
        <BsFillGiftFill className='w-6 h-6'/> Eat2Earn
      </a>
      <a href="https://www.everythai.net/cart" className='nav-expand__link'>
        <FaShoppingCart className='w-6 h-6'/> Cart
      </a>
      
    </div>
  )
}

const BottomNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <nav className='sticky bottom-0 shadow-lg bg-white w-[100vw] h-16 flex items-center justify-around text-primary'>
        <a href='https://www.everythai.net/' className='flex flex-col items-center font-avant'>
        <IoHome className='w-5 h-5' />
        Home
        </a>
        <a onClick={toggleIsOpen} className='z-10 flex flex-col items-center font-avant bg-primary shadow-sm -translate-y-4 rounded-full p-4 text-white'>
          <BsFillGiftFill className='w-7 h-7' />
        </a>
        <a href='https://www.everythai.net/account' className='flex flex-col items-center font-avant'>
        <HiUserCircle className='w-6 h-6' />
        Account
        </a>
        <Expanded isOpen={isOpen} />
    </nav>
  )
}

export default BottomNav;