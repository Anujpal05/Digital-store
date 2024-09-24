import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { Hourglass } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function LatestCollection({ filter, price, search }) {
    const [product, setproduct] = useState();
    const isLogin = useSelector((state) => state.auth.isLogin);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (filter == "general") {
                    const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/getallproduct`);
                    if (price != 0) {
                        const filterData = data.data.products.filter(item => item.price < price);
                        filterData ? setproduct(filterData) : "";
                    } else {
                        data ? setproduct(data.data.products) : "";
                    }
                } else {
                    const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/product-category-wise`, { headers: { category: filter } });
                    if (price != 0) {
                        const filterData = data.data.product.filter(item => item.price < price);
                        filterData ? setproduct(filterData) : "";
                    } else {
                        data ? setproduct(data.data.product) : "";
                    }
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetchData();
    }, [filter, price]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/getallproduct`);
                let filterData = data && data.data.products.filter(item => item.category.includes(search.toLowerCase()) || item.title.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase()) || item.price == search);
                if (filterData) {
                    setproduct(filterData);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetch();
    }, [search])


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
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div>
            <h1 className=' text-2xl font-semibold dark:text-gray-100'><span className=' border-b-4 py-[2px] border-pink-700'>Our Lat</span>est Collection</h1>
            <div className=' gap-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 py-5'>
                {product && product.map((item, i) => (
                    <div key={i} className=' group bg-gray-50 dark:bg-gray-900 p-5 flex flex-col gap-2 '>
                        <Link to={`/product/${item._id}`} className=' bg-white  dark:shadow-gray-600     rounded-sm shadow-md shadow-gray-300 w-full flex justify-center items-center p-4 overflow-hidden'><img src={item.image} alt="Product Image" className=' h-64 group-hover:scale-110 transition-all duration-500' /></Link>
                        <div className=' flex flex-col gap-1 bg-gray-100 dark:bg-gray-800 dark:text-gray-100 p-3 rounded-md'>
                            <p className=' text-xl font-semibold'>{item.title}</p>
                            <p className=' text-md font-semibold text-gray-500 dark:text-gray-400'>&#8377; {item.price}</p>
                            <button className=' w-full bg-pink-700 hover:bg-pink-800 hover:scale-105 text-gray-50 font-semibold text-center py-2 rounded-md ' onClick={() => addToCart(item._id)}>Add To Cart</button>
                        </div>
                    </div>
                ))}
            </div>
            {
                !product && <div className=' flex justify-center items-center lg:py-28 py-10'>
                    <Hourglass
                        visible={true}
                        height="120"
                        width="120"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={['#306cce', '#72a1ed']}
                    />
                </div>
            }
        </div>
    )
}

export default LatestCollection
