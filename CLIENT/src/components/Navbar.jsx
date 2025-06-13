import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { shopDataContext } from '../context/ShopContext'

const Navbar = () => {
  const [sidebar,setSidebar] = useState(false)
  const navigate = useNavigate()
  const {setShowBar,cartItemsCount,token,setToken,setCartItems} = useContext(shopDataContext)
    const logout = ()=>{
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        navigate('/login')
    }
  return (
    <div className='flex justify-between p-3 mx-8 '>
        <div>
            <Link to='/'><img src={assets.logo} className='w-28'></img></Link>
        </div>
        <div>
            <ul className='gap-8 hidden  sm:flex'>
                <li>
                    <NavLink to='/'>
                        <p>HOME</p>
                        <hr className='h-[1.5px] w-8 bg-gray-500 hidden'></hr>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/collections'>
                        <p>COLLECTIONS</p>
                        <hr className='h-[1.5px] w-8 bg-gray-500 hidden'></hr>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/about'>
                        <p>ABOUT</p>
                        <hr className='h-[1.5px] w-8 bg-gray-500 hidden'></hr>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/contact'>
                        <p>CONTACT</p>
                        <hr className='h-[1.5px] w-8 bg-gray-500 hidden'></hr>
                    </NavLink>
                </li>
            </ul>
        </div>
        <div className='flex  '>
            <div>
                <img onClick={()=>setShowBar(true)} src={assets.search_icon} className='w-6 mr-6 cursor-pointer'></img>
            </div>
            <div className='group '>
                <Link to='/login'><img src={assets.profile_icon} className='w-5 mr-6' /></Link>
                {token && <div className='group-hover:block cursor-pointer absolute right-[89px] mt-1 hidden dropdown-menu '>
                    <div className='flex flex-col gap-2 bg-slate-100 p-2 rounded-lg text-gray-500'>
                        <p className='hover:text-black hover:font-semibold'>My Profile</p>
                        <p onClick={()=>navigate('/orders')} className='hover:text-black hover:font-semibold'>Orders</p> 
                        <p onClick={logout} className='hover:text-black hover:font-semibold'>Logout</p>
                    </div>
                </div>}
            </div>
            <div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-6'/>
                    <p className='bg-black text-white text-xs rounded-full flex items-center justify-center p-2 h-5 w-5 absolute leading-6 top-4 right-[-5px]'>{cartItemsCount()}</p>
                </Link>
            </div>
            <div>
                <img onClick={()=>setSidebar(true)} src={assets.menu_icon} className='w-6 ml-3 sm:mr-0 mt-2 sm:hidden ' />
            </div>
        </div>
        
        {/* sidebar menu divs */}
        <div className={`absolute left-0  h-screen bg-white w-full ${sidebar?'':'hidden'}`}>
            <div>
                <div className='flex items-center ml-2 gap-3 mb-5'>
                    <img src={assets.dropdown_icon} onClick={()=>setSidebar(false)} className='rotate-180 w-6 h-6 ml-0 '/> 
                    <p className='text-xl'>BACK</p>
                </div>
                <div className='flex flex-col  gap-3 text-xl font-semibold mt-5 '>
                    <NavLink onClick={()=>setSidebar(false)} className='border-b-2 px-4 py-2' to='/'>HOME</NavLink>
                    <NavLink onClick={()=>setSidebar(false)} className='border-b-2 px-4 py-2' to='/collections'>COLLECTIONS</NavLink>
                    <NavLink onClick={()=>setSidebar(false)} className='border-b-2 px-4 py-2' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={()=>setSidebar(false)} className='border-b-2 px-4 py-2' to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Navbar
