import React from 'react';
import logo from "../assets/PixelMart.png";

function Navbar() {
    return (
        <div className=' flex justify-between  items-center p-2 lg:px-10 bg-zinc-800 py-2 lg:py-4 text-white font-semibold'>
            <img src={logo} alt="PixelMart Logo" height={100} width={100} />
            <div className=' lg:flex gap-5 hidden'>
                <h1 className=" cursor-pointer">Home</h1>
                <h1 className=" cursor-pointer">All Products</h1>
                <h1 className=" cursor-pointer">Cart</h1>
                <h1 className=" cursor-pointer">About</h1>
            </div>
            <div className=' flex lg:gap-5'>
                <button>Login</button>
                <button className=' hidden'>LogOut</button>
            </div>
        </div>
    )
}

export default Navbar
