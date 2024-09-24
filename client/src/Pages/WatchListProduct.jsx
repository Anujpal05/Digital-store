import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { Hourglass } from 'react-loader-spinner';


const WatchListProduct = () => {
    const [wishList, setwishList] = useState();
    const [flag, setflag] = useState(false);
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/favourite/get-all-favourite`, { headers: { userid: localStorage.getItem('userId'), Authorization: `Bearer ${localStorage.getItem('token')}` } });
                if (res) {
                    setwishList(res.data.allFav.favourite)
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetch()
    }, [flag])


    const removeFromWishList = async (id) => {
        try {
            setflag(false)
            const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/v1/favourite/remove-favourite`, { headers: { userid: localStorage.getItem('userId'), productid: id, Authorization: `Bearer ${localStorage.getItem('token')}` } });
            toast.success(res.data.message);
            setflag(true)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const clearWishList = async () => {
        try {
            setflag(false)
            const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/v1/favourite/remove-all-favourite`, { headers: { userid: localStorage.getItem('userId'), Authorization: `Bearer ${localStorage.getItem('token')}` } });
            toast.success(res.data.message);
            setflag(true)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className=' p-5 min-h-screen overflow-x-hidden py-20'>
            {!wishList && <div className=' h-[80vh] flex justify-center items-center'>
                <Hourglass
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['#306cce', '#72a1ed']}
                />
            </div>}
            {wishList && wishList.length === 0 && <div className='text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200 h-[70vh] flex flex-col gap-3 justify-center items-center'>
                <p>You have no product in wishList</p>
                <div className='text-5xl md:text-6xl text-red-500'><FaHeart /></div>
            </div>}
            {wishList && wishList.length > 0 && <div>
                <div className=' flex max-[480px]:flex-col justify-between'>
                    <h1 className=' text-3xl font-semibold text-gray-700 dark:text-gray-200'>Your WishList</h1>
                    <button className=' text-xl font-semibold bg-red-500 p-2 w-fit  text-gray-900 rounded-md outline-none' onClick={clearWishList}>Clear WishList</button>
                </div>
                <div className=' grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 py-5'>
                    {wishList.map((product, i) => (<div className=' flex flex-col rounded-md bg-gray-300 dark:bg-gray-800  p-4 gap-4 ' key={i}>
                        <div className='group bg-white p-3 border w-full flex justify-center rounded-md'><img src={product.image} alt="product" className=' h-40 group-hover:scale-105 transition-all duration-300' /></div>
                        <Link to={`/product/${product._id}`} className=' text-xl font-semibold text-gray-700 dark:text-gray-200 dark:hover:text-blue-600 hover:text-blue-600 transition-all duration-300 hover:underline'>{product.title.length > 100 ? product.title.slice(0, 100) + "..." : product.title}</Link>
                        <div className=' text-xl font-semibold bg-pink-600 text-white rounded-md p-2 text-center hover:bg-pink-800 duration-300 transition-all'><button onClick={() => removeFromWishList(product._id)}>Remove from WishList</button></div>
                    </div>))}
                </div>
            </div>}
        </div>
    )
}

export default WatchListProduct
