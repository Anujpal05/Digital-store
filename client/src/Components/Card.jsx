import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const Card = ({ item }) => {

    const isLogin = useSelector((state) => state.auth.isLogin);
    const navigate = useNavigate();

    const addToCart = async (product_id) => {
        try {
            if (!isLogin) {
                navigate("/login")
                return;
            }
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/cart/add-cart`, {}, {
                headers: {
                    userid: localStorage.getItem('userId'),
                    productid: product_id,
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            toast.success(res?.data?.message);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className=' lg:p-5 p-2 flex flex-col gap-2'>
            <Link to={`/product/${item._id}`} className=' bg-white rounded-sm w-full flex justify-center items-center p-4'><img src={item.image} alt="Product Image" className='h-auto max-lg:max-h-28 lg:h-40 ' /></Link>
            <div className=' flex flex-col gap-1 bg-gray-200 lg:p-3 p-1 rounded-md dark:bg-gray-800 dark:text-gray-100'>
                <p className=' text-[16px] lg:text-xl font-semibold'>{item.title && item.title.substring(0, 50)}...</p>
                <p className=' text-[14px] lg:text-md font-semibold text-gray-500 dark:text-gray-400'>&#8377; {item.price}</p>
                <button className=' text-[14px] lg:text-lg w-full bg-pink-700 hover:bg-pink-800 hover:scale-105 text-gray-50 font-semibold text-center py-1 lg:py-2 rounded-md ' onClick={() => addToCart(item._id)}>Add To Cart</button>
            </div>
        </div>
    )
}

export default Card
