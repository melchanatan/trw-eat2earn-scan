import React, { useEffect, useState, useContext } from 'react'
import { HiOutlineExternalLink } from "react-icons/hi";
import Button from '../../global/Button';
import { Scanner } from "@yudiel/react-qr-scanner";
import { UserInfoContext } from '../../../utils/UserInfoProvider';
import { FaDropbox } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import toastStyles from '../../../utils/style/toastStyles';
import { motion, AnimatePresence } from "framer-motion";


const RedeemedCouponListView = ({ userCoupon, fetchUserCoupon }) => {
    return (
        <div className="">
            <RedeemedCouponListItem userCoupon={userCoupon} fetchUserCoupon={fetchUserCoupon} />
        </div>
    )
}

export default RedeemedCouponListView


const RedeemedCouponListItem = ({ userCoupon, fetchUserCoupon }) => {
    const { setRestId } = useContext(UserInfoContext);
    const [openScanner, setOpenScanner] = useState(false);
    const [isVisible, setIsVisible] = useState(false)
    const [selectedUserCoupon, setSelectedUserCoupon] = useState();

    const router = useRouter();

    let Audio;

    if (typeof window !== "undefined") {
        Audio = window.Audio;
    }

    const handleResult = async (restId) => {
        if (restId != selectedUserCoupon.restId) {
            toast.error("Invalid QR Code", toastStyles);
            return;
        }
        setRestId(restId);
        router.push(`/loyalty/redeem/${selectedUserCoupon.userCouponId}`);
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
            {
                userCoupon > 0 ? (
                    <div className='text-center flex justify-center items-center mt-10 flex-col gap-4 text-white/30'>
                        <FaDropbox className='w-20 h-20 shrink-0' />
                        <h3 className='font-avant w-[25ch] text-xl'>coupon box empty, start collecting now!</h3>
                    </div>
                ) :
                    userCoupon.map((item) => {
                        if (item.expDate > new Date().now || true) {
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
                                            onClick={() => { setIsVisible(true); setSelectedUserCoupon(item); }}
                                            className="p-3 bg-white rounded-full"
                                        >
                                            <HiOutlineExternalLink className='w-8 h-8 shrink-0 text-accent' />
                                        </a>
                                    </div>
                                </div>
                            )
                        }
                    })
            }
        </>
    )

}

const CouponInfoPopup = ({ children, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", noConfirm = false }) => {

    useEffect(() => {
        document.body.style.overflow = "hidden"
        window.scrollTo(0, document.body.scrollHeight);
        return () => {
            document.body.style.overflow = "auto"
        }
    })

    return (
        <AnimatePresence>
            <div className='absolute bottom-0 left-0 w-screen h-screen bg-black opacity-50 backdrop-blur-2xl z-40'>
            </div>
            <motion.div
                className='absolute bottom-0 left-1/2 -translate-x-1/2 min-h-[550px] w-[350px] rounded-lg z-50 flex flex-col gap-2 bg-[url(/assets/big-coupon.svg)] bg-cover bg-no-repeat pt-20 px-5 justify-between pb-[60px]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.5,
                    type: "spring",
                    ease: "easeInOut",
                }}
            >
                {children}
                <div className="flex flex-col gap-2">
                    {!noConfirm && <Button onClick={onConfirm}>{confirmText}</Button>}
                    <Button onClick={onCancel} color="outline">{cancelText}</Button>
                </div>
            </motion.div>

        </AnimatePresence>
    )
}