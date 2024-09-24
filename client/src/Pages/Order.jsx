import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import orderImg from '../assets/order.png'
import { Hourglass } from 'react-loader-spinner'

const Order = () => {
    const userid = localStorage.getItem('userId');
    const [user, setuser] = useState();

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/order/get-user-order`, { headers: { userid, Authorization: `Bearer ${localStorage.getItem('token')}` } });
                await setuser(data?.data?.user);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetch();
    }, [])




    return (
        <div className=' px-5 py-20 dark:bg-gray-950'>
            {!user &&
                <div className=' h-[90vh] flex justify-center items-center'>
                    <Hourglass
                        visible={true}
                        height="100"
                        width="100"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={['#306cce', '#72a1ed']}
                    />
                </div>
            }
            {user && user.order.length === 0 && <div className='flex flex-col justify-center items-center h-[90vh] '>
                <p className=' text-3xl md:text-5xl text-gray-800 font-semibold text-center'> You have no any order</p>
                <img src={orderImg} alt="" className=' h-40' />
            </div>}
            {user && user.order.length > 0 && <div>
                <h1 className=' text-3xl font-semibold text-gray-800 dark:text-gray-100'>Your Orders</h1>
                <div className=' grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-3 py-4'>
                    {
                        user.order.map((item, i) => (
                            <div key={i} className={` bg-gray-200 hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-gray-100 ${item?.products?.length != 1 ? `row-span-${Math.round(item?.products?.length / 4) + 1} ` : "row-span-1"}  h-fit transition-all duration-30000 p-2 rounded-md flex flex-col justify-evenly `}>
                                <div>
                                    <div className='text-sm font-semibold'>Order ID: <span className='text-gray-700 dark:text-gray-400'>{item._id}</span></div>
                                </div>
                                <hr className=' border-1 border-gray-600 my-2' />
                                <div className='flex justify-between'>
                                    <div className=' text-sm font-semibold'>Suppiler : <span className=' text-gray-700 dark:text-gray-400'>PixelMart</span></div>
                                    <div className=' text-sm font-semibold'>Sold to <span className=' text-gray-700 dark:text-gray-400'>{user.username}</span></div>
                                </div>
                                <hr className=' border-1 border-gray-600 my-2' />
                                {item.products && item.products.map((items, j) => (<div key={j}><div className=' flex  items-center gap-3 '>
                                    <img src={items.product.image} alt="" className=' h-16 border-2 border-gray-300' />
                                    <h1 className=' font-semibold text-gray-800 dark:text-gray-100'>{items.product.title}</h1>
                                </div>
                                    <hr className=' border-1 border-gray-500 my-2' />
                                </div>))}

                                <Link to={`/order-details/${item._id}`} className=' px-2 py-1 bg-blue-500 font-semibold rounded-md w-full hover:bg-blue-600 transition-all duration-300 text-center '>Order Details</Link>
                            </div>
                        ))
                    }
                </div>
            </div>}
        </div>
    )
}

export default Order
