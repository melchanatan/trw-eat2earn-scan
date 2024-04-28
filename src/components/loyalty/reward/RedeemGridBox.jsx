import React from 'react'
import { FaShoppingBasket } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { TiStarFullOutline } from "react-icons/ti";
import { BiSolidDiscount } from "react-icons/bi";

const RedeemGridBox = () => {
    return (
        <div className='bg-gradient-primary-lighter box-container col-span-full w-full rounded-[14px]'>
            <div className='grid grid-cols-2 '>
                <a href="" className='redeem-nav__link'>
                    <MdDiscount className='w-5 h-5' /> Redeem
                </a>
                <a href="" className='redeem-nav__link redeem-nav__link--active'>
                    <FaBox /> Your Rewards
                </a>
            </div>
            <div
                className='p-4 bg-gradient-accent-top'
                style={{
                    borderRadius: '14px 0 14px 14px'
                }}
            >
                <div className='px-5 py-2 text-white font-avant rounded-[14px] border-[1px] border-white min-h-[140px] flex flex-col justify-between'>
                    <div className='flex justify-between'>
                        <div>
                            <span className='text-sm opacity-50'>E-book</span>
                            <h3 className='text-lg'>Thai chef cook book</h3>
                        </div>
                        <BiSolidDiscount className='w-8 h-8' />
                    </div>
                    <div className="border-t-[1px] border-white/30 mt-2 pt-2">
                        <h3 className='flex gap-2 items-center text-2xl justify-end text-secondary '> <TiStarFullOutline />2500</h3>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default RedeemGridBox