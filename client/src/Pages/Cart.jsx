import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { Hourglass } from "react-loader-spinner";
import cartImg from '../assets/emptyCart.png';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ProductCard from '../Components/ProductCard';

const Cart = () => {
    const [cartProducts, setCartProducts] = useState();
    const [loader, setloader] = useState(true);
    const [total, setTotal] = useState(0);
    const [length, setlength] = useState(0);
    const navigate = useNavigate();

    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        userid: localStorage.getItem("userId"),
    }
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/cart/get-all-cart`, { headers });
                setCartProducts(response.data.user.cart)
                setloader(false)
            } catch (error) {
                toast.error(error.response.data.message || "Server Error!")
            }
        }
        fetch();
    }, [cartProducts])

    useEffect(() => {
        if (cartProducts && cartProducts.length > 0) {
            let total = 0;
            cartProducts && cartProducts.map((items) => (
                total += items.price
            ))
            setTotal(total);
            total = 0;
        }
    }, [cartProducts])

    const placeOrder = async () => {
        toast.success("Coming Soon...");
    }


    const removeCartBook = async (product_id) => {
        try {
            if (confirm("Are You sure to remove book from cart?")) {
                const response = await axios.put(`http://localhost:8080/api/v1/cart/remove-cart`, {}, {
                    headers: {
                        productid: product_id,
                        userid: localStorage.getItem("userId")
                    }
                });
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='  min-h-screen h-auto '>
            {loader && <div className=' w-full h-screen flex justify-center items-center '>
                <Hourglass
                    visible={loader}
                    height="100"
                    width="100"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['#306cce', '#72a1ed']}
                />
            </div>}
            {cartProducts && cartProducts.length == 0 && <>
                <div className='h-screen flex flex-col justify-center items-center'>
                    <p className=' text-5xl  font-semibold p-3'>Empty Cart</p>
                    <img src={cartImg} alt='cart Image' className=' h-48' />
                </div>
            </>}
            {cartProducts && cartProducts.length > 0 && <div className='  p-5'>
                <h1 className=' text-4xl  '>Your Cart</h1>
                {cartProducts.map((items, i) => (
                    <div key={i} className=' shadow-sm  bg-gray-50 shadow-gray-500 bg-gray-    w-full  mt-5 flex items-center px-5 py-2'>
                        <div className='md:flex justify-between items-center w-full grid grid-cols-3 gap-3 md:gap-8   '>
                            <Link to={`/product/${items._id}`} className=' order-1 md:order-none '>
                                <img src={items.image} alt='book' className=' h-20 min-w-14 ' />
                            </Link>
                            <Link to={`/product/${items._id}`} className='col-span-3 order-2 md:order-none '>
                                <div className=' space-y-1  '>
                                    <p className=' text-xl  font-semibold'>{items.title}</p>
                                    <p className=' text-md  font-semibold'>{items.desc.slice(0, 100)}...</p>
                                </div>
                            </Link>
                            <div className=' text-2xl  font-semibold order-1 md:order-none '>&#8377;{items.price}</div>
                            <button className='w-10 mx-8 bg-red-100 md:hidden hover:bg-red-200 order-1 md:order-none text-red-600 h-10 text-2xl flex justify-center items-center rounded' onClick={() => removeCartBook(items._id)}><AiFillDelete /></button>
                        </div>
                        <button className='w-10 mx-8 hidden bg-red-100 hover:bg-red-200 text-red-600 h-10 text-2xl md:flex justify-center items-center rounded' onClick={() => removeCartBook(items._id)}><AiFillDelete /></button>
                    </div>
                ))}
                <div className=' w-full flex justify-end'>
                    <div className='  h-36 m-5 w-52 p-2 rounded-md space-y-3 bg-gray-100 shadow-sm shadow-gray-800'>
                        <h1 className=' text-3xl font-semibold  text-center'>Total Amount</h1>
                        <div className=' flex justify-between w-full  font-semibold px-3'>
                            <p className=''>{cartProducts.length} products</p>
                            <p>&#8377; {total}</p>
                        </div>
                        <button className=' bg-blue-400 p-2  font-semibold text-md w-full rounded-md hover:bg-blue-500 outline-none transition-all duration-300' onClick={placeOrder}>Place your order</button>
                    </div>
                </div>
            </div>}
        </div>
    )

}

export default Cart
