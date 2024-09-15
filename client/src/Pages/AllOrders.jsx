import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Hourglass } from 'react-loader-spinner';

const AllOrders = () => {
    const [orders, setorders] = useState();
    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await axios.get("http://localhost:8080/api/v1/order/get-all-orders", { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
                setorders(data?.data?.orders);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetch();
    }, [])

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
            {orders && <div className=' p-4'>
                <h1 className=' text-3xl font-semibold'>All Orders</h1>
                <div>
                    {orders.map((item, i) => (
                        <div key={i}>

                        </div>
                    ))}
                </div>
            </div>}
        </div>
    )
}

export default AllOrders
