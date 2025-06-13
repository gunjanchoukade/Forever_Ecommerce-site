import React, { useContext, useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext';
import ProductItems from '../components/ProductItems';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {id} = useParams();

  const {products,currency,addItemstoCart} = useContext(shopDataContext)
  const[productData,setProductData] = useState({})
  const [image,setImage]= useState('');
  const [size,setSize] = useState('');

  const fecthProductData=async ()=>{
    
    products.map((item)=>{
      if(item._id===id.substring(1,id.length)){
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
    
  }
  useEffect(()=>{
    fecthProductData();
  },[id,products])
  return productData ? (
    <div>
      <div className='mx-10 border-t sm:h-screen flex flex-col sm:flex-row pt-10 gap-7  pb-10 '>
        
        <div className=' sm:h-[86%]  w-full sm:w-[45%]   flex flex-col-reverse sm:flex-row gap-3'>
          {/* four image */}
          <div className='w-[23%] sm:w-[22.7%]  flex flex-row sm:flex-col gap-2 '>
            {productData.image && productData.image.map((item,index)=>{
              return(
                <img key={index} onClick={()=>setImage(item)} src={item} className="" />
              )
            })}
          </div>

          {/* big image */}
          <div className=' w-full'>
            <img src={image} className="w-full h-full" />
          </div>


        </div>

        {/* description */}
        <div className='flex flex-col gap-4  w-full sm:w-[30%] items-start p-2'>
            <h1 className='font-semibold text-2xl'>{productData?.name}</h1>
            {/* star */}
            <div className='flex gap-2 mt-1 items-center'>
              <img src={assets.star_icon} className='w-3.5 h-4' alt="" />
              <img src={assets.star_icon} className='w-3.5 h-4' alt="" />
              <img src={assets.star_icon} className='w-3.5 h-4' alt="" />
              <img src={assets.star_icon} className='w-3.5 h-4' alt="" />
              <img src={assets.star_dull_icon} className='w-3.5 h-4' alt="" />
              <p className='ml-2'>(122)</p>
            </div>

            {/* price and description */}
            <h1 className='font-semibold text-2xl'>{currency}{productData?.price}</h1>
            <p className='text-gray-500'>{productData?.description}</p>
            
            {/* sizes */}
            <div className='my-5'>
              <p className='mb-4'>Select size</p>
              <div className='flex gap-3'>
                {
                  productData.sizes && productData.sizes.map((items,index)=>{
                    return(
                      <button key={index} onClick={()=>setSize(items)} className={`border-2 w-12 h-10 bg-gray-200 ${items === size? 'border-black' :'' }`}>{items}</button>
                    )
                  })
                }
              </div>
            </div>
            <button onClick={()=>addItemstoCart(productData._id,size)} className='bg-black text-white p-3 px-5 text-lg active:bg-gray-700'>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5'/>
            <div className='text-sm text-gray-400'>
              <p>100% Original product.</p>
              <p>Cash on Delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>

        </div>
      </div>

      {/* description and review */}
      <div className='mx-10 flex flex-col gap-2.5 mb-20'>
        <p className=''><b className='border-2 px-3 py-3'>Description</b></p>
        <div className='border-2 p-4 py-6 flex flex-col gap-2 text-gray-500'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet.It serves as a virtual marketplace where businesses and individuals can showcase their produts,interact with customers,and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>

          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>
      <Title text1={"RELATED"} text2={"PRODUCTS"}></Title>
      {productData && productData.category && (
        <RelatedProducts category={`${productData.category}`} subCategory={`${productData.subCategory}`}></RelatedProducts>
      )}
      
      
      
    </div>
  ) : (
    <div>
      <h1>Select a Product please</h1>
    </div>
  )
}

export default Product
