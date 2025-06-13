import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className=" border-gray-200 border-2 mx-10  flex flex-col sm:flex-row justify-center items-center leading-tight ">
        <div className=" w-full p-3 sm:w-1/2 flex flex-col gap-3 justify-center  ml-24 mb-5 sm:mb-0 sm:ml-32">
            <div className="flex items-center text-slate-800 gap-2">
                <div className="w-12 bg-black h-[2px]"></div>
                <h4>OUR BEST SELLERS</h4>
            </div>
            <h1 className="  prata-regular text-3xl sm:text-5xl  text-slate-800">Latest Arrivals</h1>
            <div className="flex items-center text-slate-800 gap-2 mt-2">
                <h4>SHOP NOW</h4>
                <div className="w-12 bg-black h-[2px]"></div>
            </div>
        </div>
        <div className=" w-full sm:w-1/2">
            <img src={assets.hero_img} />
        </div>
    </div>
  );
};

export default Hero;
