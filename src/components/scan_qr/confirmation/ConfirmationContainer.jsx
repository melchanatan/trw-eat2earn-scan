import React, { useContext } from 'react'
import UserAvatar from './../../global/UserAvatar';
import { TiStarFullOutline } from "react-icons/ti";
import Button from './../../global/Button';
import { StepContext } from "../Stepper";

const ConfirmationContainer = () => {
    const { goNext } = useContext(StepContext)

    return (
        <div className=" rounded-[14px] w-[370px] absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-[40%] bg-gradient-secondary-lighter p-[32px] text-center flex flex-col justify-center items-center gap-[24px]">
            <UserAvatar label="" />
            <div className='flex flex-col justify-center items-center gap-[8px]'>
                <h2 className="text-dark">
                    will be rewarded
                </h2>
                <h1 className='text-5xl flex items-center gap-4'>14
                    <span className="p-1 bg-white/60 inline-block rounded-full mb-3">
                        <TiStarFullOutline className="fill-secondary w-[32px] h-[32px] " />
                    </span>
                </h1>
            </div>
            <p className='opacity-70'>Please, show this screen to a restuaraunt staff</p>
            <Button onClick={goNext} color="accent" className='w-[70%]'>Done!</Button>
        </div>
    )
}

export default ConfirmationContainer