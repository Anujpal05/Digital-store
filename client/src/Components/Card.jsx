import React from 'react'

const Card = ({ item }) => {
    console.log(item.title)
    return (
        <div className=' bg-gray-50 p-5 flex flex-col gap-2 '>
            <div className=' bg-white rounded-sm shadow-md shadow-gray-300 w-full flex justify-center items-center p-4'><img src={item.image} alt="Product Image" className=' h-64' /></div>
            <div className=' flex flex-col gap-1 bg-gray-100 p-3 rounded-md'>
                <p className=' text-xl font-semibold'>{item.title}</p>
                <p className=' text-md font-semibold text-gray-500'>&#8377; {item.price}</p>
                <button className=' w-full bg-pink-700 hover:bg-pink-800 hover:scale-105 text-gray-50 font-semibold text-center py-2 rounded-md '>Add To Cart</button>
            </div>
        </div>
    )
}

export default Card
