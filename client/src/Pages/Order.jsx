import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Order = () => {
    const userid = localStorage.getItem('userId');
    const [user, setuser] = useState();

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await axios.get("http://localhost:8080/api/v1/order/get-user-order", { headers: { userid } });
                await setuser(data?.data?.user);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetch();
    }, [])




    return (
        <div className=' px-5 py-2'>
            {user && <div>
                <h1 className=' text-3xl font-semibold text-gray-800 '>Your Orders</h1>
                <div className=' grid xl:grid-cols-4 lg:grid-cols-4 gap-3'>
                    {
                        user.order.map((item, i) => (
                            <div key={i} className={` bg-gray-200 hover:bg-gray-400 ${item?.products?.length != 1 ? `row-span-${Math.round(item?.products?.length / 4) + 1}` : "h-fit"} transition-all duration-30000 p-2 rounded-md flex flex-col justify-evenly `}>
                                <div>
                                    <div className='text-sm font-semibold'>Order ID: <span className='text-gray-700'>{item._id}</span></div>
                                </div>
                                <hr className=' border-1 border-gray-600 my-2' />
                                <div className='flex justify-between'>
                                    <div className=' text-sm font-semibold'>Suppiler : <span className=' text-gray-700'>PixelMart</span></div>
                                    <div className=' text-sm font-semibold'>Sold to <span className=' text-gray-700'>{user.username}</span></div>
                                </div>
                                <hr className=' border-1 border-gray-600 my-2' />
                                {item.products && item.products.map((items, j) => (<div key={j} className=' flex  items-center gap-3 '>
                                    <img src={items.product.image} alt="" className=' h-16 border-2 border-gray-300' />
                                    <h1 className=' font-semibold text-gray-800'>{items.product.title}</h1>
                                </div>))}

                                <hr className=' border-1 border-gray-600 my-2' />
                                <button className=' px-2 py-1 bg-blue-500 font-semibold rounded-md w-full hover:bg-blue-600 transition-all duration-300 '>Order Details</button>
                            </div>
                        ))
                    }
                </div>
            </div>}
        </div>
    )
}

export default Order
