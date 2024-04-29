import React, { useEffect, useState, useContext } from 'react'
import { BiSolidDiscount } from "react-icons/bi";
import { TiStarFullOutline } from "react-icons/ti";
import { HiOutlineExternalLink } from "react-icons/hi";
import Button from '../../global/Button';
import { Scanner } from "@yudiel/react-qr-scanner";
import { UserInfoContext } from '../../../utils/UserInfoProvider';

const RedeemedCouponListView = ({userCoupon, fetchUserCoupon}) => {
    return (
        <div className="max-h-[500px] min-h-[300px] overflow-y-auto">
            <RedeemedCouponListItem userCoupon={userCoupon} fetchUserCoupon={fetchUserCoupon}/>
        </div>
    )
}

export default RedeemedCouponListView


const RedeemedCouponListItem = ({userCoupon, fetchUserCoupon}) => {
    const { phone } = useContext(UserInfoContext);
    const [openScanner, setOpenScanner] = useState(false);
    const [isVisible, setIsVisible] = useState(false)
    const [selectedUserCoupon, setSelectedUserCoupon] = useState();

    let Audio;

    if (typeof window !== "undefined") {
        Audio = window.Audio;
    }

    const handleResult = async (restId) => {
        // TODO: handle redeem coupon
        console.log(restId);
        if(restId != selectedUserCoupon.restId){
            console.log("The restId does not match")
        }
        else{
            try{
                const response = await fetch(
                    process.env.NEXT_PUBLIC_SERVER_URI + "/v1/coupon/use",
                    {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        phone: phone,
                        userCouponId: selectedUserCoupon.userCouponId,
                        restId: restId,
                    }),
                    }
                );
            
                const data = await response.json();
                console.log(data);
                fetchUserCoupon();
                setIsVisible(false);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            {isVisible && <CouponInfoPopup
                onConfirm={() => setOpenScanner(true)}
                onCancel={() => {
                    setIsVisible(false);
                    setOpenScanner(false);
                }}
                noConfirm={openScanner}
            >
                <div className="flex flex-col text-white font-avant">
                    <div className="flex flex-col gap-2 border-b-2 border-white border-dashed mb-5">
                        <span className='text-sm opacity-50'>{selectedUserCoupon.type}</span>
                        <h3 className='text-lg mb-3'>{selectedUserCoupon.name}</h3>
                    </div>
                    <div>
                        {
                            openScanner ?
                                Audio && (
                                    <div className="mb-2">
                                        <Scanner
                                            onResult={handleResult}
                                            onError={(error) => console.log(error?.message)}
                                            components={{
                                                audio: false,
                                            }}
                                        />
                                    </div>
                                )
                                :
                                <p className='opacity-80'>
                                    {selectedUserCoupon.detail}
                                </p>
                        }
                    </div>
                </div>
            </CouponInfoPopup >
            }
            {userCoupon.map((item) => {
                if (item.expDate > new Date().now || true){
                    const exp = new Date(Number(item.expDate)).toLocaleDateString('en-EN', {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    return (
                    <div
                        className='mb-4 px-5 py-2 text-white font-avant rounded-[14px] border-[1px] border-white flex flex-col justify-between'
                    >
                        <div className='flex justify-between items-center'>
                            <div>
                                <span className='text-sm opacity-50'>{item.type}</span>
                                <h3 className='text-lg mb-3'>{item.name}</h3>
                                <p className='text-sm opacity-50'>use by {exp}</p>
                            </div>
                            <a
                                onClick={() => {setIsVisible(true); setSelectedUserCoupon(item);}}
                                className="p-3 bg-white rounded-full"
                            >
                                <HiOutlineExternalLink className='w-8 h-8 shrink-0 text-accent' />
                            </a>
                        </div>
                    </div>
            )}})}
        </>
    )

}

const CouponInfoPopup = ({ children, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", noConfirm = false }) => {

    useEffect(() => {
        document.body.style.overflow = "hidden"
        window.scrollTo(0, 0)

        return () => {
            document.body.style.overflow = "auto"
        }
    })

    return (
        <>
            <div className='absolute top-0 left-0 w-screen h-screen bg-black opacity-50 backdrop-blur-2xl z-40'>
            </div>
            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 min-h-[550px] w-[350px] rounded-lg z-50 flex flex-col gap-2 bg-[url(/assets/big-coupon.svg)] bg-cover bg-no-repeat pt-20 px-5 justify-between pb-[60px]'>
                {children}
                <div className="flex flex-col gap-2">
                    {!noConfirm && <Button onClick={onConfirm}>{confirmText}</Button>}
                    <Button onClick={onCancel} color="outline">{cancelText}</Button>
                </div>
            </div>

        </>
    )
}