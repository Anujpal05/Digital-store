import React from 'react';
import { BsHandbag } from "react-icons/bs";
import { PiVanBold } from "react-icons/pi";
import { TbCoinRupee } from "react-icons/tb";



function Service() {
    return (
        <div className=' grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-2 lg:gap-4'>
            <div className=' flex flex-col justify-center items-center p-5 lg:py-8 py-3 gap-2 rounded-md shadow-sm hover:scale-105 transition-all duration-300 shadow-gray-600 bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:shadow-gray-400 '>
                <p className=' text-4xl text-pink-700 text-center'><BsHandbag /></p>
                <h1 className=' text-lg lg:text-xl font-semibold text-center '>Premuim T-Shirts</h1>
                <p className=' text-gray-500 text-[16px] lg:text-base dark:text-gray-400 text-center font-semibold'>Our T-Shirts are 100% made of cotton.</p>
            </div>
            <div className=' flex flex-col justify-center items-center p-5 lg:py-8 py-3 gap-2 rounded-md shadow-sm hover:scale-105 transition-all duration-300 shadow-gray-600 bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:shadow-gray-400 '>
                <p className=' text-4xl text-pink-700 text-center'><PiVanBold /></p>
                <h1 className=' text-lg lg:text-xl font-semibold text-center '>Free Shipping</h1>
                <p className=' text-gray-500 text-[16px] lg:text-base dark:text-gray-400 text-center font-semibold'>We ship all over india for FREE.</p>
            </div>
            <div className=' flex flex-col justify-center items-center p-5 lg:py-8 py-3 gap-2 rounded-md shadow-sm hover:scale-105 transition-all duration-300 shadow-gray-600 bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:shadow-gray-400 '>
                <p className=' text-4xl text-pink-700 text-center'><TbCoinRupee /></p>
                <h1 className=' text-lg lg:text-xl font-semibold text-center '>Exciting Offers</h1>
                <p className=' text-gray-500 text-[16px] lg:text-base dark:text-gray-400 text-center font-semibold'>We provide amazing Offers & discounts</p>
            </div>
        </div>
    )
}

export default Service
