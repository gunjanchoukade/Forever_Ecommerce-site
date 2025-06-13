import React from 'react'
import {assets} from '../assets/assets'
const OurPolicy = () => {
  return (
    <div className='flex flex-col gap-4 items-center sm:flex-row justify-center  mt-16 mb-5'>
        <div className='flex flex-col items-center'>
            <img src={assets.exchange_icon}className='mb-3 w-12 sm:w-20' alt="" />
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400 text-sm sm:text-lg'>We offer hassle free exchange policy</p>
        </div>
        <div className='flex flex-col items-center'>
            <img src={assets.quality_icon} className='mb-3 w-12 sm:w-20'alt="" />
            <p className='font-semibold'>7 Days Return Policy</p>
            <p className='text-gray-400 text-sm sm:text-lg'>We provide 7 days free return policy</p>
        </div>
        <div className='flex flex-col items-center'>
            <img src={assets.support_img} className='mb-3 w-10 sm:w-20'alt="" />
            <p className='font-semibold'>Best Customer Support</p>
            <p className='text-gray-400 text-sm sm:text-lg'>We provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default OurPolicy
