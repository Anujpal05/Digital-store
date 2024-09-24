import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import Img from '../assets/general.png'

const SalesmanProducts = () => {
    const { id } = useParams();
    const [products, setproducts] = useState()
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/get-salesman-products`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, id: id } });
                setproducts(res?.data?.products);
            } catch (error) {
                toast.error(error.data.response.message)
            }
        }
        fetch()
    }, [])

    const formatDate = (isodate) => {
        const date = new Date(isodate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    return (
        <div className=' min-h-screen p-5 overflow-x-hidden pt-20'>
            {
                !products && <div className=' min-h-[50vh] min-w-full flex justify-center items-center'>
                    <ThreeDots
                        visible={true}
                        height="100"
                        width="100"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            }
            {products && products.length === 0 && <div className=' text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-500 h-[80vh] flex flex-col justify-center items-center'>
                <p>Products not found</p>
                <img src={Img} alt="Products" className=' h-40 lg:h-52' />
            </div>}
            {products && products.length > 0 && <div>
                <h1 className=' text-3xl font-semibold text-gray-700 dark:text-gray-200 '>Salesman All Products</h1>
                <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5  '>
                    {products.map((product, i) => (
                        <div className=' bg-gray-50 dark:bg-gray-800 dark:text-gray-200 shadow-md dark:shadow-gray-700 shadow-gray-400 rounded-md px-3 lg:px-2'>
                            <div className=' px-1 '>
                                <div className=' flex flex-col md:flex-row py-2 '>
                                    <div className=' flex justify-center items-center border-[1px] w-full p-1 bg-white rounded-md'><img src={product.image} alt="product Image" className=' h-28 lg:h-40  ' /></div>
                                    <div className=' lg:px-4 px-2'>
                                        <div className=' text-md font-semibold'>
                                            Id: <span className=' text-md font-semibold text-gray-600 dark:text-gray-400'>{product._id}</span>
                                        </div>
                                        <div className=' text-md font-semibold'>
                                            Price: <span className=' text-md font-semibold text-gray-600 dark:text-gray-400'>&#8377; {product.price}</span>
                                        </div>
                                        <div className=' text-md font-semibold'>
                                            Post Date: <span className=' text-md font-semibold text-gray-600 dark:text-gray-400'>{formatDate(product.createdAt)}</span>
                                        </div>
                                        <div className=' lg:py-4 py-1 '><div className=' bg-pink-600 text-white text-sm lg:text-md font-semibold w-fit lg:px-3 p-1   px-2 rounded-full '>{product.category}</div></div>
                                    </div>
                                </div>
                            </div>
                            <Link to={`/product/${product._id}`} className=' px-2 text-gray-700 font-semibold hover:text-blue-500 transition-all duration-300 hover:underline cursor-pointer dark:text-gray-400 dark:hover:text-blue-600'>
                                <p>{product.title}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    )
}

export default SalesmanProducts
