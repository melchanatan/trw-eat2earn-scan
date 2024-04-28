import React from 'react'
import { BiSolidDiscount } from "react-icons/bi";
import { TiStarFullOutline } from "react-icons/ti";
import { HiOutlineExternalLink } from "react-icons/hi";

const RedeemCouponListView = () => {
    return (
        <div className="max-h-[500px] min-h-[300px] overflow-y-auto">
            <RedeemCouponListItem />
        </div>
    )
}

export default RedeemCouponListView


const RedeemCouponListItem = () => {
    return (
        <div className='px-5 py-2 text-white font-avant rounded-[14px] border-[1px] border-white flex flex-col justify-between '>
            <div className='flex justify-between items-center'>
                <div>
                    <span className='text-sm opacity-50'>E-book</span>
                    <h3 className='text-lg mb-3'>Thai chef cookk </h3>
                    <p className='text-sm opacity-50'>use by 20.3.25</p>
                </div>
                <a href="" className="p-3 bg-white rounded-full">
                    <HiOutlineExternalLink className='w-8 h-8 shrink-0 text-accent' />
                </a>
            </div>

        </div>
    )

}