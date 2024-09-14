import axios from 'axios';
import React, { useEffect, useId, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'


const PlaceOrder = () => {
    const { id } = useParams();
    const [product, setproduct] = useState();
    const [error, setError] = useState(false);
    const [visible, setvisible] = useState('flex');
    const [productDetails, setproductDetails] = useState();
    const [values, setValues] = useState({
        username: "",
        address: "",
        phone: "",
        quantity: 1,
        mode: "Online"
    });
    const [total, settotal] = useState(0);
    const navigate = useNavigate();

    const userid = localStorage.getItem("userId");
    const products = JSON.parse(localStorage.getItem('products'));


    useEffect(() => {
        const fetch = async () => {
            try {
                if (id) {
                    const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/getproduct`, { headers: { id } });
                    if (data) {
                        await setproduct(data?.data?.product)
                    }
                    localStorage.removeItem('products')
                }

                if (!products) {
                    navigate('/cart');
                }

                if (!id) {
                    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/product/getallproduct`);
                    await setproductDetails(res.data.products.filter((item) => products.some((product => product.product === item._id))))
                }

                const user = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/get-user`, { headers: { userid } });
                if (user) {
                    setValues({
                        username: user.data.user.username,
                        address: user.data.user.address,
                        phone: user.data.user.phone,
                        quantity: 1,
                        mode: 'Online'
                    })
                }

            } catch (error) {
                toast.error(error.response.data?.message);
            }
        }
        fetch();

    }, [])

    useEffect(() => {
        try {
            {
                const totalAmount = productDetails.reduce((acc, item) => acc + item.price, 0);
                settotal(totalAmount)
            }
        } catch (error) {

        }
    }, [productDetails])



    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/update-user`, values, { headers: { id: userid } });
            toast.success(data.data.message);
            setvisible('hidden');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    // const validateLength = (e) => {
    //     if (e.target.value > 10) {
    //         e.target.value = e.target.value.slice(0, 10);
    //     }
    // }

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
            if (values.mode === 'COD') {
                if (values.quantity === 0) {
                    setValues({ ...values, quantity: 1 });
                }
                const data = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/order/placed-order`, { paymentMode: values.mode, quantity: values.quantity, bill: product.price * values.quantity }, { headers: { userid: userid, productid: id } });
                toast.success(data?.data?.message);

            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const placeOrders = async (e) => {
        try {
            e.preventDefault();
            if (values.mode === 'COD') {
                console.log(products)
                const data = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/order/placed-orders`, { paymentMode: values.mode, bill: total, products }, { headers: { userid } });
                navigate('/myorder')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        if (products) {
            placeOrders(e);
        } else {
            placeOrder(e);
        }
    }


    return (
        <div className=' flex justify-center items-center p-10'>
            {values && <div className=' border-2 w-96  min-h-[70vh] flex flex-col justify-evenly items-center'>
                <div className=' p-3 pb-5'>
                    {product && <div >
                        <p className='  text-gray-500 font-semibold'><span className=' text-gray-700'>Product Name:</span> {product.title} </p>
                        <p className=' text-gray-500 font-semibold'><span className=' text-gray-700'>Price:</span> &#8377;  {product.price * values.quantity}</p>
                    </div>}
                    {productDetails && products && products.map((item, i) => (
                        <div key={i}>
                            <p className='  text-gray-500 font-semibold'><span className=' text-gray-700'>Product Name:</span> {productDetails[i].title} </p>
                            <p className=' text-gray-500 font-semibold'><span className=' text-gray-700'>Price:</span> &#8377;  {productDetails[i].price * item.quantity}</p>
                            <hr className=' border-1 my-1' />
                        </div>
                    ))}
                    {productDetails && products &&
                        <div className=' flex gap-2'>
                            <p className=' font-semibold '>Total bill : </p>
                            <div className=' text-gray-500 font-semibold'>&#8377; {total}</div>
                        </div>
                    }

                </div>
                <div className=' w-full'>
                    <form action="" className={`  flex-col justify-center px-10 p-4 gap-3 w-full ${visible == 'hidden' ? 'hidden' : 'flex'}`} onSubmit={updateUser}>
                        <div className=' text-xl font-semibold text-center'>User Details</div>
                        <input type="text" name="username" id="" className=' bg-gray-100  rounded-md border-2 outline-none px-2 p-1' placeholder='Enter your username' value={values.username} onChange={handleChange} required />
                        <textarea type="text" name='address' className=' bg-gray-100 rounded-md border-2 outline-none px-2 p-1' placeholder='Enter your address' value={values.address} onChange={handleChange} required rows={3} />
                        <div className=' flex flex-col'>
                            {error && <span className=" text-red-600 text-sm font-semibold">Please enter exactly 10 digits.</span>}
                            <input type="number" name="phone" id="" className=' bg-gray-100 rounded-md border-2 outline-none px-2 p-1' placeholder='Enter your phone no.' onChange={handleChange} value={values.phone} required />
                        </div>
                        <button type='submit' className=' p-2 bg-green-500 rounded-md font-semibold w-full' >Next</button>
                    </form>
                </div>
                <div className=' '>
                    <form action="" className={`flex flex-col gap-20 ${visible == 'hidden' ? 'flex' : 'hidden'} `} onSubmit={handleSubmit}>
                        <div className=' flex flex-col gap-4  '>
                            <div className=' flex gap-5'>
                                <p className=' text-md font-semibold'>Payment Mode :</p>
                                <select name="mode" value={values.mode} onChange={handleChange} id="" className=' border-2 border-gray-400 outline-none rounded-sm'>
                                    <option value="Online">Online</option>
                                    <option value="COD">cash on delivery</option>
                                </select>
                            </div>
                            {!products && <div className=' flex gap-5'>
                                <p className=' text-md font-semibold'>Quantity :</p>
                                <input type="number" name="quantity" value={values.quantity} onChange={noOfProduct} className=' bg-gray-100 border-2 rounded-md outline-none px-2  w-14' />
                            </div>}
                        </div>
                        <div className=''><button type='submit' className=' p-2 bg-green-500 rounded-md font-semibold w-full '  >Next</button> </div>
                    </form>
                </div>
            </div>}
            <div>

            </div>
        </div>
    )
}

export default PlaceOrder
