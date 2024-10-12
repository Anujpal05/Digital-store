import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


export const paymentCard = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    return (
        <div className=' min-h-screen flex justify-center items-center'>
            <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '20px auto' }}>
                <CardElement className=' h-96 w-96'
                    options={{
                        style: {
                            base: {
                                fontSize: '18px', // Adjust font size
                                height: '40px',   // Adjust height if necessary
                                padding: '10px',
                                color: '#424770',
                                backgroundColor: 'white',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || processing} className=' px-2 py-2 bg-blue-600 text-white outline-none ' style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}>
                    {processing ? 'Processing...' : 'Pay'}
                </button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
        </div>
    );
}

export default paymentCard
