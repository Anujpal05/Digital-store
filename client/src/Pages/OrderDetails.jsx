import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const OrderDetails = () => {
    const orderid = useParams();
    const [order, setorder] = useState([]);
    const [date, setdate] = useState({
        orderDate: "",
        orderTime: ""
    })
    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/order/get-order`, { headers: orderid })
                setorder(data.data.order);
            } catch (error) {
                console.log(error)
            }
        }
        fetch();
    }, [])

    useEffect(() => {
        setdate({ orderDate: formatDate(order.createdAt), orderTime: formatTime(order.createdAt) });
    }, [order])

    const formatDate = (isodate) => {
        const date = new Date(isodate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const formatTime = (isodate) => {
        const date = new Date(isodate);
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');
        return `${hour}:${minute}:${second}`
    }

    return (
        <div>
            {order &&
                <div className=' p-2 px-10'>
                    <p className=' text-3xl md:text-4xl font-semibold text-gray-800 text-center p-2'>Order Details</p>
                    <div className=' flex flex-col md:flex-row justify-between md:items-center bg-gray-50 p-2'>
                        <p className=' text-xl font-semibold'>Order id: <span className=' text-base text-gray-700 font-semibold'>{order._id}</span></p>
                        <div className=' flex  gap-4'>
                            {date.orderDate && <p className=' text-xl font-semibold'>Date: <span className=' text-base text-gray-700 font-semibold'>{date.orderDate}</span></p>}
                            {date.orderTime && <p className=' text-xl font-semibold'>Time: <span className=' text-base text-gray-700 font-semibold'>{date.orderTime}</span></p>}
                        </div>
                    </div>
                    {order.products && order.products.map((item, i) => (
                        <div key={i} className=' bg-gray-50 mb-10 my-2 hover:bg-gray-100 transition-all duration-300'>
                            <Link to={`/product/${item.product._id}`}>
                                <p className=' text-xl font-semibold p-2  '>Item's Order id: <span className='text-gray-700 text-md'>{item._id}</span></p>
                                <hr className='border-[1px] border-gray-400' />
                                <div className=' flex flex-col md:flex-row items-center gap-5 p-2'>
                                    <img src={item.product.image} alt="product" className=' h-60 border-2 hover:scale-105 ' />
                                    <div>
                                        <p className=' font-semibold text-2xl'>{item.product.title}</p>
                                        <p className=' font-semibold text-md py-2 text-gray-500'>{item.product.desc.slice(0, 300)}...</p>
                                        <p className=' text-md font-semibold '>Payment Mode: <span className=' text-base font-semibold text-gray-700'>{order.paymentMode}</span></p>
                                        <p className=' text-md font-semibold '>Payment Status: <span className=' text-base font-semibold text-gray-700'>{order.paymentStatus}</span></p>
                                        <p className=' text-md font-semibold '>Order Status: <span className=' text-base font-semibold text-gray-700'>{order.orderStatus}</span></p>
                                        <p className=' text-md font-semibold '>Bill: <span className=' text-base font-semibold text-gray-700'>&#8377; {order.other[0].bill}</span></p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default OrderDetails
