import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from "../Components/Footer";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { ThreeDots } from "react-loader-spinner"
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ProductCard = () => {
    const { id } = useParams();
    const [product, setproduct] = useState();
    const [relatedProducts, setrelatedProducts] = useState();
    const isLogin = useSelector((state) => state.auth.isLogin);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {

                const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/getproduct`, { headers: { id } });
                if (data) {
                    await setproduct(data.data.product)
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetch();
    }, [])

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
        fetch();
    }, [product])

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
                    productid: id
                }
            })
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div>
            {product && <div>
                <div className=' grid lg:grid-cols-2 md:grid-cols-1 py-16 lg:p-20 p-4 gap-10'>
                    <div className=' space-y-5 '>
                        <div className=' flex justify-center'>
                            <div className='  w-fit p-6 '>
                                <div className=' xl:h-96 xl:w-96 h-80 md:w-80 w-full bg-white flex justify-center items-center rounded-md '><img src={product.image} alt="" className=' h-full' /></div>
                            </div>
                        </div>
                        <div className=' flex justify-evenly flex-col md:flex-row gap-2 transition-all '>
                            <button className=' p-2 px-5 border- border-gray-900 bg-gray-200 rounded-full text-xl font-semibold hover:scale-105 hover:bg-gray-300 shadow-md shadow-gray-400 transition-all duration-300 ' onClick={addToWishList}>Add To WishList</button>
                            <button className=' p-2 px-5 border-  border-gray-900 bg-blue-400 text-gray-900 rounded-full text-xl font-semibold shadow-md shadow-gray-400 transition-all duration-300 hover:bg-blue-500 hover:scale-105' onClick={addToCart}>Add To Cart</button>
                        </div>
                    </div>
                    <div className='min-h-[70%] flex flex-col justify-center space-y-5'>
                        <p className=' text-3xl font-semibold '>{product.title}</p>
                        <div>
                            <h1 className=' text-2xl font-semibold pb-1'>About</h1>
                            <p className=' text-md text-gray-700 font-semibold'>{product.desc}</p>
                        </div>
                        <p className=' text-xl font-semibold text-gray-600'>Price : &#8377; {product.price}</p>
                        <div className=' flex gap-20'>
                            {product.category == "clothes" && <div className='flex  justify-center items-center gap-2'><p className=' text-lg font-semibold text-gray-700 py-1'>Size : </p> <select name="size" className=' outline-none border-2 rounded-sm border-gray-500 '>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="2XL">2XL</option>
                            </select></div>}
                            <div className=' text-xl font-semibold text-gray-700 '>Available : 20</div>
                        </div>
                        <button className=' p-2 bg-pink-700 text-gray-200 font-bold text-xl w-full rounded-full hover:bg-pink-600 shadow-md shadow-gray-400'>Buy Now</button>
                        <div>

                        </div>
                    </div>
                </div>
                {relatedProducts && <div>
                    <hr />
                    <div className=' flex justify-end  items-center pt-10 lg:px-16 px-2' ><Link to={`/category/${product.category}`} className=' border-2 border-black bg-gray-100 hover:scale-105 font-semibold rounded-full px-2 p-1 flex justify-center items-center gap-1 transition-all duration-300'><p >view more</p><p><TbPlayerTrackNextFilled /></p></Link></div>
                    <div className=' flex justify-evenly p-5  gap-5 lg:pl-16 overflow-auto w-screen'>
                        {
                            relatedProducts.map((item, i) => (
                                <div key={i} className=' bg-gray-200 shadow-md shadow-gray-300 min-w-full md:min-w-[50%] lg:min-w-[20%]'>
                                    <div className='group bg-white py-3  '>
                                        <div className=' flex justify-end lg:px-4 p-1'><div className=' bg-pink-600 text-white text-sm lg:text-md font-semibold w-fit lg:px-3 p-1 rounded-full '>{item.category}</div></div>
                                        <Link to={`/product/${item._id}`} className=' flex justify-center items-center overflow-hidden'><img src={item.image} alt="Product Image" className=' lg:h-80 h-60 w-auto group-hover:scale-105 transition-all duration-300' /></Link></div>
                                    <div className=' p-4'>
                                        <div className=' flex flex-col justify-center  gap-2 p-1'>
                                            <h1 className=' text-lg font-semibold' >{item.title}</h1>
                                            <p className=' text-md font-semibold text-gray-500'>Price :&#8377; {item.price}</p>
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
            <div className=' pt-16'>
                <Footer />
            </div>
        </div>
    )
}

export default ProductCard
