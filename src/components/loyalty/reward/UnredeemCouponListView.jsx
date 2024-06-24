import React, { useState, useContext, useEffect } from "react";
import { BiSolidDiscount } from "react-icons/bi";
import { TiStarFullOutline } from "react-icons/ti";
import ConfirmationPopup from "../../global/ConfirmationPopup";
import { UserInfoContext } from "../../../utils/UserInfoProvider";
import { FaDropbox } from "react-icons/fa6";
import toastStyles from "../../../utils/style/toastStyles";
import { toast } from "react-toastify";
import { FaLock } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";

const UnredeemCouponListView = ({
  coupon,
  fetchCoupon,
  fetchUserCoupon,
  isLocked,
}) => {
  return (
    <div className="">
      <UnredeemCouponListItem
        coupon={coupon}
        fetchCoupon={fetchCoupon}
        fetchUserCoupon={fetchUserCoupon}
        isLocked={isLocked}
      />
    </div>
  );
};

export default UnredeemCouponListView;

const UnredeemCouponListItem = ({
  coupon,
  fetchCoupon,
  fetchUserCoupon,
  isLocked,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { setPoint, point, id } = useContext(UserInfoContext);
  const [selectedCoupon, setSelectedCoupon] = useState();

  const redeemCoupon = async () => {
    //TODO: redeem coupon
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URI + "/v1/coupon/redeem",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
            couponId: selectedCoupon.couponId,
          }),
        }
      );

      const data = await response.json();
      setPoint(point - selectedCoupon.point);
      fetchCoupon();
      fetchUserCoupon();
      toast.success(selectedCoupon.name + " redeemed!", toastStyles);
    } catch (error) {
      // TODO: handle error
      toast.warn("Something went wrong!", toastStyles);
    }
    setIsVisible(false);
  };

  if (coupon.length == 0)
    return (
      <div className="text-center flex justify-center items-center mt-10 flex-col gap-3 text-gray-600 opacity-60">
        <IoMdLock className="w-20 h-20 shrink-0" />
        <h3 className="font-avant w-[30ch] text-xl">
          Fine deals and redeem vouchers from Thai restaurants in NYC
          <h1>soon!</h1>
        </h3>
      </div>
    );

  return (
    <>
      {isVisible && (
        <ConfirmationPopup
          onCancel={() => setIsVisible(false)}
          onConfirm={redeemCoupon}
          cancelText="Close"
          confirmText="Redeem now!"
        >
          <div className="text-center text-white opacity-70 font-avant">
            <h3 className="mb-6 text-xl">Are you sure?</h3>
            <p className="w-[36ch] opacity-80 mb-6">
              You did great on grabbing {selectedCoupon.name}. It'll cost you{" "}
              {selectedCoupon.point} points, but hey, it's worth it!
            </p>
          </div>
        </ConfirmationPopup>
      )}
      {isLocked ? (
        <div className="text-center flex justify-center items-center mt-10 flex-col gap-4 text-primary opacity-70">
          <FaLock className="w-20 h-20 shrink-0" />
          <h3 className="font-avant w-[25ch] text-xl">
            To unlock this feature <br />
            you need at least 200 points <br />
            and <br />
            Eat2Earn membership <br />
          </h3>
        </div>
      ) : (
        coupon.map((item) => {
          return (
            <div
              key={item.couponId}
              className="on-click-animation mb-4 px-5 py-2 text-primary font-avant rounded-[14px] bg-white min-h-[140px] flex flex-col justify-between"
              onClick={() => {
                if (point >= item.point) {
                  setIsVisible(true);
                  setSelectedCoupon(item);
                }
              }}
            >
              <div className="flex justify-between">
                <div>
                  <span className="text-sm opacity-50">{item.type}</span>
                  <h3 className="text-lg">{item.name}</h3>
                </div>
                <BiSolidDiscount className="w-8 h-8 shrink-0 fill-purple-lighter" />
              </div>
              <div className="border-t-[1px] border-purple-lighter mt-2 pt-2 flex justify-between items-center">
                <p className="tracking-wider opacity-50 text-sm">
                  {item.quantity} left
                </p>
                <h3 className="flex gap-2 items-center text-2xl justify-end text-secondary ">
                  {" "}
                  <TiStarFullOutline />
                  {item.point}
                </h3>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};
