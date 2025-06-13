import React, { useContext ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"
import { shopDataContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
const Login = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const[currentState,setCurrentState] = useState('Sign Up')
  const {token,setToken} = useContext(shopDataContext)
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const submitHandler= async (event)=>{
    event.preventDefault()
    try{
      if(currentState === 'Sign Up'){
        const response = await axios.post(`${backendURL}/user/regiser`,{name,email,password});
        if(response.status == 200){
          const tok = response.data.token
          setToken(response.data.token);
          console.log("after setting token",tok)
          localStorage.setItem("token",tok);
          
        }else{
          toast.error("there might be some error try again!")
        }
      }else{
        const response = await axios.post(`${backendURL}/user/login`,{email,password});
        if(response.status == 200){
          setToken(response.data.token);
          localStorage.setItem("token",token);
        }else{
          toast.error(response.data.message)
        }
      }
    }
    catch(error){
      console.log(error)
    }
  }
  
  const navigate = useNavigate()
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <div className='flex justify-center items-center border-t'>
      <form onSubmit={submitHandler} className='mx-10 sm:w-[30%] flex flex-col gap-3 items-center mt-40 mb-40'>
        <div className='flex items-center gap-1 text-gray-700'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr  className='w-[65px] bg-gray-500 h-[2px]'/>
        </div>
        <div className='flex flex-col gap-3 w-full'>
          {currentState==='Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} className='border-black border px-2 py-2 outline-none' type="text" placeholder='Name' required/>}
          <input onChange={(e)=>setEmail(e.target.value)} value={email}  className='border-black border px-2 py-2 outline-none' type="email" placeholder='Email'  required/>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border-black border px-2 py-2 outline-none' type="password" placeholder='Password' required />
        </div>
        <div className='flex justify-between w-full'>
          <p className='text-gray-600'>{currentState==='Sign Up'?'Already have an account?':'Forgot your password?'}</p>
          <p onClick={
            ()=>
            {
              if(currentState==='Login')
              {
                setCurrentState('Sign Up')
              }
              if(currentState==='Sign Up'){
                setCurrentState('Login')
              }
            }
          } 
          
          
          className='text-blue-700 cursor-pointer'>{currentState==='Login'?'Create account':'Login Here'}</p>
        </div>
        <div>
          <button className='text-white bg-black px-3 py-2 w-32 text-lg mt-8'>{currentState}</button>
        </div>
      </form>
    </div>
  )
}

export default Login
