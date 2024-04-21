"use client";
import React, { useState, useContext } from "react";
import Button from "../../global/Button";
import { FaCamera } from "react-icons/fa";
import Image from "next/image";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { FormContext } from "../../../utils/scan_qr/FormProvider";
import { StepContext } from "../Stepper";
import { UserInfoContext } from "../../../utils/UserInfoProvider";
import { Scanner } from "@yudiel/react-qr-scanner";
import BackButton from "../../global/BackButton";

const OpenScanContainer = () => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    return (
        <div className="flex items-center flex-col">
            {isCameraOpen ? (
                <QrScanner setIsCameraOpen={setIsCameraOpen} />
            ) : (
                <WebcamPlaceholder onClick={() => setIsCameraOpen(true)} />
            )}
        </div>
    );
};

export default OpenScanContainer;


const WebcamPlaceholder = ({ onClick }) => {
    return (
        <>
            <h1 className="mb-[40px] text-center text-background">
                Scan QR code <br /> <h3 className="text-xl opacity-80">given by the staff</h3>
            </h1 >
            <Image
                src={"/assets/scan-qr-graphic.png"}
                width={150}
                height={150}
                alt="receipt-icon"
                className="mb-6"
            />
            <p className="text-white/70 text-center mb-8">
                Don’t forget to enable camera permission on the popup
            </p>
            <Button onClick={onClick}>
                Open camera <FaCamera className="w-[24px] h-[24px]" />
            </Button>
        </>
    );
};

const QrScanner = ({ setIsCameraOpen }) => {
    const { setRestaurantId } = useContext(FormContext);
    const { goNext } = useContext(StepContext);
    let Audio;
    if (typeof window !== "undefined") {
        Audio = window.Audio;
    }

    const handleResult = (text, result) => {
        setRestaurantId(text)
        goNext()
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center mb-10">
            <h1 className="mb-[20px] text-background">
                Scan the QR code
            </h1>
            {Audio && (
                <Scanner
                    onResult={handleResult}
                    onError={(error) => console.log(error?.message)}
                    components={{
                        audio: false,
                    }}
                />
            )}
            <a
                onClick={(e) => {
                    e.preventDefault();
                    setIsCameraOpen(false);
                }}
                className="absolute bottom-20 left-10 mt-20"
            >
                <FaArrowLeftLong className="w-[24px] h-[24px] fill-background" />
            </a>
        </div>
    );
}