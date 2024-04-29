import React, { useState } from 'react'
import { BiSolidDiscount } from "react-icons/bi";
import { TiStarFullOutline } from "react-icons/ti";
import ConfirmationPopup from '../../global/ConfirmationPopup';

const UnredeemCouponListView = () => {
    return (
        <div className="max-h-[500px] min-h-[300px] overflow-y-auto">
            <UnredeemCouponListItem />
        </div>
    )
}

export default UnredeemCouponListView


const UnredeemCouponListItem = () => {
    const [isVisible, setIsVisible] = useState(false)
    const redeemCoupon = () => {
        //TODO: redeem coupon
        
        setIsVisible(false)
    }

    return (
        <>
            {isVisible &&
                <ConfirmationPopup 
                    onCancel={() => setIsVisible(false)} 
                    onConfirm={redeemCoupon}
                    cancelText='Close' 
                    confirmText='Redeem now!'
                >
                    <div className="text-center text-white font-avant">
                        <h3 className='mb-6 text-xl'>Are you sure?</h3>
                        <p className='w-[36ch] opacity-80 mb-6'>You are about to redeem this coupon</p>
                    </div>
                </ConfirmationPopup>
            }
            <div
                className='px-5 py-2 text-white font-avant rounded-[14px] border-[1px] border-white min-h-[140px] flex flex-col justify-between'
                onClick={() => setIsVisible(true)}
            >
                <div className='flex justify-between'>
                    <div>
                        <span className='text-sm opacity-50'>E-book</span>
                        <h3 className='text-lg'>Thai chef cookk </h3>
                    </div>
                    <BiSolidDiscount className='w-8 h-8 shrink-0' />
                </div>
                <div className="border-t-[1px] border-white/30 mt-2 pt-2" >
                    <h3 className='flex gap-2 items-center text-2xl justify-end text-secondary '> <TiStarFullOutline />2500</h3>
                </div>
            </div>
        </>
    )

}