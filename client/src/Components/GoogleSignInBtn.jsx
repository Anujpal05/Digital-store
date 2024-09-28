import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../firebase/firebaseConfig'
import { FcGoogle } from "react-icons/fc";
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';


const GoogleSignInBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (user) {
                const values = { username: user.displayName, email: user.email, password: result._tokenResponse.localId, avatar: user.photoURL }
                const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/login-with-google`, values);
                if (res.data) {
                    localStorage.setItem('userId', res.data.id);
                    localStorage.setItem('role', res.data.role);
                    localStorage.setItem('token', res.data.token);
                    dispatch(authActions.login());
                    localStorage.setItem('isLogin', true);
                    navigate("/");
                    toast.success(res.data.message);
                }
            }
        } catch (error) {
            // Handle different types of errors for better clarity
            if (error.response?.data?.message) {
                toast.error(error.response.data.message); // For backend validation errors
            } else {
                toast.error(error.message); // For Firebase errors or network issues
            }

            console.error("Error during registration:", error);
        }
    }
    return (
        <div className=' py-4'>
            <button className=' border-2 p-1 flex justify-center items-center gap-3 font-semibold w-full bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 dark:border-gray-600 outline-none ' onClick={handleGoogleSignIn}><FcGoogle className='text-3xl' />Sign In With Google</button>
        </div>
    )
}

export default GoogleSignInBtn
