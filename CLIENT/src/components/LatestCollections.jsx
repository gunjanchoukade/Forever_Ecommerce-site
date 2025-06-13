import React, { useContext, useEffect,useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";

const LatestCollections = () => {

    const {products} = useContext(shopDataContext)
    const[latestItems,setLatestItems] = useState([]);
    useEffect(()=>{
        setLatestItems(products.slice(0,10));
    },[products])
    
    
    return (
        <div className="my-14">
            <div className="mx-8 text-center ">
                <Title text1={"LATEST"} text2={"COLLECTIONS"}></Title>
                <p className=" text-xs text-slate-600 mt-3 sm:text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veritatis officiis ipsam quas hic omnis, enim quisquam ?</p>
            </div>
            {/* rendering components/products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-8 gap-3">
                {
                    latestItems.map((items,index)=>{
                        return( 
                            <ProductItems key={index} id={items._id} image={items.image} name={items.name} price={items.price}></ProductItems>
                        )
                    })  
                }
            </div>
            
        </div>

        
    );
};

export default LatestCollections;
