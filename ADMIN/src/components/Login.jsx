import axios from 'axios'
import {useState} from 'react'
const Login = ({setToken}) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const submitHandler = async (e) =>{
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:3000/user/admin-login",{email,password}) 
      if(response.status==200){
        console.log(response.data.token)
        setToken(response.data.token);
      }else{
        console.log("Invalid Credentials")
      }
    }catch(e){
      console.log(e);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-100">
      <div className="bg-white w-[400px] shadow-lg px-3 py-3 rounded-lg">
        <h1 className="font-bold text-2xl mb-5">Admin Panel</h1>
        <form  onSubmit={submitHandler}>
          <div className="mb-2">
            <p className="text-base font-semibold mb-1">Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className="rounded-md w-full border-2 p-2 outline-none" type="email" required placeholder="Enter your email." />
          </div>
          <div className="mb-2">
            <p className="text-base font-semibold mb-1">Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className="rounded-md w-full border-2 p-2 outline-none" type="text" required placeholder="Enter your password" />
          </div>
          <button className="rounded-md bg-green-500 w-full text-white font-bold py-1 mt-1 text-xl">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
