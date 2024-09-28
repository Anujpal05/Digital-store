import React, { useEffect, useState } from 'react';
import logo from "../assets/PixelMart.png";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineLightMode } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';
import toast from 'react-hot-toast';
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaUser } from 'react-icons/fa';
import ProfileSidebar from './ProfileSidebar';
import axios from 'axios';
import { useUser } from '../store/context.jsx';
import { IoMoonOutline } from "react-icons/io5";
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';


function Navbar({ toggleMode }) {

    const [isOpen, setisOpen] = useState(false);
    const isLogin = useSelector(state => state.auth.isLogin);
    const userRole = useSelector(state => state.auth.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setuser] = useState();
    const [isVisible, setisVisible] = useState(false);
    const { profilePhoto } = useUser();

    //Logout
    const handleLogOut = () => {
        dispatch(authActions.logout());
        localStorage.clear();
        toast.success("LogOut Successfully!");
        if (auth.currentUser) {
            signOut(auth)
        }
        navigate("/");
    }

    const handleData = () => {
        toast.success('Coming soon...')
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/get-user`, { headers: { userid: localStorage.getItem('userId'), Authorization: `Bearer ${localStorage.getItem('token')}` } });
                if (res) {
                    setuser(res.data.user);
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        if (isLogin === true) {
            fetch();
        }
    }, [isLogin])



    //Handle visibility of navbar for small device
    const isToggle = () => {
        setisOpen(!isOpen);
    }

    return (
        <div className=' relative overflow-x-hidden w-screen'>
            <div className=' fixed z-30 w-screen'>
                <div className=' flex justify-between  items-center p-2 lg:px-10 bg-zinc-800  py-2  text-white font-semibold ' >
                    <Link to={"/"}><img src={logo} alt="PixelMart Logo" height={100} width={100} /></Link>
                    <div className=' md:flex hidden gap-5 '>
                        <Link to={"/"} className=" cursor-pointer" >Home</Link>
                        <Link to={'/all-product'} className=" cursor-pointer">All Products</Link>
                        <h1 className=" cursor-pointer" onClick={handleData}>About</h1>
                        {isLogin && <Link to={'/myorder'} className=' cursor-pointer' >Order</Link>}
                        {(userRole === 'admin' || userRole === 'salesman') && isLogin && <Link to={'/admin-dashboard'}>Admin</Link>}
                    </div>
                    <div className=' flex lg:gap-5 md:gap-3 gap-3'>
                        <div className=' text-3xl flex justify-center items-center' onClick={toggleMode}>{localStorage.getItem('dark-mode') === 'true' ? <span><MdOutlineLightMode /></span> : <span><IoMoonOutline /></span>}</div>
                        {isLogin && <div className=' text-3xl flex justify-center items-center' ><Link to={"/cart"}><FaShoppingCart /></Link></div>}
                        {isLogin && user && <div className=' bg-white rounded-full text-black p-1 cursor-pointer ' onClick={() => setisVisible(!isVisible)}>{user && user.avatar && <img src={profilePhoto} alt="user" className='h-10 w-10 rounded-full' />}</div>}
                        {isLogin && !user && <div className=' text-2xl bg-gray-300 rounded-full text-blue-700 p-2 cursor-pointer'> <FaUser /> </div>}
                        {!isLogin && <div className=' flex justify-center items-center '> <Link to={'/login'}>Login</Link></div>}
                        {isLogin && <button className=' outline-none hidden md:flex justify-center items-center ' onClick={handleLogOut}>LogOut</button>}
                        {<div className=' text-4xl flex justify-center items-center md:hidden' onClick={isToggle} ><IoReorderThreeOutline /></div>}
                    </div>
                </div>
            </div>
            <div>
                <ProfileSidebar user={user} isVisible={isVisible} setisVisible={setisVisible} />
            </div>
            {/* For Responsive Navbar in small device */}
            <div className={`bg-zinc-900  h-screen z-20 w-[70%] min-[375px]:w-[50%] fixed top-10 py-5   right-0 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button className=' outline-none text-2xl text-gray-50 p-3 cursor-pointer' onClick={isToggle}><RxCross2 /></button>
                <div>
                    <div className='flex flex-col items-center w-full py-3 text-white gap-5 '>
                        <Link to={"/"} className=" cursor-pointer" onClick={isToggle}>Home</Link>
                        <Link to={'/all-product'} className=" cursor-pointer" onClick={isToggle}>All Products</Link>
                        <h1 className=" cursor-pointer" onClick={isToggle}>About</h1>
                        {isLogin && <Link to={'/myorder'} className=' cursor-pointer' onClick={isToggle} >Order</Link>}
                        {isLogin && <button className=' outline-none justify-center items-center bg-blue-500 px-4 py-2 rounded-md font-semibold cursor-pointer' onClick={() => { handleLogOut(); isToggle() }}>LogOut</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
