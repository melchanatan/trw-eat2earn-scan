import React, { useState, useEffect, useContext } from 'react'
import { FaShoppingBasket } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import UnredeemCouponListView from './UnredeemCouponListView';
import RedeemedCouponListView from './RedeemedCouponListView';
import { UserInfoContext } from '../../../utils/UserInfoProvider';

const RedeemGridBox = () => {
    const [modeToggle, setModeToggle] = useState(true);
    const { phone } = useContext(UserInfoContext);
    const [coupon, setCoupon] = useState([]);
    const [userCoupon, setUserCoupon] = useState([]);

    const fetchCoupon = async () => {
        const response = await fetch(
            process.env.NEXT_PUBLIC_SERVER_URI + "/v1/coupon",
            { method: "GET" }
        );
        const data = await response.json();
        if (response.status == 200) {
            //const sorted = SortByTimestamp(data);
            setCoupon(data);
        }
    };

    const fetchUserCoupon = async () => {
        const response = await fetch(
            process.env.NEXT_PUBLIC_SERVER_URI + "/v1/user/coupon/" + phone,
            { method: "GET" }
        );
        const data = await response.json();
        if (response.status == 200) {
            //const sorted = SortByTimestamp(data);
            setUserCoupon(data);
        }
    };

    useEffect(() => {
        fetchCoupon();
    }, []);

    useEffect(() => {
        if(phone) fetchUserCoupon();
    }, [phone]);

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

                        <UnredeemCouponListView coupon={coupon} fetchCoupon={fetchCoupon}/> :
                        <RedeemedCouponListView userCoupon={userCoupon} fetchUserCoupon={fetchUserCoupon}/>

                }
            </div>
        </div >
    )
}

export default RedeemGridBox

