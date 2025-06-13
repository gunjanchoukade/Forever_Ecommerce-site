import React, { useContext, useEffect,useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import ProductItems from './ProductItems'

const RelatedProducts = ({category,subCategory}) => {
    const {products} = useContext(shopDataContext)
    const [related,setRelated] = useState([])
    let productCopy = products.slice();
    useEffect(()=>{
        

        productCopy = productCopy.filter((item)=>category===item.category);

        productCopy = productCopy.filter((item)=>item.subCategory===subCategory);

        setRelated(productCopy.slice(0,5))
    },[products])
    const handleScroll=()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
  return  (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 px-10'>
      {
        related.map((item,index)=>{
            return (
                <div key={index} onClick={handleScroll}>
                    <ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price}></ProductItems>
                </div>
            )
        })
      }
    </div>
  )


}

export default RelatedProducts
