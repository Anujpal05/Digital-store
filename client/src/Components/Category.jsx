import React from 'react';
import general from "../assets/general.png";
import book from "../assets/book.png";
import phone from "../assets/phone.png";
import toys from "../assets/toys.png";
import cloth from "../assets/cloth.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";


function Category() {
    return (
        <div className=' py-5'>
            <h1 className=' text-2xl font-semibold  '><span className='py-[2px] border-b-4 border-pink-700'>Explo</span>re Categories</h1>
            <div className=' flex py-5 gap-5 overflow-x-auto '>
                <div className=' group bg-gray-100 min-w-60 flex flex-col justify-center items-center shadow-sm rounded-md shadow-gray-500 '><img src={general} alt="general" className=' h-40 group-hover:scale-105 transition-all duration-300 ' /> <p className=' font-semibold text-xl pt-1'>General</p></div>
                <div className='group bg-gray-100  p-5  min-w-60 flex flex-col justify-center items-center shadow-sm rounded-md shadow-gray-500'><img src={phone} alt="phones" className=' h-40 group-hover:scale-105 transition-all duration-300' />  <p className=' font-semibold text-xl pt-1'>Phones</p></div>
                <div className=' group bg-gray-100  p-5 min-w-60 flex flex-col justify-center items-center shadow-sm rounded-md shadow-gray-500'><img src={cloth} alt="clothes" className=' h-40 group-hover:scale-105 transition-all duration-300' /> <p className=' font-semibold text-xl pt-1'>Clothes</p></div>
                <div className=' group bg-gray-100  p-5  min-w-60 flex flex-col justify-center items-center shadow-sm rounded-md shadow-gray-500'><img src={book} alt="books" className=' h-40 group-hover:scale-105 transition-all duration-300' /> <p className=' font-semibold text-xl pt-1'>Books</p></div>
                <div className=' group bg-gray-100  p-5  min-w-60 flex flex-col justify-center items-center shadow-sm rounded-md shadow-gray-500'><img src={toys} alt="toys" className=' h-40 group-hover:scale-105 transition-all duration-300' /><p className=' font-semibold text-xl pt-1'>Toys</p></div>
            </div>
        </div>
    )
}

export default Category
