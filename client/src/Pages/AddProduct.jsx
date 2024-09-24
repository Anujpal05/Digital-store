import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [product, setproduct] = useState({
        title: "",
        desc: "",
        image: "",
        category: "",
        price: ""
    })
    const navigate = useNavigate();

    const handleValue = (e) => {
        const { name, value } = e.target;
        setproduct({ ...product, [name]: value });
    }

    const addNewProduct = async (e) => {
        try {
            e.preventDefault();
            const data = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/addproduct`, product, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            toast.success(data?.data?.message);
            navigate('/all-product');
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
    return (
        <div className=' min-h-screen py-10'>
            <div className=' flex justify-center items-center min-h-[90vh] '>
                <form action="" className=' flex flex-col justify-center items-center h-fit w-[90%] md:w-fit p-5 rounded-md  gap-4 bg-gray-100  shadow-md shadow-black dark:bg-gray-800   ' onSubmit={addNewProduct}>
                    <p className=' text-2xl text-center text-gray-800 dark:text-gray-200 font-semibold'>Add Product</p>
                    <div className=' flex flex-col w-full  '>
                        <label className=' text-md font-semibold text-gray-600 dark:text-gray-400'>Enter product name</label>
                        <input type="text" name='title' className=' outline-none bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 p-1 px-2 rounded-md w-full md:w-96 border-[2px] border-gray-300' placeholder='Enter product name' onChange={handleValue} value={product.title} required />
                    </div>
                    <div className=' flex flex-col w-full '>
                        <label className=' text-md font-semibold text-gray-600 dark:text-gray-400'>Enter product description</label>
                        <textarea type="text" name="desc" rows={3} className=' outline-none bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 p-1 px-2 rounded-md w-full md:w-96 border-[2px] border-gray-300' placeholder='Enter product description' onChange={handleValue} value={product.desc} ></textarea>
                    </div>
                    <div className=' flex flex-col w-full '>
                        <label className=' text-md font-semibold text-gray-600 dark:text-gray-400'>Enter product image</label>
                        <input type="text" name="image" className=' outline-none bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 p-1 px-2 rounded-md w-full md:w-96 border-[2px] border-gray-300' placeholder='Enter product image' onChange={handleValue} value={product.image} required />
                    </div>
                    <div className=' flex flex-col w-full '>
                        <label className=' text-md font-semibold text-gray-600 dark:text-gray-400'>Enter product category</label>
                        <input type="text" name="category" className=' outline-none bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 p-1 px-2 rounded-md w-full md:w-96 border-[2px] border-gray-300' placeholder='Enter product category' onChange={handleValue} value={product.category} required />
                    </div>
                    <div className=' flex flex-col w-full '>
                        <label className=' text-md font-semibold text-gray-600 dark:text-gray-400'>Enter product price</label>
                        <input type='number' name='price' className=' outline-none bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 p-1 px-2 rounded-md w-full md:w-96 border-[2px] border-gray-300' placeholder='Enter product price' onChange={handleValue} value={product.price} required />
                    </div>
                    <button type='submit' className=' px-2 py-1 bg-blue-500 w-full text-xl font-semibold text-center rounded-md'>Add Product</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct
