import React from 'react'
import { Link } from 'react-router-dom';

const Failure = () => {


    return (
        <div className=' min-h-screen py-20 px-3 bg-red-100'>
            <div className=' flex flex-col justify-center items-center space-y-3'>
                <h1 className=' font-semibold text-2xl text-red-700'>Payment Failed!</h1>
                <p className=' font-semibold text-xl'>Unfortunately, your payment could not be processed. Please try again.</p>
                <Link to="/" className='w-fit'>
                    <div className=' w-fit p-2 font-semibold rounded-md bg-red-400'>Go Back to Home</div>
                </Link>
            </div>
        </div>
    );
}

export default Failure
