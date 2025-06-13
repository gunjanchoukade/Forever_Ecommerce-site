import React from "react";
import assets from "../assets/assets";
import { useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"
const Add =({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)
  
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [category,setCategory] = useState("Men")
  const [subCategory,setSubCategory] = useState("Topwear")
  const [price,setPrice] = useState("")
  const [size,setSize] = useState([])
  const [bestSeller,setBestSeller] = useState(false)

  const submitHandler = async (e)=>{
    e.preventDefault();
    
    try {
      console.log("sizes",size)
      const formData = new FormData();
      formData.append("name",name);
      formData.append("description",description)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("price",price)
      formData.append("size",JSON.stringify(size))
      formData.append("bestSeller",bestSeller)
      console.log("formdata",formData)

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post("http://localhost:3000/products/add",formData,{headers:{token}});
      if(response.status == 200){
        setName('')
        setDescription('')
        setPrice('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        toast.success("Product added successfully.")
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    
    <div className="">
      <form onSubmit={submitHandler} className="flex flex-col">
        <div>
          <h1 className="font-semibold">Upload new products</h1>
          <div className="flex gap-2 mt-2">
            <label htmlFor="image1">
              <img className="w-20" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
              <input type="file" id="image1" hidden onChange={(e)=>setImage1(e.target.files[0])} />
            </label>

            <label htmlFor="image2">
              <img className="w-20" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
              <input type="file" id="image2" hidden onChange={(e)=>setImage2(e.target.files[0])} />
            </label>

            <label htmlFor="image3">
              <img className="w-20" src={!image3 ? assets.upload_area: URL.createObjectURL(image3)} alt="" />
              <input type="file" id="image3" hidden onChange={(e)=>setImage3(e.target.files[0])} />
            </label>

            <label htmlFor="image4">
              <img className="w-20" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
              <input type="file" id="image4" hidden onChange={(e)=>setImage4(e.target.files[0])}/>
            </label>
          </div>

          {/* second line */}
          <div className="mt-5">
            <div className="mt-2">
              <p className="font-semibold">Product name</p>
              <input
                required
                type="text"
                className="w-full md:w-[400px] border-2 p-1 outline-none"
                placeholder="type here"
                onChange={(e)=>setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="mt-2">
              <p className="font-semibold">Product description</p>
              <textarea
                required
                type="text"
                className="w-full md:w-[400px] md:h-[150px] border-2 p-1 outline-none"
                placeholder="description here"
                onChange={(e)=>setDescription(e.target.value)}
                value={description}
              />
            </div>
          </div>

          {/* third line */}
          <div className="flex  flex-col md:flex-row gap-3 mt-5">
            <div>
              <p className="font-semibold">Product category</p>
              <select onChange={(e)=>setCategory(e.target.value)} className="border-2 p-1 w-[200px] outline-none mt-2">
                <option value="Men" className="bg-gray-100">
                  Men
                </option>
                <option value="Women" className="bg-gray-100">
                  Women
                </option>
                <option value="Kids" className="bg-gray-100">
                  Kids
                </option>
              </select>
            </div>

            <div>
              <p className="font-semibold">Product Subcategory</p>
              <select onChange={(e)=>setSubCategory(e.target.value)} className="border-2 p-1 w-[200px] outline-none mt-2">
                <option value="Topwear" className="bg-gray-100">
                  Topwear
                </option>
                <option value="Bottomwear" className="bg-gray-100">
                  Bottomwear
                </option>
                <option value="Winterwear" className="bg-gray-100">
                  Winterwear
                </option>
              </select>
            </div>

            <div>
              <p className="font-semibold">Product price</p>
              <input
                type="Number"
                placeholder="50"
                className="p-1 w-[200px] outline-none border-2 mt-2"
                onChange={(e)=>(setPrice(e.target.value))}
                value={price}
              />
            </div>
          </div>
          {/* fourth line */}
          <div className="mt-5">
            <p className="font-semibold">Product sizes</p>
            <div className="flex gap-5 mt-2">
              <div className={`${size.includes("S")?"bg-pink-400":"bg-gray-200"} px-3 py-1`} 
                onClick={()=>setSize( (prev)=>prev.includes("S")?prev.filter(p => p != "S") : [...prev,"S"] )}>
                <p className="cursor-pointer">S</p>
              </div>
              <div className={`${size.includes("M")?"bg-pink-400":"bg-gray-200"} px-3 py-1`}
                onClick={()=>setSize( (prev)=>prev.includes("M")?prev.filter(p => p != "M") : [...prev,"M"] )}>
                <p className="cursor-pointer">M</p>
              </div>
              <div className={`${size.includes("L")?"bg-pink-400":"bg-gray-200"} px-3 py-1`}
                onClick={()=>setSize( (prev)=>prev.includes("L")?prev.filter(p => p != "L") : [...prev,"L"] )}>
                <p className="cursor-pointer">L</p>
              </div>
              <div className={`${size.includes("XL")?"bg-pink-400":"bg-gray-200"} px-3 py-1`}
                onClick={()=>setSize( (prev)=>prev.includes("XL")?prev.filter(p => p != "XL") : [...prev,"XL"] )}>
                <p className="cursor-pointer">XL</p>
              </div>
              <div className={`${size.includes("XXL")?"bg-pink-400":"bg-gray-200"} px-3 py-1`}
                onClick={()=>setSize( (prev)=>prev.includes("XXL")?prev.filter(p => p != "XXL") : [...prev,"XXL"] )}>
                <p className="cursor-pointer">XXL</p>
              </div>
            </div>
          </div>
          {/* fifth line */}
          <div className="mt-5 flex items-center gap-2">
            <input onClick={(e)=>setBestSeller(!bestSeller)}  checked={bestSeller} type="checkbox"  id="bestseller" className="mt-1 cursor-pointer" />
            <label htmlFor="bestseller" className="cursor-pointer">Add to bestseller</label>
          </div>
          <button type="submit" className="bg-black text-white  p-3 mt-8">Add product</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
