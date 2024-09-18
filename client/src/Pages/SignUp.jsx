import React, { useState } from 'react';
import loginImg from '../assets/login.png';
import Footer from '../Components/Footer';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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
        try {
            e.preventDefault();
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/register`, values);
            toast.success(res.data.message);
            navigate("/login");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const handleValue = (e) => {
        const { name, value } = e.target;
        setvalues(preValue => ({ ...preValue, [name]: value }));
    }

    return (
        <div>
            <div className=' grid lg:grid-cols-2'>
                <div className=' h-screen lg:flex items-center hidden'>
                    <img src={loginImg} alt="" className=' h-96 2xl:h-[60%]' />
                </div>
                <div className=' h-screen flex justify-center items-center sm:p-4'>
                    <div className=' border- border-gray-500 shadow-md shadow-gray-400 p-5 rounded-md '>
                        <h1 className=' text-2xl py-2 font-semibold text-gray-800 text-center 2xl:text-4xl'>SignUp Page</h1>
                        <form action="" onSubmit={handleSubmit} className='space-y-5 2xl:space-y-7'>
                            <div className=' flex flex-col 2xl:text-2xl 2xl:space-y-1 '>
                                <label htmlFor="" className=' text-md font-semibold'>Username</label>
                                <div className=' border-[2px] border-gray-300 py-1 px-2 rounded-md w-full md:w-96 2xl:w-[600px]'>
                                    <input type="text" name="username" placeholder='Enter Username' value={values.username} onChange={handleValue} className=' w-full outline-none' required />
                                </div>
                            </div>
                            <div className=' flex flex-col 2xl:text-2xl 2xl:space-y-1 '>
                                <label htmlFor="" className=' text-md font-semibold'>Email</label>
                                <div className=' border-[2px] border-gray-300 py-1 px-2 rounded-md w-full md:w-96 2xl:w-[600px]'>
                                    <input type="email" name="email" placeholder='Enter Email' value={values.email} onChange={handleValue} className=' w-full outline-none' required />
                                </div>
                            </div>
                            <div className=' flex flex-col 2xl:text-2xl 2xl:space-y-1 '>
                                <label htmlFor="" className=' text-md font-semibold '>Password</label>
                                <div className=' border-2 border-gray-300 py-1 px-2 rounded-md w-full md:w-96 2xl:w-[600px]'>
                                    <input type="password" name="password" placeholder='Enter Password' value={values.password} onChange={handleValue} className=' w-full outline-none' required />
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
                                <button type='submit' className=' p-1 w-full rounded-md font-semibold text-xl bg-pink-700 text-gray-200 hover:bg-pink-600
                            '>SignUp</button>
                            </div>
                        </form>
                        <div className=' flex flex-col justify-center items-center py-3'>
                            <p className=' font-semibold text-lg'>Or</p>
                            <div className=' flex gap-2 font-semibold text-gray-500'>
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
