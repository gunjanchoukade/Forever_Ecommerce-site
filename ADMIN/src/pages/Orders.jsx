import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react'
import axios from "axios"
import assets from '../assets/assets.js';


const Orders = ({token}) => {
  
  const [orders,setOrders] = useState([]);

  const fetchOrders = async () =>{

    if(!token){
      return null;
    }
    try{
      const response = await axios.post("http://localhost:3000/order/list",{},{headers:{token}})
      if(response.status==200){
        console.log(response.data)
        setOrders(response.data.orders);
      }
    }catch(error){
      console.log(error)
    }
  }
  const updateStatus = async (id,event)=>{
    try {
      const response = await axios.post("http://localhost:3000/order/status",{id,status:event.target.value},{headers:{token}});
      await fetchOrders();
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(()=>{
    fetchOrders();
  },[token])
  return (
    <div>
      <h3 className='text-center font-bold text-white bg-gray-400'>Orders Placed By Users</h3>
      <div>
      {
        orders.map((order,index)=>{
          return <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] border-2 mt-4 p-3'>
            <img src={assets.parcel_icon} className="w-12" />
            <div>
            {
              order.items.map((item)=>{
                return(
                  <div>
                    <p className='text-gray-700 font-semibold '>{item.name} x {item.quantity}{item.size}</p>
                    <p className='font-bold'>{order.address.firstName+" "+order.address.lastName}</p>
                    <p className='text-gray-500 '>{"Phone:- "+order.address.phone}</p>
                    <p className='text-gray-500 '>{order.address.city+", "+order.address.state+" ,"+order.address.country+", "+order.address.zipcode}</p>
                  </div>
                )
              })
            }
            </div>
            <div className='mt-1 leading-tight'>
              <p className='text-gray-900 mb-3 '>Items: {order.items.length}</p>
              <p className='text-gray-900  '>Method: {order.paymentMethod}</p>
              <p className='text-gray-900  '>Date: {new Date(order.date).toDateString()}</p>
            </div>
            <p className='font-semibold text-sm'>Amount: ₹{order.amount}</p>
            <div>
              <select onChange={(event)=>updateStatus(order._id,event)} value={order.status} className='font-semibold outline-none rounded-lg border-2 p-1 text-gray-500 mt-1' >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

          </div>
        })
      }
      
      </div>
    </div>
  )
}

export default Orders
