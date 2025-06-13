import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { shopDataContext } from '../context/ShopContext'
import ProductItems from '../components/ProductItems'

const Collection = () => {
  const {products,searched,showBar} = useContext(shopDataContext)
  const [allItems,setAllItems]= useState([]);
  const [category,setCategory] = useState([]);
  const [type,setType] = useState([]);
  useEffect(()=>{
    setAllItems(products)
    console.log(products)
    
  },[products])

  const toggleCategory=(event)=>{
    if(category.includes(event.target.value)){
      setCategory(prev=>prev.filter(item => item !== event.target.value))
    }else{
      setCategory(prev=>[...prev,event.target.value])
    }
  }
   
  const toggleType = (event) =>{
    if(type.includes(event.target.value)){
      setType(prev=>prev.filter(item=>item!=event.target.value));
    }else{
      setType(prev=>[...prev,event.target.value])
    }
  }
  function applyFilter(){
    let copyofProducts = products.slice();
    if(category.length > 0){
      copyofProducts=copyofProducts.filter(item=>category.includes(item.category))
    }
    if(type.length > 0 ){
      copyofProducts = copyofProducts.filter(item=>type.includes(item.subCategory))
    }
    if(showBar && searched){
      copyofProducts = copyofProducts.filter(item=>item.name.toLowerCase().includes(searched.toLowerCase()))
    }
    setAllItems(copyofProducts)
  }
  useEffect(()=>{
    applyFilter()
  },[category, type,searched,products])

  const[sortType,setSortType] = useState('relavent')
  //sorting products
  const sortingItems = ()=>{
    const sortCopy = allItems.slice()
    switch(sortType){
      case 'low-high':setAllItems(sortCopy.sort((a,b)=>(a.price-b.price)));
      break;
      
      case 'high-low' :setAllItems(sortCopy.sort((a,b)=>(b.price-a.price)));
      break;

      default:applyFilter();
      break;
    }
  }
  useEffect(()=>{
    sortingItems();
  },[sortType])
  
  return (
    <div className='border-t px-8 flex flex-col sm:flex-row items-start gap-10'>
      {/* left side */}
      <div className='mt-10 w-full sm:w-[20%]'>
        <div className='flex items-center '>
          <p className='text-2xl sm:text-2xl mb-3'>FILTERS</p>
          {/* //<img  src={assets.dropdown_icon} className='rotate-90 ml-4 h-[15px] mb-2' alt="" /> */}
        </div>

        <div className='mt-6'>
          <div className='border-2 px-2 py-3'>
            <p className='mb-2'>CATEGORIES</p>
            <p className='text-gray-600 mt-2'><input onChange={toggleCategory} className='mr-2' value={'Men'} type='checkbox'></input>Men</p>
            <p className='text-gray-600 mt-2'><input onChange={toggleCategory} className='mr-2'value={'Women'} type='checkbox'></input>Women</p>
            <p className='text-gray-600 mt-2'><input onChange={toggleCategory} className='mr-2' value={'Kids'} type='checkbox'></input>Kids</p>
          </div>
          <div className='border-2 px-2 py-3 mt-3'>
            <p className='mb-2'>TYPE</p>
            <p className='text-gray-600 mt-2'><input className='mr-2' onChange={toggleType} value={'Topwear'} type='checkbox'></input>Topwear</p>
            <p className='text-gray-600 mt-2'><input className='mr-2' onChange={toggleType} value={'Bottomwear'} type='checkbox'></input>Bottomwear</p>
            <p className='text-gray-600 mt-2'><input className='mr-2' onChange={toggleType} value={'Winterwear'} type='checkbox'></input>Winterwear</p>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className='mt-8 w-full sm:w-[80%]'>
        {/* up */}
        <div className='flex justify-between'>
          {/* title */}
          <div className='flex items-center justify-center gap-2'>   
            <p className=' text-base sm:text-3xl text-gray-400'>{"ALL"} <span className='text-base sm:text-3xl text-black'>{"COLLECTIONS"}</span></p>
            <p className=' w-10 sm:w-20 h-[1.5px] bg-black'></p>
          </div>
          <select onChange={(e)=>setSortType(e.target.value)} className=' text-xs sm:text-base outline-none text-gray-500 border-2 p-2 rounded-lg'>
            <option  value="relavent">Sort by:Relavent</option>
            <option value="low-high">Sort by:Low-High</option>
            <option value="high-low">Sort by:High-Low</option>
          </select>
        </div>
        {/* bottom */}
        <div className='grid grid-cols-2 gap-3 sm:grid-col-3 md:grid-cols-4 lg:g-c-5'>
          {allItems.map((items,index)=>{
            return(
              <ProductItems key={index} id={items._id} image={items.image} name={items.name} price={items.price}></ProductItems>
            )
          })}
        </div>
      </div>

















    </div>
  )
}

export default Collection
