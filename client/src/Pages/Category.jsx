import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../Components/Card';
import { Hourglass } from "react-loader-spinner"
import { IoSearch } from "react-icons/io5";
import toast from 'react-hot-toast';

const Category = () => {
    const { category } = useParams();
    const [product, setproduct] = useState();
    const [search, setsearch] = useState("");
    const title = category ? category.charAt(0).toUpperCase() + category.slice(1) : "";

    //Fetching product category-wise and all product data
    useEffect(() => {
        try {
            const fetch = async () => {
                if (category != 'general') {
                    const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/product-category-wise`, { headers: { category: category } });
                    if (data) {
                        setproduct(data?.data?.product);
                    }
                } else {
                    const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/getallproduct`);
                    if (data) {
                        setproduct(data?.data?.products);
                    }
                }

            }
            fetch();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }, [])


    //Using Search feature
    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/product-category-wise`, { headers: { category: category } });
                let filterData = data && data.data.product.filter(item => item.category.includes(search?.toLowerCase()) || item.title?.toLowerCase().includes(search?.toLowerCase()) || item.desc.toLowerCase().includes(search?.toLowerCase()) || item.price == search);
                if (filterData) {
                    setproduct(filterData);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetch();
    }, [search])

    const handleSearch = (e) => {
        setsearch(e.target.value);
    }

    return (
        <div className=' lg:px-16 px-5 py-20 dark:bg-gray-950 '>
            <div className=' border-2 border-gray-700 shadow-md dark:bg-gray-800 dark:text-white dark:shadow-gray-700 shadow-gray-300 p-2 rounded-full flex justify-center items-center gap-3'><p className=' text-xl text-gray-500  '><IoSearch /></p><input type="text" placeholder='Search here' name="" className=' w-full outline-none dark:bg-gray-800 ' onChange={handleSearch} /></div>
            <h1 className=' text-2xl font-semibold py-3 dark:text-gray-100'><span className=' py-[2px] border-b-4 border-pink-700'>Our {title && title.slice(0, 3)}</span>{title.slice(3)} Collections</h1>
            <div className=' grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 bg-gray-50 dark:bg-gray-900'>
                {product && product.map((item, i) => (
                    <div key={i}><Card item={item} /></div>
                ))}
            </div>
            {!product && <div className=' min-h-screen min-w-full flex justify-center items-center'>
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
        </div>
    )
}

export default Category
