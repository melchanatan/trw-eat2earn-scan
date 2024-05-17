import React, { useState, useContext, useEffect } from 'react'
import { BiSolidDiscount } from "react-icons/bi";
import { TiStarFullOutline } from "react-icons/ti";
import ConfirmationPopup from '../../global/ConfirmationPopup';
import { UserInfoContext } from '../../../utils/UserInfoProvider';
import { FaDropbox } from "react-icons/fa6";
import toastStyles from '../../../utils/style/toastStyles';
import { toast } from "react-toastify"
import { FaLock } from 'react-icons/fa';

const UnredeemCouponListView = ({coupon, fetchCoupon, fetchUserCoupon, isLocked}) => {
    return (
        <div className="">
            <UnredeemCouponListItem coupon={coupon} fetchCoupon={fetchCoupon} fetchUserCoupon={fetchUserCoupon} isLocked={isLocked}/>
        </div>
    )
}

export default UnredeemCouponListView


const UnredeemCouponListItem = ({coupon, fetchCoupon, fetchUserCoupon, isLocked}) => {
    const [isVisible, setIsVisible] = useState(false);
    const { setPoint, point, phone } = useContext(UserInfoContext);
    const [selectedCoupon, setSelectedCoupon] = useState();

    const redeemCoupon = async () => {
        //TODO: redeem coupon
        try{
            const response = await fetch(
                process.env.NEXT_PUBLIC_SERVER_URI + "/v1/coupon/redeem",
                {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone: phone,
                    couponId: selectedCoupon.couponId
                }),
                }
            );
        
            const data = await response.json();
            console.log(data);
            setPoint(point - selectedCoupon.point);
            fetchCoupon();
            fetchUserCoupon();
            toast.success(selectedCoupon.name + ' redeemed!', toastStyles);
        } catch (error) {
            console.log(error);
            // TODO: handle error
            toast.warn('Something went wrong!', toastStyles);
        }
        setIsVisible(false);
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
                        <p className='w-[36ch] opacity-80 mb-6'>
                            you will receive {selectedCoupon.name},
                            and be subtracted {selectedCoupon.point} points
                        </p>
                    </div>
                </ConfirmationPopup>
            }
            {
                isLocked ? (
                    <div className='text-center flex justify-center items-center mt-10 flex-col gap-4 text-white/30'>
                        <FaLock className='w-20 h-20 shrink-0' />
                        <h3 className='font-avant w-[25ch] text-xl'>
                            To unlock this feature <br />
                            you need at least 200 points <br />
                            and <br />
                            Eat2Earn membership <br />
                        </h3>
                    </div>
                ) :
                coupon.map((item) => {
                if (item.quantity > 0)
                    return (
                        <div
                            key={item.couponId}
                            className='on-click-animation mb-4 px-5 py-2 text-white font-avant rounded-[14px] border-[1px] border-white min-h-[140px] flex flex-col justify-between'
                            onClick={() => {setIsVisible(true); setSelectedCoupon(item);}}
                        >
                            <div className='flex justify-between'>
                                <div>
                                    <span className='text-sm opacity-50'>{item.type}</span>
                                    <h3 className='text-lg'>{item.name}</h3>
                                </div>
                                <BiSolidDiscount className='w-8 h-8 shrink-0' />
                            </div>
                            <div className="border-t-[1px] border-white/30 mt-2 pt-2 flex justify-between items-center" >
                                <p className='tracking-wider opacity-50 text-sm'>{item.quantity} left</p>
                                <h3 className='flex gap-2 items-center text-2xl justify-end text-secondary '> <TiStarFullOutline />{item.point}</h3>
                            </div>
                        </div>
                    )
                else {
                    return (
                        <div className='text-center flex justify-center items-center mt-10 flex-col gap-4 text-white/30'>
                            <FaDropbox className='w-20 h-20 shrink-0' />
                            <h3 className='font-avant w-[25ch] text-xl'>Sorry, <br/> no coupons available at the moment</h3>
                        </div>
                    )
                }
            })}
        </>
    )
}