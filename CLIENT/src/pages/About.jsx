import React from 'react'
import Title from '../components/Title'
import {assets} from "../assets/assets"
import LetterBox from '../components/LetterBox'
const About = () => {
  return (
    <div className='mx-10 border-t'>

      <div className='mt-10'>
        <Title text1={"ABOUT"} text2={'US'}></Title>
      </div>

      <div className='flex flex-col sm:flex-row  gap-10 mt-12 items-center'>
        <div className='bg-blue-400 w-full sm:w-1/3'><img src={assets.about_img} alt="" /></div>
        <div className=' w-full sm:w-1/2 flex flex-col gap-10 text-gray-700'>
          <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>

          <b className='text-black'>Our Mission</b>
          <p>Our mission ar forever is to empower customers with choice,convenience,and confidence. We're dedicated to providing a seamless shopping experice that exceeds expecations,from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>

      <div className='flex justify-start items-center gap-2 mt-20 text-xl'>
        <p className='text-gray-500'>WHY <span className='text-gray-800'>CHOOSE US</span></p>
        <hr  className='w-8 h-[1.5px] bg-gray-700'/>
      </div>
      <div className='flex flex-col sm:flex-row mt-5'>
        <div className='border sm:p-24 p-10'>
          <p className='font-bold mb-3'>Quality Assurance:</p>
          <p className='text-gray-500'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='border sm:p-24 p-10'>
          <p className='font-bold mb-3'>Convenience:</p>
          <p className='text-gray-500'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='border sm:p-24 p-10'>
          <p className='font-bold mb-3'>Exceptional Customer Service:</p>
          <p className='text-gray-500'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>
      <LetterBox></LetterBox>
    </div>
  )
}

export default About
