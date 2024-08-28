import React from 'react';
import general from "../assets/general.png";
import book from "../assets/book.png";
import phone from "../assets/phone.png";
import toys from "../assets/toys.png";
import cloth from "../assets/cloth.png"
import { Link } from 'react-router-dom';


function ExploreCategory() {
    return (
        <div className=' py-5'>
            <h1 className=' text-2xl font-semibold  '><span className='py-[2px] border-b-4 border-pink-700'>Explo</span>re Categories</h1>
            <div className=' flex py-5 gap-5 overflow-x-auto '>
                <Link to={"/category/general"} className=' group bg-gray-100 min-w-60 flex flex-col justify-center items-center shadow-sm rounded-md shadow-gray-500 '><img src={general} alt="general" loading='lazy' className=' h-40 group-hover:scale-105 transition-all duration-300 ' /> <p className=' font-semibold text-xl pt-1'>General</p></Link>
                <Link to={"/category/phones"} className='group bg-gray-100  p-5  min-w-60 flex flex-col justify-center items-center shadow-sm rounded-md shadow-gray-500'><img src={phone} alt="phones" loading='lazy' className=' h-40 group-hover:scale-105 transition-all duration-300' />  <p className=' font-semibold text-xl pt-1'>Phones</p></Link>
                <Link to={"/category/clothes"} className=' group bg-gray-100  p-5 min-w-60 flex flex-col justify-center items-center shadow-sm rounded-md shadow-gray-500'><img src={cloth} alt="clothes" loading='lazy' className=' h-40 group-hover:scale-105 transition-all duration-300' /> <p className=' font-semibold text-xl pt-1'>Clothes</p></Link>
                <Link to={"/category/books"} className=' group bg-gray-100  p-5  min-w-60 flex flex-col justify-center items-center shadow-sm rounded-md shadow-gray-500'><img src={book} alt="books" loading='lazy' className=' h-40 group-hover:scale-105 transition-all duration-300' /> <p className=' font-semibold text-xl pt-1'>Books</p></Link>
                <Link to={"/category/toys"} className=' group bg-gray-100  p-5  min-w-60 flex flex-col justify-center items-center shadow-sm rounded-md shadow-gray-500'><img src={toys} alt="toys" loading='lazy' className=' h-40 group-hover:scale-105 transition-all duration-300' /><p className=' font-semibold text-xl pt-1'>Toys</p></Link>
            </div>
        </div>
    )
}

export default ExploreCategory;
