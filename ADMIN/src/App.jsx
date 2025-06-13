import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from "./components/Sidebar"
import {Routes,Route} from 'react-router-dom'
import Add from "./pages/Add"
import List from "./pages/List"
import Orders from "./pages/Orders"
import {useState} from 'react'
import Login from './components/Login'
const App = () => {
  const [token,setToken] = useState(localStorage.getItem('token') || '');
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  return (
    <div className=''>
      {token === '' ? <Login setToken={setToken}></Login> :
        <>
          <Navbar setToken={setToken}/>
          <hr />

          <div className='flex sm:mx-10 mx-5 mt-5 gap-3'>
            <Sidebar></Sidebar>
            <div className=' w-[83%] '>
              <Routes>
                <Route path='/add' element={<Add token={token}></Add>} ></Route>
                <Route path='/list' element={<List token={token}></List>}></Route>
                <Route path='/orders' element={<Orders token={token}></Orders>}></Route>
              </Routes>
            </div>
          </div>
        </>
      }
      

    </div>
  )
}

export default App
