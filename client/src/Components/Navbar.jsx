import React from 'react';
import logo from "../assets/PixelMart.png";
import { Link } from 'react-router-dom';
import { MdOutlineLightMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';
import toast from 'react-hot-toast';

function Navbar() {

    const isLogin = useSelector(state => state.auth.isLogin);
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(authActions.logout());
        localStorage.clear();
        toast.success("LogOut Successfully!")
    }

    const handleData = () => {
        toast.success("Coming soon...")
    }

    return (
        <div className=' flex justify-between  items-center p-2 lg:px-10 bg-zinc-800 py-2 lg:py-4 text-white font-semibold'>
            <Link to={"/"}><img src={logo} alt="PixelMart Logo" height={100} width={100} /></Link>
            <div className=' lg:flex gap-5 hidden'>
                <Link to={"/"} className=" cursor-pointer">Home</Link>
                <Link to={'/all-product'} className=" cursor-pointer">All Products</Link>
                <h1 className=" cursor-pointer" onClick={handleData}>About</h1>
                {isLogin && <Link to={'/myorder'} className=' cursor-pointer' >Order</Link>}
            </div>
            <div className=' flex lg:gap-5'>
                <div className=' text-3xl flex justify-center items-center' onClick={handleData}><MdOutlineLightMode /></div>
                {isLogin && <div className=' text-3xl flex justify-center items-center pr-4 '><Link to={"/cart"}><FaShoppingCart /></Link></div>}
                <div className=' text-2xl bg-white rounded-full text-black p-2 '><FaUser /></div>
                {!isLogin && <div className=' flex justify-center items-center '> <Link to={'/login'}>Login</Link></div>}
                {isLogin && <button className=' outline-none ' onClick={handleLogOut}>LogOut</button>}
            </div>
        </div>
    )
}

export default Navbar
