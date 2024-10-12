import axios from 'axios';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const SuccessPage = () => {

    useEffect(() => {
        const sessionId = localStorage.getItem("stripeSessionId");

        const fetchPaymentStatus = async (sessionId) => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/payment/session/${sessionId}`, { sessionId: sessionId }, { headers: { 'Content-Type': 'application/json' } });
                console.log(response)
            } catch (error) {
                console.error('Error fetching payment status:', error);
            }
        };

        if (sessionId) {
            fetchPaymentStatus(sessionId);
        }

    }, [])


    return (
        <div className=' py-20 px-3 bg-blue-300  min-h-screen'>
            <div className=' bg--100 p-3 rounded-md space-y-3 flex flex-col justify-center items-center'>
                <h1 className=' text-2xl font-semibold'>Payment Successful!</h1>
                <p className=' text-xl font-semibold'>Thank you for your purchase. Your payment has been processed successfully.</p>
                <Link to="/" className="">
                    <div className=' w-fit p-2 bg-green-500 rounded-md font-semibold outline-none hover:bg-green-600 '>Go to Home</div>
                </Link>
            </div>
        </div>
    );
}

export default SuccessPage