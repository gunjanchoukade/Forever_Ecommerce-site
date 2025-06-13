import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div className='px-8 mt-48  '>
        <hr />
        <div className='flex flex-col gap-6 sm:grid grid-cols-[3fr_1fr_1fr] mt-4'>

            <div className='sm:w-2/3'>
                <img src={assets.logo} className='w-32' />
                <p className='text-gray-800'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae, sit dolorum! Recusandae, molestiae maxime ex, minus velit quasi ullam.
                m, dolor sit amet consectetur adipisicing elit. Repudiandae, sit dolorum! Recusandae, molestiae maxime ex, 
                </p>
            </div>
            <div>
                <p className='font-semibold mb-2 text-xl'>COMPANY</p>
                <ul className='text-gray-800'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            <div>
                <p className='font-semibold mb-2 text-xl'>GET IN TOUCH</p>
                <ul className='tex-gray-800'>
                    <li>+1-2245-375-4842</li>
                    <li>foreveryou@contact.com</li>
                </ul>
            </div>
        </div>
        <div className='mt-10 text-center'>
            <hr/>
            <p className='text-xs  sm:text-base text-gray-400 my-4'>Copyright 2025@ forever.com - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
