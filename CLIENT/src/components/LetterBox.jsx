import React from 'react'

const LetterBox = () => {
    async function submitHandler(event){
        event.preventDefault()
    }
  return (
    <div className='mt-20 mb-5'> 
        <div className='text-center'>
            <p className='text-gray-800 text-2xl'>Subscribe now & get 20% off!</p>
            <p className='text-gray-400 mt-1 px-6 text-sm sm:text-lg'>Join us now and grab an instant 20% discount on your next order!</p>
        </div>
        <form onSubmit={submitHandler} className='mt-5  flex items-center justify-center m-auto  w-full sm:w-1/2 '>
            <input className='p-[10.5px] bg-white border-2 w-[55%] sm:w-[70%]  text-lg outline-none' type="email" placeholder='Enter your email' required/>
            <button className='bg-black text-white p-[14px]'>SUBSCRIBE</button>
        </form>
      
    </div>
  )
}

export default LetterBox
