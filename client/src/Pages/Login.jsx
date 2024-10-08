import React, { useState } from 'react';
import loginImg from '../assets/login.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import toast from 'react-hot-toast';
import GoogleSignInBtn from '../Components/GoogleSignInBtn';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setvalues] = useState({
        email: "",
        password: ""
    })
    const [visible, setvisible] = useState(false);

    //Handle Submit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/login`, values);
            const result = await signInWithEmailAndPassword(auth, values.email, values.password);
            console.log(result)
            const user = result.user;
            if (user.emailVerified) {
                if (res.data) {
                    localStorage.setItem('userId', res.data.id);
                    localStorage.setItem('role', res.data.role);
                    localStorage.setItem('token', res.data.token);
                    dispatch(authActions.login());
                    localStorage.setItem('isLogin', true);
                    dispatch(authActions.changeRole(localStorage.getItem('role') ? localStorage.getItem("role") : "customer"));
                    toast.success(res.data.message);
                    navigate("/");
                }
            } else {
                toast.error("Email not verified!");
                signOut(auth)
            }
        } catch (error) {
            //show forgot password option if error occurs
            setvisible(true);
            // Handle different types of errors for better clarity
            if (error.response?.data?.message) {
                toast.error(error.response.data.message); // For backend validation errors
            } else {
                toast.error(error.message === "Firebase: Error (auth/invalid-credential)." ? "Invalid Credential!" : error.message);
            }
            console.error("Error during registration:", error);
        }
    }


    //Handle Input value
    const handleValue = (e) => {
        const { name, value } = e.target;
        setvalues(preValue => ({ ...preValue, [name]: value }));
    }

    return (
        <div>
            <div className=' grid lg:grid-cols-2 overflow-x-hidden pt-5'>
                <div className=' hidden h-screen lg:flex items-center '>
                    <img src={loginImg} alt="Login Image" className=' h-96 2xl:h-[60%]' />
                </div>
                <div className=' h-screen  flex justify-center items-center px-3 '>
                    <div className=' shadow-md shadow-gray-400 dark:shadow-gray-600 p-5 rounded-md dark:bg-gray-800 dark:text-gray-200 w-[90vw] md:w-auto'>
                        <h1 className=' text-2xl py-2 font-semibold text-gray-800 text-center 2xl:text-4xl dark:text-gray-200'>Login Page</h1>
                        <form action="" onSubmit={handleSubmit} className='space-y-5 2xl:space-y-7'>
                            <div className=' flex flex-col 2xl:text-2xl'>
                                <label htmlFor="" className=' text-md font-semibold '>Email</label>
                                <div className=' border-[2px] border-gray-300 dark:bg-gray-700 dark:border-gray-500 py-1 px-2 rounded-md w-full md:w-96 2xl:w-[600px]'>
                                    <input type="email" name="email" placeholder='Enter Email' value={values.email} onChange={handleValue} className=' w-full outline-none dark:bg-gray-700' required />
                                </div>
                            </div>
                            <div className=' flex flex-col 2xl:text-2xl'>
                                <label htmlFor="" className=' text-md font-semibold '>Password</label>
                                <div className=' border-2 border-gray-300 dark:bg-gray-700 dark:border-gray-500 py-1 px-2 rounded-md w-full md:w-96 2xl:w-[600px]'>
                                    <input type="password" name="password" placeholder='Enter Password' value={values.password} onChange={handleValue} className=' w-full outline-none dark:bg-gray-700' required />
                                </div>
                                {visible && <Link to={"/reset-password"} className=' font-bold text-blue-500 hover:text-blue-600 text-base pt-1 cursor-pointer'>Forgot Password ?</Link>}
                            </div>
                            <div>
                                <button type='submit' className=' outline-none p-1 w-full rounded-md font-semibold text-xl bg-pink-700 text-gray-200 hover:bg-pink-600 dark:text-gray-950 py-2
                            '>Login</button>
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

export default Login
