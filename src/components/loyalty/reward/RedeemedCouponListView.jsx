import React, { useEffect, useState } from 'react'
import { BiSolidDiscount } from "react-icons/bi";
import { TiStarFullOutline } from "react-icons/ti";
import { HiOutlineExternalLink } from "react-icons/hi";
import Button from '../../global/Button';
import { Scanner } from "@yudiel/react-qr-scanner";

const RedeemedCouponListView = () => {
    return (
        <div className="max-h-[500px] min-h-[300px] overflow-y-auto">
            <RedeemedCouponListItem />
        </div>
    )
}

export default RedeemedCouponListView


const RedeemedCouponListItem = () => {
    const [openScanner, setOpenScanner] = useState(false);
    
    let Audio;

    if (typeof window !== "undefined") {
        Audio = window.Audio;
    }

    const handleResult = (result) => {
        // TODO: handle redeem coupon
        console.log(result);
    }

    return (
        <>
            <CouponInfoPopup
                onConfirm={() => setOpenScanner(true)}
                onCancel={() => setOpenScanner(false)}
                noConfirm={openScanner}
            >
                <div className="flex flex-col text-white font-avant">
                    <div className="flex flex-col gap-2 border-b-2 border-white border-dashed mb-5">
                        <span className='text-sm opacity-50'>E-book</span>
                        <h3 className='text-lg mb-3'>Thai chef cookk </h3>
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
                        </p>
                    }
                    </div>
                </div>
            </CouponInfoPopup >
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
        </>
    )

}

const CouponInfoPopup = ({ children, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", noConfirm=false }) => {

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