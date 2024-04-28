import React, { useState } from 'react'
import { FaShoppingBasket } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import UnredeemCouponListView from './UnredeemCouponListView';
import RedeemCouponListView from './RedeemCouponListView';

const RedeemGridBox = () => {
    const [modeToggle, setModeToggle] = useState(true);


    return (
        <div className='bg-gradient-primary-lighter box-container col-span-full w-full rounded-[14px] '>
            <div className='grid grid-cols-2 '>
                <button
                    href=""
                    className={
                        `redeem-nav__link
                        ${modeToggle ? 'redeem-nav__link--active' : ''}`
                    }
                    onClick={() => setModeToggle(true)}
                >
                    <img src="/assets/inverted-corner.svg" alt="ds" className="redeem-nav__corner--left" />
                    <FaShoppingBasket className='w-5 h-5' /> Shop
                </button>

                <button
                    href=""
                    className={
                        `redeem-nav__link
                        ${!modeToggle ? 'redeem-nav__link--active' : ''}`
                    }
                    onClick={() => setModeToggle(false)}
                >
                    <img src="/assets/inverted-corner.svg" alt="ds" className="redeem-nav__corner--right" />
                    <MdDiscount className='w-5 h-5' /> Redeem
                </button>
            </div>
            <div
                className='p-4 bg-gradient-accent-top flex gap-2 flex-col '
                style={{
                    borderRadius: `${!modeToggle ? '14px 0' : '0 14px'} 14px 14px`
                }}
            >
                {
                    modeToggle ?

                        <UnredeemCouponListView /> :
                        <RedeemCouponListView />

                }
            </div>
        </div >
    )
}

export default RedeemGridBox

