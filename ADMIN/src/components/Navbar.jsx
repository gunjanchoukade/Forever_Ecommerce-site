import React from 'react'
import assets from "../assets/assets"
const Navbar = ({setToken})=>{
    return (
        <div className='flex justify-between items-center mx-5 sm:mx-10 '>
            <img src={assets.logo} className='w-28 h-16 sm:w-32' />
            <button onClick={()=>{
                setToken('')
            }} className='bg-gray-400  text-white h-10 w-20 rounded-full'>Logout</button>
        </div>
    )
}
export default Navbar
// 7.27 making the port number fix in video