import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setproduct] = useState({
        title: "",
        desc: "",
        image: "",
        category: "",
        price: ""
    })

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/getproduct`, { headers: { id } });
                if (res) {
                    setproduct({
                        title: res.data.product.title,
                        desc: res.data.product.desc,
                        image: res.data.product.image,
                        category: res.data.product.category,
                        price: res.data.product.price
                    })
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetch();
    }, [])

    const updateProduct = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/update-product`, product, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, id: id } });
            toast.success(res.data.message)
            navigate(`/product/${id}`);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const handleValue = (e) => {
        const { name, value } = e.target;
        setproduct({ ...product, [name]: value });
    }
    return (
        <div className=' min-h-screen '>
            {product && <div className=' flex justify-center items-center min-h-[90vh] pt-5 '>
                <form action="" className=' flex flex-col justify-center items-center h-fit w-[90%] md:w-fit p-5 rounded-md  gap-4 bg-gray-100  shadow-md shadow-black  ' onSubmit={updateProduct}>
                    <p className=' text-2xl text-center text-gray-800 font-semibold'>Update Product Details</p>
                    <div className=' flex flex-col w-full  '>
                        <label className=' text-md font-semibold text-gray-600'>Enter product name</label>
                        <input type="text" name='title' className=' outline-none bg-gray-200 p-1 px-2 rounded-md w-full md:w-96 border-[2px] border-gray-300' placeholder='Enter product name' onChange={handleValue} value={product.title} required />
                    </div>
                    <div className=' flex flex-col w-full '>
                        <label className=' text-md font-semibold text-gray-600'>Enter product description</label>
                        <textarea type="text" name="desc" rows={3} className=' outline-none bg-gray-200 p-1 px-2 rounded-md w-full md:w-96 border-[2px] border-gray-300' placeholder='Enter product description' onChange={handleValue} value={product.desc} ></textarea>
                    </div>
                    <div className=' flex flex-col w-full '>
                        <label className=' text-md font-semibold text-gray-600'>Enter product image</label>
                        <input type="text" name="image" className=' outline-none bg-gray-200 p-1 px-2 rounded-md w-full md:w-96 border-[2px] border-gray-300' placeholder='Enter product image' onChange={handleValue} value={product.image} required />
                    </div>
                    <div className=' flex flex-col w-full '>
                        <label className=' text-md font-semibold text-gray-600'>Enter product category</label>
                        <input type="text" name="category" className=' outline-none bg-gray-200 p-1 px-2 rounded-md w-full md:w-96 border-[2px] border-gray-300' placeholder='Enter product category' onChange={handleValue} value={product.category} required />
                    </div>
                    <div className=' flex flex-col w-full '>
                        <label className=' text-md font-semibold text-gray-600'>Enter product price</label>
                        <input type='number' name='price' className=' outline-none bg-gray-200 p-1 px-2 rounded-md w-full md:w-96 border-[2px] border-gray-300' placeholder='Enter product price' onChange={handleValue} value={product.price} required />
                    </div>
                    <button type='submit' className=' px-2 py-1 bg-blue-500 w-full text-xl font-semibold text-center rounded-md'>Update Product</button>
                </form>
            </div>}
        </div>
    )
}

export default UpdateProduct
