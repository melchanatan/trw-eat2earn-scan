import React, { useState, useEffect, useContext } from 'react'
import { FaShoppingBasket } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import UnredeemCouponListView from './UnredeemCouponListView';
import RedeemedCouponListView from './RedeemedCouponListView';
import { FaLock } from "react-icons/fa6";
import Button from '../../global/Button';
import ConfirmationPopup from '../../global/ConfirmationPopup';
import { UserInfoContext } from '../../../utils/UserInfoProvider';

const RedeemGridBox = () => {
    const [modeToggle, setModeToggle] = useState(true);
    const [isLocked, setIsLocked] = useState(process.env.NEXT_PUBLIC_MODE == "development" ? false : true);
    const [isPopupShowing, setIsPopupShowing] = useState(false);    
    const { phone, point } = useContext(UserInfoContext);
    const [coupon, setCoupon] = useState([]);
    const [userCoupon, setUserCoupon] = useState([]);

    useEffect(() => {
        if(point >= 200) setIsLocked(false)
        else setIsLocked(true)
    }, [point])

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
        <>
            {
                isPopupShowing &&
                <ConfirmationPopup
                    onCancel={() => setIsPopupShowing(false)}
                    noConfirm={true}
                >
                    <div className="text-center text-white font-avant">
                        <h3 className='mb-6 text-xl'>Good news</h3>
                        <p className='w-[32ch] opacity-80 mb-6'>
                            something about eat2earn membership is free for the first 3 months, but you still need to earn 200 points.
                        </p>
                    </div>
                </ConfirmationPopup>
            }
            <div className={`bg-gradient-primary-lighter box-container col-span-full w-full rounded-t-[14px] ${isLocked ? 'relative' : ''}`}>
                {
                    isLocked &&
                    <div className='font-avant text-white text-center flex-col gap-3 absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-40 rounded-t-[14px] backdrop-blur-sm'>
                        <FaLock className='w-10 h-10 ' />
                        <h3 className='text-white text-2xl '>Reward & discount</h3>
                        <p className='opacity-50 '>
                            To unlock this feature <br />
                            you need at least 200 points <br />
                            and <br />
                            Eat2Earn membership <br />
                        </p>
                        <Button color='outline' className='!py-2 !px-14' onClick={() => setIsPopupShowing(true)}>Learn more</Button>
                    </div>
                }

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
                        borderRadius: `${!modeToggle ? '14px 0' : '0 14px'} 0px 0px`
                    }}
                >
                    {
                        modeToggle ?
                            <UnredeemCouponListView coupon={coupon} fetchCoupon={fetchCoupon}/> :
                            <RedeemedCouponListView userCoupon={userCoupon} fetchUserCoupon={fetchUserCoupon}/>
                    }
                </div>
            </div >
        </>
    )
}

export default RedeemGridBox

