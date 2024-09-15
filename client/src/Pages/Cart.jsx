import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { Hourglass } from "react-loader-spinner";
import cartImg from '../assets/emptyCart.png';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { GiHamburgerMenu } from "react-icons/gi";
import { CgMenuGridR } from "react-icons/cg";



const Cart = () => {
    const [cartProducts, setCartProducts] = useState();
    const [loader, setloader] = useState(true);
    const [total, setTotal] = useState(0);
    const [menu, setmenu] = useState('flex');
    const [quantity, setquantity] = useState(1);
    const [products, setproducts] = useState([]);
    const [bill, setbill] = useState(0);
    const navigate = useNavigate();
    const [flag, setflag] = useState(false);

    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        userid: localStorage.getItem("userId"),
    }
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/cart/get-all-cart`, { headers });
                setCartProducts(response?.data?.user?.cart)
                setloader(false)
            } catch (error) {
                console.error(error?.response?.data?.message || "Server Error!")
            }
        }
        fetch();
    }, [flag])

    useEffect(() => {
        try {
            let productArray = cartProducts && cartProducts.map(item => ({
                product: item._id,
                quantity: 1,
                bill: item.price
            }))
            setproducts(productArray);
        } catch (error) {
            console.log(error);
        }
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
        localStorage.setItem('products', JSON.stringify(products));
        navigate('/place-order-from-cart');
    }


    const removeCartBook = async (product_id) => {
        try {
            if (confirm("Are You sure to remove book from cart?")) {
                const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/v1/cart/remove-cart`, {}, {
                    headers: {
                        productid: product_id,
                        userid: localStorage.getItem("userId"),
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                toast.success(response.data.message);
                setflag(true);
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const changeQuantity = async (e, id) => {
        await setquantity(Number(e.target.value));
        await setproducts(prevItems => prevItems.map(item => item.product === id ? { ...item, quantity: quantity } : item));
    }

    return (
        <div className='  min-h-screen h-auto '>
            {loader && <div className=' w-full h-[90vh] flex justify-center items-center '>
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
                    <p className='text-3xl md:text-5xl text-gray-800  font-semibold p-3'>Empty Cart</p>
                    <img src={cartImg} alt='cart Image' className='h-36 md:h-48 lg:h-56' />
                </div>
            </>}
            {cartProducts && cartProducts.length > 0 && <div className='  p-5'>
                <div className=' flex justify-between items-center text-4xl'>
                    <h1 className='  font-semibold '>Your Cart</h1>
                    <div className={`hidden md:${menu === 'flex' ? 'flex' : 'hidden'} `} onClick={() => setmenu('hidden')}><GiHamburgerMenu /></div>
                    <div className={`hidden md:${menu === 'flex' ? 'hidden' : 'flex'}`} onClick={() => setmenu('flex')}><CgMenuGridR /></div>
                </div>
                {cartProducts.map((items, i) => (
                    <div key={i} className={` shadow-sm  bg-gray-50 shadow-gray-500  w-full  mt-5 md:${menu === 'flex' ? "hidden" : "flex"} items-center px-5 py-2`}>
                        <div className='md:flex justify-between items-center w-full grid grid-cols-3 gap-3 md:gap-8   '>
                            <Link to={`/product/${items._id}`} className=' order-1 md:order-none '>
                                <img src={items.image} alt='product' className=' h-20 min-w-14 ' />
                            </Link>
                            <div>
                                <span className=' font-semibold'>No. Of Item : </span>
                                <select name="quantity" onChange={(e) => changeQuantity(e, items._id)} id="" className=' outline-none border-2 bg-gray-200'>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                            <Link to={`/product/${items._id}`} className='col-span-3 order-2 md:order-none '>
                                <div className=' space-y-1  '>
                                    <p className=' text-xl  font-semibold'>{items.title.slice(0, 50)} </p>
                                    <p className=' text-md  font-semibold'>{items.desc.slice(0, 100)}...</p>
                                </div>
                            </Link>
                            <div className=' text-2xl  font-semibold order-1 md:order-none text-gray-600 '>&#8377;{items.price}</div>
                            <button className='w-10 mx-8 bg-red-100 md:hidden hover:bg-red-200 order-1 md:order-none text-red-600 h-10 text-2xl flex justify-center items-center rounded' onClick={() => removeCartBook(items._id)}><AiFillDelete /></button>
                        </div>
                        <button className='w-10 mx-8 hidden bg-red-100 hover:bg-red-200 text-red-600 h-10 text-2xl md:flex justify-center items-center rounded' onClick={() => removeCartBook(items._id)}><AiFillDelete /></button>
                    </div>
                ))}
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
                    {cartProducts.map((items, i) => (
                        <div key={i} className={` shadow-sm bg-gray-50 shadow-gray-500 mt-5 px-5 py-2 hidden md:${menu === 'flex' ? "flex" : "hidden"}`}>
                            <div className=' flex flex-col gap-4'>
                                <div className=''>
                                    <div className='flex justify-between items-center'>
                                        <Link to={`/product/${items._id}`} className=''>
                                            <img src={items.image} alt='product' className=' h-28' />
                                        </Link>
                                        <div className=' flex flex-col'>
                                            <span className=' font-semibold'>Quantity : </span>
                                            <select name="quantity" id="" onChange={(e) => changeQuantity(e, items._id)} className=' outline-none border-2 bg-gray-200'>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                        <button className='w-10 bg-red-100 hover:bg-red-200 text-red-600 h-10 text-2xl flex justify-center items-center rounded ' onClick={() => removeCartBook(items._id)}><AiFillDelete /></button>
                                    </div>
                                </div>
                                <Link to={`/product/${items._id}`} className='col-span-3 order-2 md:order-none '>
                                    <div className=' space-y-1  '>
                                        <p className=' text-xl  font-semibold'>{items.title}</p>
                                        <p className=' text-md  font-semibold'>{items.desc.slice(0, 100)}...</p>
                                    </div>
                                </Link>
                                <div className=' text-2xl text-gray-600  font-semibold order-1 md:order-none '>&#8377;{items.price}</div>
                            </div>

                        </div>
                    ))}
                </div>
                <div className=' w-full flex justify-end'>
                    <div className='  h-36 m-5 w-52 p-2 rounded-md space-y-3 bg-gray-100 shadow-sm shadow-gray-800'>
                        <h1 className=' text-3xl font-semibold  text-center text-gray-800'>Total Amount</h1>
                        <div className=' flex justify-between w-full  font-semibold px-3 text-gray-700'>
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
