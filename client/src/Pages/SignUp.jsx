import React, { useState } from 'react';
import loginImg from '../assets/login.png';
import Footer from '../Components/Footer';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [values, setvalues] = useState({
        username: "",
        email: "",
        password: ""
    })

    //Handle Submit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("http://localhost:8080/api/v1/user/register", values);
            console.log(res.data.message);
            navigate("/login");
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const handleValue = (e) => {
        const { name, value } = e.target;
        setvalues(preValue => ({ ...preValue, [name]: value }));
    }

    return (
        <div>
            <div className=' grid grid-cols-2'>
                <div className=' h-screen flex items-center'>
                    <img src={loginImg} alt="" className=' h-96' />
                </div>
                <div className=' h-screen flex justify-center items-center'>
                    <div className=' border- border-gray-500 shadow-md shadow-gray-400 p-5 rounded-md '>
                        <h1 className=' text-2xl py-2 font-semibold text-gray-800 text-center'>SignUp Page</h1>
                        <form action="" onSubmit={handleSubmit} className='space-y-5'>
                            <div className=' flex flex-col '>
                                <label htmlFor="" className=' text-md font-semibold'>Username</label>
                                <div className=' border-[2px] border-gray-300 py-1 px-2 rounded-md w-96'>
                                    <input type="text" name="username" placeholder='Enter Username' value={values.username} onChange={handleValue} className=' w-full outline-none' required />
                                </div>
                            </div>
                            <div className=' flex flex-col '>
                                <label htmlFor="" className=' text-md font-semibold'>Email</label>
                                <div className=' border-[2px] border-gray-300 py-1 px-2 rounded-md w-96'>
                                    <input type="email" name="email" placeholder='Enter Email' value={values.email} onChange={handleValue} className=' w-full outline-none' required />
                                </div>
                            </div>
                            <div className=' flex flex-col '>
                                <label htmlFor="" className=' text-md font-semibold '>Password</label>
                                <div className=' border-2 border-gray-300 py-1 px-2 rounded-md w-96'>
                                    <input type="password" name="password" placeholder='Enter Password' value={values.password} onChange={handleValue} className=' w-full outline-none' required />
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
            <Footer />
        </div>
    )
}

export default SignUp
