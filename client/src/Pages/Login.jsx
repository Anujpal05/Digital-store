import React, { useState } from 'react';
import loginImg from '../assets/login.png';
import Footer from '../Components/Footer';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setvalues] = useState({
        email: "",
        password: ""
    })

    const isLogin = useSelector(state => state.auth.isLogin);

    //Handle Submit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/login`, values);

            if (res.data) {
                localStorage.setItem('userId', res.data.id);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('token', res.data.token);
                setvalues({
                    email: "",
                    password: ""
                });
                dispatch(authActions.login());
                localStorage.setItem('isLogin', true);
                toast.success(res.data.message);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    //Handle Input value
    const handleValue = (e) => {
        const { name, value } = e.target;
        setvalues(preValue => ({ ...preValue, [name]: value }));
    }

    return (
        <div>
            <div className=' grid lg:grid-cols-2'>
                <div className=' hidden h-screen lg:flex items-center '>
                    <img src={loginImg} alt="Login Image" className=' h-96 2xl:h-[60%]' />
                </div>
                <div className=' h-screen  flex justify-center items-center'>
                    <div className=' shadow-md shadow-gray-400 p-5 rounded-md '>
                        <h1 className=' text-2xl py-2 font-semibold text-gray-800 text-center 2xl:text-4xl'>Login Page</h1>
                        <form action="" onSubmit={handleSubmit} className='space-y-5 2xl:space-y-7'>
                            <div className=' flex flex-col 2xl:text-2xl'>
                                <label htmlFor="" className=' text-md font-semibold '>Email</label>
                                <div className=' border-[2px] border-gray-300 py-1 px-2 rounded-md w-full md:w-96 2xl:w-[600px]'>
                                    <input type="email" name="email" placeholder='Enter Email' value={values.email} onChange={handleValue} className=' w-full outline-none' required />
                                </div>
                            </div>
                            <div className=' flex flex-col 2xl:text-2xl'>
                                <label htmlFor="" className=' text-md font-semibold '>Password</label>
                                <div className=' border-2 border-gray-300 py-1 px-2 rounded-md w-full md:w-96 2xl:w-[600px]'>
                                    <input type="password" name="password" placeholder='Enter Password' value={values.password} onChange={handleValue} className=' w-full outline-none' required />
                                </div>
                            </div>
                            <div>
                                <button type='submit' className=' p-1 w-full rounded-md font-semibold text-xl bg-pink-700 text-gray-200 hover:bg-pink-600
                            '>Login</button>
                            </div>
                        </form>
                        <div className=' flex flex-col justify-center items-center py-3'>
                            <p className=' font-semibold text-lg'>Or</p>
                            <div className=' flex gap-2 font-semibold text-gray-500'>
                                <p>Don't have an account?</p>
                                <Link to={"/signup"} className=' underline hover:text-blue-600 hover:scale-105 transition-all duration-300'>SignUp</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login
