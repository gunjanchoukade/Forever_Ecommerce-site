import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [itemsInCart,setItemsinCart]=useState([])
  const{cartItems,products,currency,updateCartItems,cartTotal,delivery_fee} = useContext(shopDataContext)
  const tempData = [];


  
  useEffect(()=>{
    for(const i in cartItems){
      for(const j in cartItems[i]){
        if(cartItems[i][j] > 0){  //when user click on the remove button in cart cartitems has it but will again not set it
          tempData.push({
            _id:i,
            size:j,
            quantity:cartItems[i][j]
          });
        }
      }
    }
    setItemsinCart(tempData); 
    
    console.log('items in cart',tempData)
  },[cartItems])
  return (
    <div className='mx-10 border-t '>
      
      <div className='flex flex-col items-start  mt-10 gap-10'>
        <div>
          <Title text1={"YOUR"} text2={"CART"}></Title>
        </div>
        <div className='w-full'>
          {itemsInCart.map((items,index)=>{
            const eachProduct = products.find((product)=>product._id === items._id);
            return(
              <div key={index} className='grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[6fr_1fr_1fr] border-y py-3 items-center gap-5'>
                {/* left portion */}
                <div className='flex gap-3 '>
                  <img src={eachProduct.image[0]} className='w-16 sm:w-20' />
                  <div>
                    <p className='font-semibold text-gray-600 text-xs sm:text-lg'>{eachProduct.name}</p>
                    <div className='flex gap-3 items-center'>
                      <p className='text-gray-600'>{currency}{eachProduct.price}</p>
                      <button className='border  bg-gray-50 w-8 h-8 sm:w-10 sm:h-10'>{items.size}</button>
                    </div>
                  </div>
                </div>
                {/* quantity of each product */}
                <div>
                  <input onChange={(e)=>e.target.value===''||e.target.value==='0'? null : updateCartItems(items._id,items.size,Number(e.target.value))} type="number"  className='border-2  w-10 sm:w-14 px-2 outline-none' min={1} defaultValue={items.quantity} />
                </div>
                {/* delete icon */}
                <img onClick={()=>updateCartItems(items._id,items.size,0)} src={assets.bin_icon} className="w-6 cursor-pointer h-6" />
              </div>
            )
          })}
        </div>
      </div>
      <div className='flex flex-col items-end sm:items-end mt-16  '>
        
        <div className='flex flex-col gap-2 w-full sm:w-[30%] items-start '>
          <Title text1={'CART'} text2={'TOTALS'}></Title>
          <div className=' py-3 w-full'>
            <div className='flex justify-between my-2'>
              <p className='font-light'>Subtotal</p>
              <p>{currency}{cartTotal()===0 ? 0.00 : cartTotal()}{'.00'}</p>
              
            </div>
            <hr />
            <div className='flex justify-between my-2'>
              <p className='font-light'>Shipping Fee</p>
              <p>{currency}{delivery_fee}{'.00'}</p>
              
            </div>
            <hr />
            <div className='flex justify-between my-2'>
              <p className='font-bold'>Total</p>
              <p className='font-bold'>{currency}{cartTotal()===0 ? 0.00 : cartTotal()+delivery_fee}{'.00'}</p>
              
            </div>
          </div>
        </div>
        <div>
          <Link to='/place-orders' className=' text-white bg-black px-2 py-2'>PROCEED TO CHECKOUT</Link>
        </div>
      </div> 
    </div>
  )
}

export default Cart
