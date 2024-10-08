import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { ThreeDots } from "react-loader-spinner"
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setproduct] = useState();
    const [relatedProducts, setrelatedProducts] = useState();
    const isLogin = useSelector((state) => state.auth.isLogin);
    const role = useSelector((state) => state.auth.role)
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/getproduct`, { headers: { id } });
                if (data) {
                    setproduct(data.data.product)
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetch();
    }, [id])

    useEffect(() => {
        const fetch = async () => {
            try {
                const relatedData = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/product-category-wise`, { headers: { category: product?.category } });
                const filterData = relatedData && relatedData?.data?.product?.filter(item => item?._id != product?._id).slice(0, 4);
                setrelatedProducts(filterData);
            } catch (error) {
                console.log(error.response.data.message)
            }
        }
        if (product) {
            fetch();
        }
    }, [product, id])

    const addToWishList = async () => {
        try {
            if (!isLogin) {
                navigate("/login")
                return;
            }
            const data = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/v1/favourite/add-favourite`, {}, {
                headers:
                {
                    productid: id,
                    userid: localStorage.getItem('userId'),
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            toast.success(data.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const addToCart = async () => {
        try {
            if (!isLogin) {
                navigate("/login")
                return;
            }
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/cart/add-cart`, {}, {
                headers: {
                    userid: localStorage.getItem('userId'),
                    productid: id,
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const deleteProduct = async (e) => {
        try {
            e.preventDefault();
            if (confirm("Are you sure to delete this product?")) {
                const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/delete-product`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, id: id } });
                toast.success(res.data.message)
                navigate('/all-product')
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className=' dark:bg-gray-950 py-10'>
            {product && <div>
                <div className=' grid lg:grid-cols-2 md:grid-cols-1 py-16 lg:p-20 p-4 gap-10'>
                    <div className=' space-y-5 '>
                        <div className=' flex justify-center'>
                            <div className='  w-fit p-6 '>
                                <div className=' xl:h-96 xl:w-96 h-80 md:w-80 w-full bg-white flex justify-center items-center rounded-md '><img src={product.image} alt="" className=' h-full' /></div>
                            </div>
                        </div>
                        {<div className=' flex justify-evenly flex-col md:flex-row gap-2 transition-all '>
                            <button className=' p-2 px-5  bg-gray-200 dark:bg-gray-500 dark:shadow-gray-700  rounded-full text-xl font-semibold hover:scale-105 hover:bg-gray-300 shadow-md shadow-gray-400 transition-all duration-300 outline-none ' onClick={addToWishList}>Add To WishList</button>
                            <button className=' p-2 px-5 bg-blue-400 text-gray-900 rounded-full text-xl font-semibold shadow-md shadow-gray-400 transition-all duration-300 outline-none hover:bg-blue-500 hover:scale-105 dark:' onClick={addToCart}>Add To Cart</button>
                        </div>}
                        {(product.supplierId === localStorage.getItem("userId") || role === 'admin') && <div className=' flex justify-evenly  flex-col md:flex-row gap-2 transition-all '>
                            <Link to={`/update-product/${product._id}`} className=' p-2 px-5 flex items-center justify-center w-full md:w-fit gap-2  bg-gray-200 dark:bg-gray-500 dark:shadow-gray-700   rounded-full text-xl font-semibold hover:scale-105 hover:bg-gray-300 shadow-md shadow-gray-400 transition-all duration-300 outline-none ' ><span className=' text-2xl text-blue-500 font-semibold'><MdEdit /></span>Edit</Link>
                            <button className=' p-2 px-5 flex items-center justify-center w-full md:w-fit gap-2 bg-blue-400 text-gray-900 rounded-full text-xl font-semibold shadow-md shadow-gray-400 transition-all duration-300 outline-none hover:bg-blue-500 hover:scale-105' onClick={deleteProduct}><span className=' text-2xl  text-red-500 font-semibold'><MdDelete /></span>Delete</button>
                        </div>}
                    </div>
                    <div className='min-h-[70%] flex flex-col justify-center space-y-5 '>
                        <p className=' text-3xl dark:text-gray-100 font-semibold '>{product.title}</p>
                        <div>
                            <h1 className=' text-2xl font-semibold pb-1'>About</h1>
                            <p className=' text-md text-gray-700 dark:text-gray-200 font-semibold'>{product.desc}</p>
                        </div>
                        <p className=' text-xl font-semibold text-gray-600 dark:text-gray-400'>Price : &#8377; {product.price}</p>
                        <div className=' flex gap-20'>
                            {product.category == "clothes" && <div className='flex  justify-center items-center gap-2'><p className=' text-lg font-semibold text-gray-700  py-1 dark:text-gray-400'>Size : </p> <select name="size" className=' outline-none border-2 rounded-sm border-gray-500 dark:bg-gray-800 dark:text-gray-100 '>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="2XL">2XL</option>
                            </select></div>}
                            <div className=' text-xl font-semibold text-gray-700 dark:text-gray-200 '>Available : 20</div>
                        </div>
                        <Link to={`/place-order/productid/${id}`} className=' text-center p-2 bg-pink-700 text-gray-200 font-bold text-xl w-full rounded-full hover:bg-pink-600 shadow-md shadow-gray-400 dark:shadow-gray-600 '>Buy Now</Link>
                        <div>

                        </div>
                    </div>
                </div>
                {relatedProducts && <div>
                    <hr />
                    <div className=' flex justify-end  items-center pt-10 lg:px-16 px-2' ><Link to={`/category/${product.category}`} className=' border-2 border-black bg-gray-100 dark:bg-gray-800 dark:border-gray-100 dark:text-gray-50 hover:scale-105 font-semibold rounded-full px-2 p-1 flex justify-center items-center gap-1 transition-all duration-300'><p >view more</p><p><TbPlayerTrackNextFilled /></p></Link></div>
                    <div className=' flex justify-evenly p-5  gap-5 lg:pl-16 overflow-auto dark:scrollbar dark:scrollbar-thumb-gray-700 w-screen'>
                        {
                            relatedProducts.map((item, i) => (
                                <div key={i} className=' bg-gray-200 dark:bg-gray-800 dark:shadow-gray-600 shadow-md shadow-gray-300 min-w-full md:min-w-[50%] lg:min-w-[40%]'>
                                    <div className='group bg-white py-3  '>
                                        <div className=' flex justify-end lg:px-4 p-1'><div className=' bg-pink-600 text-white text-sm lg:text-md font-semibold w-fit lg:px-3 p-1 rounded-full '>{item.category}</div></div>
                                        <Link to={`/product/${item._id}`} className=' flex justify-center items-center overflow-hidden'><img src={item.image} alt="Product Image" className=' lg:h-80 h-60 w-auto group-hover:scale-105 transition-all duration-300' /></Link></div>
                                    <div className=' p-4'>
                                        <div className=' flex flex-col justify-center  gap-2 p-1'>
                                            <h1 className=' text-lg font-semibold dark:text-gray-200' >{item.title}</h1>
                                            <p className=' text-md font-semibold text-gray-500 dark:text-gray-400'>Price :&#8377; {item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>}
            </div>}

            {
                !product && <div className=' min-h-screen min-w-full flex justify-center items-center'>
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
        </div>
    )
}

export default ProductDetails
