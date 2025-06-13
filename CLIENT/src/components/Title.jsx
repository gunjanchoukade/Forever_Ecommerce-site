import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='flex items-center justify-center gap-2'>   
        <p className=' text-xl sm:text-3xl text-gray-400'>{text1} <span className='text-xl sm:text-3xl text-black'>{text2}</span></p>
        <p className='w-20 h-[1.5px] bg-black'></p>
    </div>
  )
}

export default Title
