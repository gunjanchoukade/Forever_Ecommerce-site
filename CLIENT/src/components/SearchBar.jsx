import React, { useContext, useEffect,useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const {searched,setSearched,showBar,setShowBar} = useContext(shopDataContext)
    const[visible,setVisible] = useState(false)
    const location = useLocation()
    useEffect(()=>{
        if(location.pathname.includes('collections')){
            setVisible(true)
        }else{
            setVisible(false)
        }
    },[location])
    return showBar && visible ? (
        <div className='flex justify-center items-center border-b ml-3 border-t py-2 bg-slate-100'>
            <div className='flex  w-full sm:w-[50%]  items-center relative px-3 sm:px-0'>
                <input onChange={(e)=>setSearched(e.target.value)} value={searched} type="text" placeholder='Search' className='outline-none px-2 py-2 rounded-full border-2 w-[88%]' />
                <img  src={assets.search_icon} className='w-8 cursor-pointer absolute  right-[70px] sm:right-[13%] top-1'></img>
                <img onClick={()=>setShowBar(false)} src={assets.cross_icon} className="ml-2 w-4  h-4 cursor-pointer sm:mr-0" />
            </div>
        </div>
    ):null
}

export default SearchBar
