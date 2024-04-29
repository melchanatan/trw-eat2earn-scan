'use client'
import React, {  useEffect, useState } from 'react'
import Button from './Button'

const ConfirmationPopup = ({ children, onConfirm, onCancel, confirmText="Confirm", cancelText="Cancel", noConfirm = false }) => {

    useEffect(() => {
        document.body.style.overflow = "hidden"
        window.scrollTo(0, 0)

        return () => {
            document.body.style.overflow = "auto"
        }
    })
    

    return (
        <>
            <div className='absolute top-0 left-0 w-screen h-screen bg-black opacity-50 backdrop-blur-2xl z-50'>
            </div>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-accent p-[6vw] rounded-lg z-50 flex flex-col gap-2'>
                { children }
                {!noConfirm && <Button onClick={onConfirm}>{confirmText}</Button>}
                <Button onClick={onCancel} color="outline">{cancelText}</Button>
            </div>
            
        </>
    )
}

export default ConfirmationPopup
