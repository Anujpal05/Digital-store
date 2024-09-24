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
        <div className=' p-5 flex flex-col gap-2'>
            <Link to={`/product/${item._id}`} className=' bg-white rounded-sm shadow-md shadow-gray-300 w-full flex justify-center items-center p-4'><img src={item.image} alt="Product Image" className=' h-64' /></Link>
            <div className=' flex flex-col gap-1 bg-gray-100 p-3 rounded-md dark:bg-gray-800 dark:text-gray-100'>
                <p className=' text-xl font-semibold'>{item.title}</p>
                <p className=' text-md font-semibold text-gray-500 dark:text-gray-400'>&#8377; {item.price}</p>
                <button className=' w-full bg-pink-700 hover:bg-pink-800 hover:scale-105 text-gray-50 font-semibold text-center py-2 rounded-md ' onClick={() => addToCart(item._id)}>Add To Cart</button>
            </div>
        </div>
    )
}

export default Card
