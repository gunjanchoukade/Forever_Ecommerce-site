import React from 'react'
import axios from "axios"
import { useState ,useEffect} from 'react'



const List =  ({token}) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const [list,setList] = useState([])
  
  const fetchList = async ()=>{
    try{
      
      const response  = await axios.get(`${backendURL}/products/list`);
      setList(response.data.products)
      
    }
    catch(error){
      console.log(error)
    }
  }

  const removeProduct = async(id)=>{
    const response = await axios.post(`${backendURL}/products/remove`,{id},{headers:{token}})
    if(response.status==200){
      await fetchList();
    }
    console.log(response);
  }
  
  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div>
      <div>
        <p className='text-xl text-gray-800 mb-3 font-semibold '>All Products</p>
        <div>
          {/* table header */}
          <div className='grid grid-cols-[2fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-200'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className='text-center'>Action</b>
          </div>

          {/* table content */}
          {
            list.map((item,index)=>(
              <div key={index} className='grid grid-cols-[2fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-100 border-2 p-2 mt-2'>
                <img src={item.image[0]} className="w-16 md:w-20" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p className='text-center md:text-start'>{`₹${item.price}`}</p>
                <p onClick={()=>removeProduct(item._id)} className='text-center font-bold text-red-800 cursor-pointer'>X</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default List
