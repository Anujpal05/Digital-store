import axios from 'axios';
import React, { useEffect, useId, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import { Hourglass } from 'react-loader-spinner';
import paymentCard from '../Components/paymentCard';
import { loadStripe } from '@stripe/stripe-js';



const PlaceOrder = () => {
    const { id } = useParams();
    const [product, setproduct] = useState();
    const [error, setError] = useState(false);
    const [visible, setvisible] = useState('flex');
    const [productDetails, setproductDetails] = useState();
    const [loader, setloader] = useState(true);
    const [values, setValues] = useState({
        username: "",
        address: "",
        phone: "",
        quantity: 1,
        mode: "Online"
    });
    const [processing, setprocessing] = useState(false);
    const [total, settotal] = useState(0);
    const navigate = useNavigate();
    let userid, products;

    userid = localStorage.getItem("userId");
    products = JSON.parse(localStorage.getItem('products'));

    useEffect(() => {
        const fetch = async () => {
            try {
                if (id) {
                    const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/getproduct`, { headers: { id } });
                    if (data) {
                        setproduct(data?.data?.product)
                    }
                }


                if (!id) {
                    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/getallproduct`);
                    setproductDetails(res.data.products.filter((item) => products.some((product => product.product === item._id))))
                }

                const user = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/get-user`, { headers: { userid: userid, Authorization: `Bearer ${localStorage.getItem('token')}` } });
                if (user && user.data) {
                    setValues({
                        username: user?.data?.user?.username,
                        address: user?.data?.user?.address,
                        phone: user?.data?.user?.phone,
                        quantity: 1,
                        mode: 'Online'
                    })
                }

                setloader(false);
            } catch (error) {
                toast.error(error?.response?.data?.message || "Something wrong!");
            }
        }
        fetch();

    }, [])

    useEffect(() => {
        try {
            {
                if (productDetails) {
                    const totalAmount = productDetails.reduce((acc, item) => acc + item.price, 0);
                    settotal(totalAmount)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, [productDetails])



    const updateUser = async (e) => {
        e.preventDefault();
        if (processing) {
            return;
        }

        setprocessing(true);
        try {
            const data = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/update-user`, values, { headers: { id: userid, Authorization: `Bearer ${localStorage.getItem('token')}` } });
            toast.success(data.data.message);
            setvisible('hidden');
            setprocessing(false)

        } catch (error) {
            toast.error(error.response.data.message || "Something wrong!");
        }
    }

    const noOfProduct = (e) => {
        let { name, value } = e.target;
        if (value > 20) {
            value = 20;
        }
        if (value < 0) {
            value = 1;
        }
        setValues({ ...values, [name]: value });
    }

    const handleChange = (e) => {
        setError(false)
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        if (name === 'phone' && value.length > 10) {
            setError(true);
        }
    }

    const placeOrder = async (e) => {
        try {
            e.preventDefault();
            if (processing) {
                return;
            }
            setprocessing(true);
            if (values.mode === 'COD') {
                if (values.quantity === 0) {
                    setValues({ ...values, quantity: 1 });
                }
                const data = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/order/placed-order`, { paymentMode: values.mode, quantity: values.quantity, bill: product.price * values.quantity }, { headers: { userid: userid, productid: id, Authorization: `Bearer ${localStorage.getItem('token')}` } });
                toast.success(data?.data?.message);
            }
            if (values.mode === 'Online') {
                try {
                    const stripePromise = loadStripe(import.meta.env.VITE_PUBLISABLEKEY);
                    const stripe = await stripePromise;

                    //Order placed
                    const data = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/order/placed-order`, { paymentMode: values.mode, quantity: values.quantity, bill: product.price * values.quantity }, { headers: { userid: userid, productid: id, Authorization: `Bearer ${localStorage.getItem('token')}` } });
                    toast.success(data?.data?.message);

                    const body = {
                        product: {
                            price: product.price,
                            image: product.image,
                            name: product.title,
                            quantity: 1
                        },
                        orderId: data?.data?.orderId
                    }

                    //Call checkout api
                    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/payment/checkout`, body, { headers: { 'Content-Type': 'application/json' } })

                    const session = await response.data;

                    if (session) {
                        const result = await stripe.redirectToCheckout({
                            sessionId: session.sessionId
                        });
                        if (result.error) {
                            console.log(result.error);
                        }
                    }

                } catch (error) {
                    toast.error(error.response.data.message || "Something wrong!")
                }
            }

            setprocessing(false)
        } catch (error) {
            toast.error(error.response.data.message || "Something wrong!");
        }
    }

    const placeOrders = async (e) => {
        try {
            e.preventDefault();
            if (values.mode === 'COD') {
                const data = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/order/placed-orders`, { paymentMode: values.mode, bill: total, products }, { headers: { userid: userid, Authorization: `Bearer ${localStorage.getItem('token')}` } });
                navigate('/myorder')
                toast.success(data?.data?.message);
            }
        } catch (error) {
            toast.error(error.response.data.message || "Something wrong!");
        }
    }

    const handleSubmit = (e) => {
        localStorage.removeItem('products')
        if (products) {
            placeOrders(e);
        } else {
            placeOrder(e);
        }
    }


    return (
        <div className=' flex justify-center items-center p-10 py-24  overflow-x-hidden'>
            {loader && <div className=' h-[90vh] flex justify-center items-center'>
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
            {values && !loader && <div className=' border-2 w-96  min-h-[70vh] flex flex-col justify-evenly items-center dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 rounded-md'>
                <div className=' p-3 pb-5 '>
                    {product && <div >
                        <p className='  text-gray-500 dark:text-gray-400 font-semibold'><span className=' text-gray-700 dark:text-gray-200'>Product Name:</span> {product.title} </p>
                        <p className=' text-gray-500 dark:text-gray-400 font-semibold'><span className=' text-gray-700 dark:text-gray-200'>Price:</span> &#8377;  {product.price * values.quantity}</p>
                    </div>}
                    <div className=' max-h-52 overflow-auto dark:scrollbar dark:scrollbar-thumb-gray-700'>
                        {productDetails && products && productDetails.map((item, i) => (
                            <div key={i}>
                                <p className='  text-gray-500 dark:text-gray-300 font-semibold'><span className=' text-gray-700 dark:text-gray-200'>Product Name:</span> {item.title} </p>
                                <p className=' text-gray-500 dark:text-gray-300 font-semibold'><span className=' text-gray-700 dark:text-gray-200'>Price:</span> &#8377;  {item.price}</p>
                                <hr className=' border-1 my-1' />
                            </div>
                        ))}
                    </div>
                    {productDetails && products &&
                        <div className=' flex gap-2 pt-2'>
                            <p className=' font-semibold dark:text-gray-200 '>Total bill : </p>
                            <div className=' text-gray-500 font-semibold dark:text-gray-400'>&#8377; {total}</div>
                        </div>
                    }

                </div>
                <div className=' w-full'>
                    <form action="" className={`  flex-col justify-center px-10 p-4 gap-3 w-full ${visible == 'hidden' ? 'hidden' : 'flex'}`} onSubmit={updateUser}>
                        <div className=' text-xl font-semibold text-center'>User Details</div>
                        <input type="text" name="username" id="" className=' bg-gray-100 dark:bg-gray-700 dark:border-gray-600  rounded-md border-2 outline-none px-2 p-1' placeholder='Enter your username' value={values.username} onChange={handleChange} required />
                        <textarea type="text" name='address' className=' bg-gray-100 dark:bg-gray-700 dark:border-gray-600 rounded-md border-2 outline-none px-2 p-1' placeholder='Enter your address' value={values.address} onChange={handleChange} required rows={3} />
                        <div className=' flex flex-col'>
                            {error && <span className=" text-red-600 text-sm font-semibold">Please enter exactly 10 digits.</span>}
                            <input type="number" name="phone" id="" className=' bg-gray-100 dark:bg-gray-700 dark:border-gray-600 rounded-md border-2 outline-none px-2 p-1' placeholder='Enter your phone no.' onChange={handleChange} value={values.phone} required />
                        </div>
                        {!processing && <button type='submit' className=' p-2 bg-green-500 rounded-md font-semibold w-full dark:text-gray-950' >Next</button>}
                        {processing && <button className=' p-2 bg-green-500 rounded-md font-semibold w-full dark:text-gray-950' >Processing...</button>}
                    </form>
                </div>
                <div className=' '>
                    <form action="" className={`flex flex-col gap-20 ${visible == 'hidden' ? 'flex' : 'hidden'} `} onSubmit={handleSubmit}>
                        <div className=' flex flex-col gap-4  '>
                            <div className=' flex gap-5'>
                                <p className=' text-md font-semibold '>Payment Mode :</p>
                                <select name="mode" value={values.mode} onChange={handleChange} id="" className=' border-2 border-gray-400 outline-none rounded-sm dark:bg-gray-700 dark:border-gray-600'>
                                    <option value="Online">Online</option>
                                    <option value="COD">cash on delivery</option>
                                </select>
                            </div>
                            {!products && <div className=' flex gap-5'>
                                <p className=' text-md font-semibold'>Quantity :</p>
                                <input type="number" name="quantity" value={values.quantity} onChange={noOfProduct} className=' dark:bg-gray-800 bg-gray-100 border-2 dark:border-gray-600 rounded-md outline-none px-2  w-14' />
                            </div>}
                        </div>
                        <div className=''>
                            {!processing && <button type='submit' className=' p-2 bg-green-500 rounded-md font-semibold w-full dark:text-gray-950 '  >Next</button>}
                            {processing && <button className=' p-2 bg-green-500 rounded-md font-semibold w-full dark:text-gray-950 '  >Processing...</button>}
                        </div>
                    </form>
                </div>
            </div>}
            <div>

            </div>
        </div>
    )
}

export default PlaceOrder
