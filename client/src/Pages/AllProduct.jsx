import React, { useEffect, useState } from 'react'
import Filter from '../Components/Filter'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Hourglass } from "react-loader-spinner"
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';


const AllProduct = () => {
    const [filter, setfilter] = useState('general');
    const [price, setprice] = useState(0);
    const [search, setSearch] = useState("");
    const [products, setproducts] = useState("");
    const isLogin = useSelector((state) => state.auth.isLogin);
    const navigate = useNavigate();
    //Adding Search feature
    useEffect(() => {
        const fetch = async () => {
            try {
                if (filter == "general") {
                    const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/getallproduct`);
                    if (price != 0) {
                        const filterData = data.data.products.filter(item => item.price < price);
                        filterData ? setproducts(filterData) : "";
                    } else {
                        data ? setproducts(data.data.products) : "";
                    }
                } else {
                    const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/product-category-wise`, { headers: { category: filter } });
                    if (price != 0) {
                        const filterData = data.data.product.filter(item => item.price < price);
                        filterData ? setproducts(filterData) : "";
                    } else {
                        data ? setproducts(data.data.product) : "";
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    }, [filter, price])

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/getallproduct`);
                let filterData = data && data.data.products.filter(item => item.category.includes(search?.toLowerCase()) || item.title?.toLowerCase().includes(search?.toLowerCase()) || item.desc.toLowerCase().includes(search?.toLowerCase()) || item.price == search);
                if (filterData) {
                    setproducts(filterData);
                    setloader(false);
                }
            } catch (error) {
                console.log(error);
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
        <div >
            <div className=' min-h-screen'>
                <div className=' px-10'>
                    <Filter filter={filter} setfilter={setfilter} setprice={setprice} setSearch={setSearch} />
                </div>
                <div>
                    {products && <div className=' px-10'>
                        <h1 className=' text-2xl font-semibold text-gray-700 py-3'>All Products Collection</h1>
                        <div className=' grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10  '>
                            {
                                products.map((item, i) => (
                                    <div key={i} className='bg-gray-200 p-3 rounded-md mb-5'>
                                        <div className=' '>
                                            <div className=' group bg-white p-1 '>
                                                <Link to={`/product/${item._id}`}>
                                                    <div className=' flex justify-end pb-2'>
                                                        <div className=' px-2 py-1 font-semibold bg-pink-700 text-white rounded-full w-fit'>{item.category}</div>
                                                    </div>
                                                    <div className=' flex justify-center items-center overflow-hidden'>
                                                        <img src={item.image} alt="" className=' h-64 group-hover:scale-105 transition-all duration-300 ' />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className=' py-3 space-y-2'>
                                            <h1 className=' text-xl font-semibold text-gray-800'>{item.title}</h1>
                                            <p className=' text-md font-semibold text-gray-600'>Price: &#8377; {item.price}</p>
                                            <div className=' bg-pink-700 py-1 text-center text-xl font-semibold rounded-full hover:scale-105 transition-all duration-300 cursor-pointer' onClick={() => addToCart(item._id)}>Add To Cart</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>}
                    {
                        !products && <div className=' py-20 flex justify-center items-center min-w-screen'>
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
            </div>
        </div>
    )
}

export default AllProduct
