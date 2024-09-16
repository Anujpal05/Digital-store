import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Hourglass } from 'react-loader-spinner';
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const AllOrders = () => {
    const [orders, setorders] = useState();
    const [status, setstatus] = useState();
    const [paymentStatus, setpaymentStatus] = useState();
    const [options, setoptions] = useState(-1);
    const [term, setterm] = useState(0);
    const [value, setvalue] = useState("");

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await axios.get("http://localhost:8080/api/v1/order/get-all-orders", { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
                setorders(data?.data?.orders);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        if (options === -1) {
            fetch();
        }
    }, [options])

    //Format date and time
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

    //updating order status
    const updateOrderStatus = async (id) => {
        try {
            const data = await axios.put("http://localhost:8080/api/v1/order/update-orderstatus", { orderStatus: status }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, orderid: id } });
            setoptions(-1);
            setterm(0);
            toast.success(data.data.message);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    //Updating payment status
    const updatePaymentStatus = async (id) => {
        try {
            const data = await axios.put("http://localhost:8080/api/v1/order/update-paymentstatus", { paymentStatus: paymentStatus }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, orderid: id } });
            setoptions(-1);
            setterm(0);
            toast.success(data.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const filterOrder = async (e) => {
        try {
            const val = e.target.value;
            if (val) {
                const data = await axios.get("http://localhost:8080/api/v1/order/get-all-orders", { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
                let filteredOrder = data && data.data && data.data.orders.filter(item => item.orderStatus.toLowerCase().includes(val.trim().toLowerCase()) || item.paymentMode.toLowerCase().includes(val.trim().toLowerCase()) || item.paymentStatus.toLowerCase().includes(val.trim().toLowerCase()) || item._id.toLowerCase().includes(val.trim().toLowerCase()) || item._id.toLowerCase().includes(val.trim().toLowerCase()) || item.user.address.toLowerCase().includes(val.trim().toLowerCase()) || item.user.email.includes(val.trim().toLowerCase()) || item.user.username.includes(val.trim().toLowerCase()));
                setorders(filteredOrder)
            }
        } catch (error) {
            console(error.response.data.message);
        }
    }

    return (
        <div>
            {!orders && <div className=' h-[90vh] flex justify-center items-center'>
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
            {orders && <div className=' p-7'>
                <div className=' w-full' >
                    <input type="text" name="filter" onChange={(e) => filterOrder(e)} placeholder='Search order id , order Status , payment status , username etc.' className=' w-full p-2 px-5 border-2 border-gray-800 rounded-full text-md outline-none' />
                </div>
                <h1 className=' text-3xl font-semibold mt-2'>All Orders</h1>
                <div className=' py-5 gap-5 max-h-screen overflow-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 '>
                    {orders && orders.map((item, i) => (
                        <div key={i} className=' bg-gray-200 p-4 rounded-md shadow-md shadow-gray-700 hover:bg-gray-300 transition-all duration-500 h-fit'>
                            <p className=' text-md font-semibold '>Order id: <span className=' text-base text-gray-700'>{item._id}</span></p>
                            <div className=' flex gap-8'>
                                <p className=' text-md font-semibold '>Date: <span className=' text-base text-gray-700'>{formatDate(item.createdAt)}</span></p>
                                <p className=' text-md font-semibold '>Time: <span className=' text-base text-gray-700'>{formatTime(item.createdAt)}</span></p>
                            </div>
                            <div className=' flex items-center  gap-5'>
                                <div className=' text-md font-semibold '>Order Status: {item.orderStatus === 'Order Placed' ? <span className='text-base text-blue-600'>{item.orderStatus}</span> : item.orderStatus === 'Out of delivery' ? <span className='text-base text-yellow-600'>{item.orderStatus}</span> : item.orderStatus === 'Delivered' ? <span className='text-base text-green-600'>{item.orderStatus}</span> : <span className='text-base text-red-600'>{item.orderStatus}</span>}
                                </div>
                                <p className={` text-blue-600 text-lg cursor-pointer ${options === i && term == 1 ? 'hidden' : "block"}`} onClick={() => { setoptions(i); setterm(1) }} ><FaEdit /></p>
                                <p className={` text-green-600 text-lg cursor-pointer ${options === i && term == 1 ? 'block' : "hidden"}`} onClick={() => updateOrderStatus(item._id)} ><FaCheck /></p>
                            </div>
                            <div className={`${options === i && term === 1 ? 'flex' : 'hidden'}`}>
                                <select name="status" id="" defaultValue={item.orderStatus} onChange={(e) => setstatus(e.target.value)} className=" outline-none bg-gray-100 border-[2px] border-gray-400 rounded-md cursor-pointer">
                                    {[
                                        "Order Placed",
                                        "Out of delivery",
                                        "Delivered",
                                        "Cancelled"
                                    ].map((orderStatus, j) => (
                                        <option value={orderStatus} key={j}>{orderStatus}</option>
                                    ))}
                                </select>
                            </div>



                            <p className=' text-md font-semibold '>Bill: <span className=' text-base text-gray-700'>&#8377;  {item.other[0].bill}</span></p>
                            <p className=' text-md font-semibold '>Payment Mode: <span className=' text-base text-gray-700'>{item.paymentMode}</span></p>
                            <div className=' flex items-center gap-5'>
                                <p className=' text-md font-semibold '>Payment Status: {item.paymentStatus === 'Paid' ? <span className=' text-base text-green-700'>{item.paymentStatus}</span> : item.paymentStatus === 'Unpaid' ? <span className=' text-base text-blue-700'>{item.paymentStatus}</span> : <span className=' text-base text-red-700'>{item.paymentStatus}</span>}</p>
                                <p className={` text-blue-600 text-lg cursor-pointer ${options === i && term == 2 ? 'hidden' : "block"}`} onClick={() => { setoptions(i); setterm(2) }} ><FaEdit /></p>
                                <p className={` text-green-600 text-lg cursor-pointer ${options === i && term == 2 ? 'block' : "hidden"}`} onClick={() => updatePaymentStatus(item._id)} ><FaCheck /></p>
                            </div>
                            <div className={`${options === i && term === 2 ? 'flex' : 'hidden'}`}>
                                <select name="paymentStatus" defaultValue={item.paymentStatus} onChange={(e) => setpaymentStatus(e.target.value)} className=' outline-none bg-gray-100 border-[2px] font-semibold border-gray-400 rounded-md cursor-pointer'>
                                    {[
                                        "Unpaid",
                                        "Paid",
                                        "Failed"
                                    ].map((paymentStatus, k) => (
                                        <option value={paymentStatus} key={k}>{paymentStatus}</option>
                                    ))}
                                </select>
                            </div>

                            <Link to={`/order-details/${item._id}`}>
                                <div className=' w-full p-1 font-semibold bg-blue-500 mt-2 rounded-md text-center'>Order Details</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    )
}

export default AllOrders
