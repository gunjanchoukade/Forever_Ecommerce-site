import React, { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../components/Title'
import { shopDataContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const PlaceOrders = () => {
  const {products,cartTotal,currency,delivery_fee,cartItems,token} = useContext(shopDataContext)
  const [method,setMethod] = useState('cod')
  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""

  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;

    setFormData((prev)=>(
      {...prev,[name]:value}
    ))
  }

  const submitHandler = async (event)=>{

    //when the user clicks the place order buttons then it means
    // the items that are in the cart (all of them are then stored in the orderItems array)
    //and telling the itemInfo that which size user selected and what quantity


    //in short we find the product from the products and then add extra feature like size and quantity to tell that
    // which size and quantity user selected
    try{
      event.preventDefault()
      const orderItems = [];
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]> 0){
            const itemInfo = structuredClone(products.find((product)=>product._id == items))
            if(itemInfo){
              itemInfo.size = item; //gives the size like L , M
              itemInfo.quantity = cartItems[items][item];  //gives the number of each size like 2, 3
              orderItems.push(itemInfo)
            }
          }
        }
      }
    
      //in the order model rest things are got we have to provide items,address,amount,paymentmethod and payment
      //to save that order data in database
    
      let orderData = {
        address:formData,
        items:orderItems,
        amount: delivery_fee + cartTotal()
      
      }
    
      switch(method){
        case 'cod':
          const response = await axios.post("http://localhost:3000/order/place",orderData,{headers:{token}})
          console.log(response)
          if(response.status == 200){
            toast.success("Order placed!!")
            navigate('/orders')
          }
          break;

        case 'stripe':
          const responsStripe = await axios.post("http://localhost:3000/order/stripe",orderData,{headers:{token}})
          if(responsStripe.data.success){
            const {session_url}=responsStripe.data;
            window.location.replace(session_url)
          }else{
            toast.error(responsStripe.data.message)
          }
          break;

          default:
            break;
          
      }
    }catch(error)
    {
      console.log(error)
        
    }
   
  }
  const navigate = useNavigate()
  return (
    <form onSubmit={submitHandler} className='mx-10 border-t flex flex-col sm:flex-row sm:items-center sm:justify-evenly gap-10 '>
      {/* left side */}
      <div className='  w-full sm:w-[40%] flex flex-col items-start gap-6 mt-14  p-2'>
        {/* TOP */}
        <div>
          <Title text1={"DELIVERY"} text2={'INFORMATION'}></Title>
        </div>
        {/* below top  whole div*/}
        <div className='flex flex-col gap-3 w-full'> 
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} type="text" name="firstName" value={formData.firstName} placeholder='Firstname' className='border px-3 py-2 rounded-lg w-1/2' />
            <input required onChange={onChangeHandler} type="text" name='lastName' value={formData.lastName} placeholder='Lastname'  className='border px-3 py-2 rounded-lg w-1/2'/>
          </div>
          <input required onChange={onChangeHandler} type="email" name="email" value={formData.email} placeholder='Email address'  className='w-full border px-3 py-2 rounded-lg'/>
          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} type="text" name="city" value={formData.city} placeholder='City' className='border px-3 py-2 rounded-lg w-1/2' />
            <input required onChange={onChangeHandler} type="text" name="state" value={formData.city} placeholder='State'  className='border px-3 py-2 rounded-lg w-1/2'/>
          </div>
          <div className='flex gap-3 '>
            <input required onChange={onChangeHandler} type="number"name='zipcode' value={formData.zipcode} placeholder='Zipcode' className='border px-3 py-2 rounded-lg w-1/2' />
            <input required onChange={onChangeHandler} type="text" name='country' value={formData.country}  placeholder='Country'  className='border px-3 py-2 rounded-lg w-1/2'/>
          </div>
          <input required onChange={onChangeHandler} type="number" name='phone' value={formData.phone} placeholder='Phone'  className='w-full border px-3 py-2 rounded-lg'/>
        </div>
      </div>

      {/* right - side */}
        <div className=' w-full sm:w-[40%] flex flex-col items-start p-2  mt-14'>
          {/* total div */}
          <div className='flex flex-col gap-2 w-full sm:w-full items-start '>
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
          {/* payment methods */}
          <div className='mt-5 w-full '>
            <div className='flex items-center'>   
              <p className=' text-xl sm:text-xl text-gray-400'>PAYMENT <span className='text-xl sm:text-xl text-black'>METHODS</span></p>
              <p className='w-10 h-[1.5px] bg-black'></p>
            </div>
            <div className='flex sm:flex-row flex-col gap-3 mt-3 '>
              <div onClick={()=>setMethod('stripe')} className=' cursor-pointer border flex items-center px-3 py-2 gap-2 w-full sm:w-[33%]'>
                <p className={`w-3.5 h-3.5 rounded-full bg-gray-300 ${method==='stripe'? 'bg-green-500': ''}`}></p>
                <img src={assets.stripe_logo} className="w-16" />
              </div>
              <div onClick={()=>setMethod('razorpay')} className='hidden cursor-pointer border flex items-center px-3  py-2 gap-2 w-full sm:w-[33%]'>
                <p className={`w-3.5 h-3.5 rounded-full bg-gray-300 ${method==='razorpay'? 'bg-green-500': ''}`}></p>
                <img src={assets.razorpay_logo} className="w-24" />
              </div>
              <div onClick={()=>setMethod('cod')} className={` cursor-pointer border flex items-center px-3 py-2 gap-2 w-full sm:w-[33%] `}>
                <p className={`w-3.5 h-3.5 rounded-full bg-gray-300 ${method==='cod'? 'bg-green-500': ''}`}></p>
                <p className={`text-gray-500 text-xs `}>CASH ON DELIVERY</p>
              </div>
            </div>
            <div className='flex justify-end mt-5'>

              <button  className='text-white bg-black px-5 py-2'>PLACE ORDER</button>

            </div>
          </div>
        </div>
        
    </form>
  )
}

export default PlaceOrders
