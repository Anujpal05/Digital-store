import React from 'react';
import { BsHandbag } from "react-icons/bs";
import { PiVanBold } from "react-icons/pi";
import { TbCoinRupee } from "react-icons/tb";



function Service() {
    return (
        <div className=' grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-4'>
            <div className=' flex flex-col justify-center items-center p-5 py-8 gap-2 rounded-md shadow-sm hover:scale-105 transition-all duration-300 shadow-gray-600 bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:shadow-gray-400 '>
                <p className=' text-4xl text-pink-700'><BsHandbag /></p>
                <h1 className=' text-xl font-semibold '>Premuim T-Shirts</h1>
                <p className=' text-gray-500 dark:text-gray-400 font-semibold'>Our T-Shirts are 100% made of cotton.</p>
            </div>
            <div className=' flex flex-col justify-center items-center p-5 py-8 gap-2 rounded-md shadow-sm hover:scale-105 transition-all duration-300 shadow-gray-600 bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:shadow-gray-400 '>
                <p className=' text-4xl text-pink-700'><PiVanBold /></p>
                <h1 className=' text-xl font-semibold '>Free Shipping</h1>
                <p className=' text-gray-500 dark:text-gray-400 font-semibold'>We ship all over india for FREE.</p>
            </div>
            <div className=' flex flex-col justify-center items-center p-5 py-8 gap-2 rounded-md shadow-sm hover:scale-105 transition-all duration-300 shadow-gray-600 bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:shadow-gray-400 '>
                <p className=' text-4xl text-pink-700'><TbCoinRupee /></p>
                <h1 className=' text-xl font-semibold '>Exciting Offers</h1>
                <p className=' text-gray-500 dark:text-gray-400 font-semibold'>We provide amazing Offers & discounts</p>
            </div>
        </div>
    )
}

export default Service
