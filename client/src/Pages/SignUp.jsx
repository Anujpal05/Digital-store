import React, { useState } from 'react';
import loginImg from '../assets/login.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import GoogleSignInBtn from '../Components/GoogleSignInBtn';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const SignUp = () => {
    const navigate = useNavigate();
    const [values, setvalues] = useState({
        username: "",
        email: "",
        password: "",
        role: "customer"
    })

    //Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/register`, values);

            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);

            // Create a new user with Firebase Authentication
            const user = userCredential.user;

            await sendEmailVerification(user);
            toast.success("Verification email sent!");

            toast.success(res.data.message);

            navigate("/login");

        } catch (error) {
            // Handle different types of errors for better clarity
            if (error.response?.data?.message) {
                toast.error(error.response.data.message); // For backend validation errors
            } else {
                toast.error(error.message);
            }
            console.error("Error during registration:", error);
        }
    };


    const handleValue = (e) => {
        const { name, value } = e.target;
        setvalues(preValue => ({ ...preValue, [name]: value }));
    }

    return (
        <div>
            <div className=' grid lg:grid-cols-2 py-7'>
                <div className=' h-screen lg:flex items-center hidden'>
                    <img src={loginImg} alt="" className=' h-96 2xl:h-[60%]' />
                </div>
                <div className=' min-h-screen flex justify-center items-center sm:p-4 px-3 mt-5'>
                    <div className=' bg-gray-50 border-gray-500 shadow-md shadow-gray-400 dark:shadow-gray-600 p-5 rounded-md dark:bg-gray-800 dark:text-gray-200 w-[90vw] md:w-auto  '>
                        <h1 className=' text-2xl py-2 font-semibold text-gray-800 text-center 2xl:text-4xl dark:text-gray-200'>SignUp Page</h1>
                        <form action="" onSubmit={handleSubmit} className='space-y-5 2xl:space-y-5'>
                            <div className=' flex flex-col 2xl:text-2xl 2xl:space-y-1 '>
                                <label htmlFor="" className=' text-md font-semibold'>Username</label>
                                <div className=' border-[2px] border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 py-1 px-2 rounded-md w-full md:w-96 2xl:w-[600px]'>
                                    <input type="text" name="username" placeholder='Enter Username' value={values.username} onChange={handleValue} className=' w-full outline-none dark:bg-gray-700' required />
                                </div>
                            </div>
                            <div className=' flex flex-col 2xl:text-2xl 2xl:space-y-1 '>
                                <label htmlFor="" className=' text-md font-semibold'>Email</label>
                                <div className=' border-[2px] border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 py-1 px-2 rounded-md w-full md:w-96 2xl:w-[600px]'>
                                    <input type="email" name="email" placeholder='Enter Email' value={values.email} onChange={handleValue} className=' w-full outline-none dark:bg-gray-700' required />
                                </div>
                            </div>
                            <div className=' flex flex-col 2xl:text-2xl 2xl:space-y-1 '>
                                <label htmlFor="" className=' text-md font-semibold '>Password</label>
                                <div className=' border-2 border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 py-1 px-2 rounded-md w-full md:w-96 2xl:w-[600px]'>
                                    <input type="password" name="password" placeholder='Enter Password' value={values.password} onChange={handleValue} className=' w-full outline-none dark:bg-gray-700' required />
                                </div>
                            </div>
                            <div>
                                <div action="" className=' flex justify-center items-center gap-5 '>
                                    <div>
                                        <input type="radio" name="role" className=' cursor-pointer' onChange={handleValue} id="customer" value="customer" defaultChecked />
                                        <label className=' text-md font-semibold cursor-pointer px-1' htmlFor="customer">Customer</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="role" className=' cursor-pointer' onChange={handleValue} id="salesman" value="salesman" />
                                        <label className=' text-md font-semibold cursor-pointer px-1' htmlFor="salesman">Salesman</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button type='submit' className=' p-1 w-full rounded-md font-semibold text-xl bg-pink-700 dark:text-gray-950 text-gray-200 hover:bg-pink-600 outline-none py-2
                            '>SignUp</button>
                            </div>
                        </form>
                        <GoogleSignInBtn />
                        <div className=' flex flex-col justify-center items-center py-3'>
                            <p className=' font-semibold text-lg'>Or</p>
                            <div className=' flex gap-2 font-semibold text-gray-500 dark:text-gray-400'>
                                <p>Already have an account? </p>
                                <Link to={"/login"} className=' underline hover:text-blue-600 hover:scale-105 transition-all duration-300'>LogIn</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
