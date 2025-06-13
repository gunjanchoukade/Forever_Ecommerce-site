import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import LetterBox from '../components/LetterBox'
const Contact = () => {
  return (
    <div className='mx-10 border-t'>
      <div className='my-10'> 
        <Title text1={"CONTACT"} text2={"US"}></Title>
      </div>

      <div className='flex sm:flex-row flex-col justify-center items-center gap-10'>
        <div className='sm:w-1/3 w-full'><img src={assets.contact_img} alt="" /></div>
        <div className='flex flex-col gap-8'>
          <p className='font-bold text-xl'>Our Store</p>
          <div className='text-gray-500'>
            <p>54709 Willms Station</p>
            <p>Suite 350, Washington, USA</p>
          </div>
          <div className='text-gray-500'>
            <p>Tel: (415) 555-0132</p>
            <p>Email: admin@forever.com</p>
          </div>
          <p className='font-bold text-xl'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='text-black border-black border bg-white sm:w-48 py-3 hover:text-white hover:bg-black transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <LetterBox></LetterBox>
    </div>
  )
}

export default Contact
