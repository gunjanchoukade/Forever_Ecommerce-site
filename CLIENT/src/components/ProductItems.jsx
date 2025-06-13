import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItems = ({id,image,name,price}) => {
    const {products,currency,delivery_fee} = useContext(shopDataContext)
  return (
    <Link to={`/products/:${id}`}>
        <div className='mt-8 overflow-hidden'>
          <img className='hover:scale-110 transition  ease-in-out' src={image[0]} />
        </div>
        <p className='text-sm sm:base mt-1'>{name}</p>
        <p className='text-sm font-medium sm:base mt-1'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItems
 