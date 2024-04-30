import React, { useState, useContext, useEffect } from 'react'
import { BiSolidDiscount } from "react-icons/bi";
import { TiStarFullOutline } from "react-icons/ti";
import ConfirmationPopup from '../../global/ConfirmationPopup';
import { UserInfoContext } from '../../../utils/UserInfoProvider';

const UnredeemCouponListView = ({coupon, fetchCoupon, fetchUserCoupon}) => {
    return (
        <div className="max-h-[500px] min-h-[300px] overflow-y-auto">
            <UnredeemCouponListItem coupon={coupon} fetchCoupon={fetchCoupon} fetchUserCoupon={fetchUserCoupon}/>
        </div>
    )
}

export default UnredeemCouponListView


const UnredeemCouponListItem = ({coupon, fetchCoupon, fetchUserCoupon}) => {
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
        } catch (error) {
            console.log(error);
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
            {coupon.map((item) => {
                if (item.quantity > 0)
                    return (
                        <div
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
            })}
        </>
    )
}