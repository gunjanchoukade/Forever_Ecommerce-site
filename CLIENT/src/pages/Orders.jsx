import React, { useContext } from 'react'
import Title from '../components/Title'
import { shopDataContext } from '../context/ShopContext'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
const Orders = () => {
  const {products,currency,token} = useContext(shopDataContext)

  const[ordersPlaced,setOrdersPlaced] = useState([])

  const loadOrders = async () => {
    try {
      if(!token){
      return null;
      }
      const response = await axios.post("http://localhost:3000/order/user-orders",{},{headers:{token}})

      //now we have multiple orders and inside order we have items so to put all items together this is done below
      if(response.status == 200){
        let allItems=[]
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allItems.push(item);
          })
        })
        setOrdersPlaced(allItems)
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    loadOrders();
    
  },[token])

  return (
    <div className='border-t mx-10 flex flex-col items-start gap-8'>
      {/* title div */}
      <div className='mt-10'>
        <Title text1={"MY"} text2={"ORDERS"}></Title>
      </div>

      {/* all orders div */}
      <div className='w-full'>
        
          {
              ordersPlaced.map((items,index)=>{
                return(
                    <div key={index} className=' flex flex-col sm:grid grid-cols-[5fr_4fr_0.8fr] sm:items-center border-y py-3  '>
                        {/* 1st */}
                       <div className='flex gap-3 w-full  '> 
                          <img src={items.image[0]} className='w-24'></img>
                          <div className='flex flex-col gap-2'>
                            <p className='text-gray-600 font-medium text-sm sm:text-lg'>{items.name}</p>
                            <div className='flex gap-3 text-gray-600 text-sm sm:text-normal'>
                              <p>{currency}{items.price}</p>
                              <p>Quantity:{items.quantity}</p>
                              <p>Size:{items.size}</p>
                            </div>
                            <p className='text-sm text-gray-700'>Date:<span className='text-gray-500 text-sm'>{new Date(items.date).toDateString()}</span></p>
                            <p className='text-sm text-gray-700'>Payment:<span className='text-gray-500 text-sm'>{items.paymentMethod}</span></p>
                          </div>
                       </div>
                       {/* 2nd div */}
                       <div className='flex justify-between mt-4'>
                          <div className='flex items-center gap-2'>
                            <p className='bg-green-500 rounded-full w-3.5 h-3.5'></p>
                            <p>{items.status}</p>
                          </div>

                          {/* third div */}
                            <button onClick={loadOrders()} className='border-2 px-2'>Track Order</button>
                      </div>

                    </div>
                )
              })
          }
        
      </div>
    </div>
  )
}

export default Orders
