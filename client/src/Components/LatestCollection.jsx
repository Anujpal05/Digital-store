import React, { useEffect, useState } from 'react';
import axios from 'axios'

function LatestCollection() {
    const [product, setproduct] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get("http://localhost:8080/api/v1/product/getallproduct");
            data ? setproduct(data.data.products) : "";
        }
        fetchData();
    }, [product])

    return (
        <div>
            <h1 className=' text-2xl font-semibold'><span className=' border-b-4 py-[2px] border-pink-700'>Our Lat</span>est Collection</h1>
            <div className=' gap-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 py-5'>
                {product && product.map((item, i) => (
                    <div key={i} className=' bg-gray-50 p-5 flex flex-col gap-2 '>
                        <div className=' bg-gray-200 rounded-sm shadow-md shadow-gray-300 w-full flex justify-center items-center p-4'><img src={item.image} alt="Product Image" className=' h-64' /></div>
                        <div className=' flex flex-col gap-1 bg-gray-100 p-3 rounded-md'>
                            <p className=' text-xl font-semibold'>{item.title}</p>
                            <p className=' text-md font-semibold text-gray-500'>&#8377; {item.price}</p>
                            <button className=' w-full bg-pink-700 hover:bg-pink-800 hover:scale-105 text-gray-50 font-semibold text-center py-2 rounded-md '>Add To Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LatestCollection
