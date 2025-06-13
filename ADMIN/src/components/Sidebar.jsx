import React from 'react'
import {NavLink} from 'react-router-dom'
import assets from '../assets/assets'

const Sidebar = () => {
    return (
        <div className="  w-[17%] ">
           <div className='flex flex-col gap-5  min-h-screen w-[100%]  border-r-2'>
                <NavLink  className='flex gap-2 items-center border-2 border-r-0 p-1 sm:p-2' to='/add'>
                    <img src={assets.add_icon}  />
                    <p className='text-[18px] text-gray-800  hidden sm:block'>Add items</p>
                </NavLink>
                <NavLink  className='flex gap-2 items-center border-2 border-r-0 p-1 sm:p-2' to='/list'>
                    <img src={assets.order_icon}  />
                    <p className='text-[18px] text-gray-800  hidden sm:block'>List items</p>
                </NavLink>
                <NavLink  className='flex gap-2 items-center border-2 border-r-0 p-1 sm:p-2' to='/orders'>
                    <img src={assets.order_icon}  />
                    <p className='text-[18px] text-gray-800  hidden sm:block'>Orders</p>
                </NavLink>
           </div>
        </div>
    )
}
export default Sidebar
