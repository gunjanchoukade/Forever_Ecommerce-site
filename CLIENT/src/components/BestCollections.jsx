import React, { useContext, useEffect,useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import Title from './Title'
import ProductItems from './ProductItems'

const BestCollections = ({id,image,name,price}) => {
    const {products,currency} = useContext(shopDataContext)
    const[bestItems,setBestItems] = useState([])
    useEffect(()=>{
        const BestItems = products.filter((items)=>(items.bestSeller));
        setBestItems(BestItems);
    },[products])
   return (
    <div className='my-14'>
        {/* title */}
        <div className='text-center mx-8'>
            <Title text1={"BEST"} text2={"COLLECTIONS"}></Title>
            <p className=" text-xs text-slate-600 mt-3 sm:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, sapiente. Perferendis blanditiis quos ullam, nesciunt .</p>
        </div>
        {/* rendering components */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-8 gap-3'>
            {
                bestItems.map((items,index)=>{
                    return(
                        <ProductItems key={index} id={items._id} name={items.name} price={items.price} image={items.image}></ProductItems>
                    )
                })
            }
        </div>
    </div>
  )
}

export default BestCollections
