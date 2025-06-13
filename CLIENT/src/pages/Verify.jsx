import React from 'react'
import { useContext,useEffect } from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import axios from 'axios'

const Verify = () => {

    const {setCartItems,token} = useContext(shopDataContext)
    const [searchParam,setSearchParam] = useSearchParams()

    const success = searchParam.get('success')
    const orderId = searchParam.get('orderId')
    const navigate = useNavigate()

    const verifyPayment = async () =>{
        try {
            if(!token){
                return null;
            }
            const response = await axios.post("http://localhost:3000/order/verify-stripe",{success,orderId},{headers:{token}})
            if(response.data.success)
            {
                setCartItems({})
                navigate('/orders')
            }else{
                navigate('/cart')
            }
        } catch (error) {
                console.log(error);
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[token])
  return (
    <div className='mx-10 border-t'>
      helo
    </div>
  )
}

export default Verify
