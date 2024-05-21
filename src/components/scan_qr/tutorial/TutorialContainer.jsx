import React, { useContext, useState } from 'react'
import Button from "../../global/Button";
import ReactPlayer from 'react-player/youtube';
import { StepContext } from "../Stepper";
import { ClipLoader } from 'react-spinners/ClipLoader';

const TutorialContainer = () => {
    const { goNext } = useContext(StepContext)
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="justify-center flex flex-col gap-5">
            <h1 className='text-background'>Ready for a quick tutorial? Let's dive in!</h1>
            {
                isLoading ?
                    <div className='w-full h-[500px] animate-pulse bg-red-200 rounded-[14px]'>
                    </div> :
                    <ReactPlayer
                        url="<https://www.youtube.com/watch?v=qguo-j5PxBE&ab_channel=JeffSatur>"
                        width='100%'
                        height='500px'
                        controls
                        onReady={() => setIsLoading(false)}
                    />
            }
            <Button onClick={goNext}>Let's get started</Button>
        </div>
    )
}

export default TutorialContainer