import React, { useState } from 'react';
import loginImg from '../assets/login.png';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import GoogleSignInBtn from '../Components/GoogleSignInBtn';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
const ResetPassword = () => {
    const [email, setemail] = useState("");
    const navigate = useNavigate();

    const handleValue = (e) => {
        const { value } = e.target;
        setemail(value)
    }

    //Reset Password
    const resetPassword = async (e) => {
        try {
            e.preventDefault();
            await sendPasswordResetEmail(auth, email);
            toast.success("A password reset link has been successfully sent to your email!");
            navigate("/login")
        } catch (error) {
            toast.error("Failed to send password reset link. Please try again.");
        }
    }


    return (
        <div>
            <div className=' grid lg:grid-cols-2 overflow-x-hidden pt-5'>
                <div className=' hidden h-screen lg:flex items-center '>
                    <img src={loginImg} alt="Login Image" className=' h-96 2xl:h-[60%]' />
                </div>
                <div className=' h-screen  flex justify-center items-center px-3 '>
                    <div className=' shadow-md shadow-gray-400 dark:shadow-gray-600 p-5 rounded-md dark:bg-gray-800 dark:text-gray-200 w-[90vw] md:w-auto'>
                        <h1 className=' text-2xl py-2 font-semibold text-gray-800 text-center 2xl:text-4xl dark:text-gray-200'>Reset Password</h1>
                        <form action="" onSubmit={resetPassword} className='space-y-5 2xl:space-y-7'>
                            <div className=' flex flex-col 2xl:text-2xl'>
                                <label htmlFor="" className=' text-md font-semibold '>Email</label>
                                <div className=' border-[2px] border-gray-300 dark:bg-gray-700 dark:border-gray-500 py-1 px-2 rounded-md w-full md:w-96 2xl:w-[600px]'>
                                    <input type="email" name="email" placeholder='Enter Email' value={email} onChange={handleValue} className=' w-full outline-none dark:bg-gray-700' required />
                                </div>
                            </div>
                            <div>
                                <button type='submit' className=' outline-none p-1 w-full rounded-md font-semibold text-xl bg-pink-700 text-gray-200 hover:bg-pink-600 dark:text-gray-950 py-2
                            '>Reset Password</button>
                            </div>
                        </form>
                        <GoogleSignInBtn />
                        <div className=' flex flex-col justify-center items-center py-3 '>
                            <p className=' font-semibold text-lg'>Or</p>
                            <div className=' flex gap-2 font-semibold text-gray-500 dark:text-gray-400'>
                                <p>Don't have an account?</p>
                                <Link to={"/signup"} className=' underline hover:text-blue-600 hover:scale-105 transition-all duration-300'>SignUp</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ResetPassword
