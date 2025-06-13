import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from "./pages/Home"
import About from "./pages/About"
import Collection from './pages/Collection'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Login from "./pages/Login"
import Orders from './pages/Orders'
import PlaceOrders from './pages/PlaceOrders'
import Product from './pages/Product'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify'

function App() {

  return (
    <div>
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/collections' element={<Collection/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/orders' element={<Orders/>}></Route>
        <Route path='/verify' element={<Verify/>}></Route>
        <Route path='/place-orders' element={<PlaceOrders/>}></Route>
        <Route path='/products/:id' element={<Product/>}></Route>
      </Routes>
      <Footer></Footer>
      
      
    </div>
  )
}

export default App
