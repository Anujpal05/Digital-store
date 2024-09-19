import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';


const ProfileSidebar = ({ user, isVisible, setisVisible }) => {
    const [isOpen, setisOpen] = useState();
    return (
        <div className={` transition-transform duration-700 z-20 ease-in-out ${isVisible ? "translate-x-0" : "translate-x-full"} w-screen h-screen fixed`} >
            <div className={` h-screen md:w-96 w-screen fixed right-0 bg-gray-600 z-20 transition-transform duration-700 ease-in-out ${isVisible ? "translate-x-0" : "translate-x-full"} `}>
                <div className=' outline-none text-3xl text-gray-50 p-3 py-5  cursor-pointer ' onClick={() => setisVisible(!isVisible)}>
                    <RxCross2 />
                </div>
                {user && <div className=' flex flex-col justify-center items-center py-5 gap-5'>
                    <div className=' border-8 border-gray-100 rounded-full '><img src={user.avatar} alt="" className=' h-20 ' /></div>
                    <div className=' flex flex-col text-xl font-semibold text-gray-100 justify-center items-center gap-3'>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                        <p>{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Id : <span className=' text-base text-gray-300'>{user._id}</span></p>
                    </div>
                    <div className=' text-xl font-semibold text-gray-700 bg-blue-400 rounded-md p-2 w-60 text-center' onClick={() => setisVisible(!isVisible)}>
                        <button className=' flex items-center justify-center w-full text-gray-700 gap-1 outline-none'><span className=' text-blue-700 '><MdEdit /></span>Edit</button>
                    </div>
                    <div className='text-xl font-semibold text-gray-700 bg-pink-400 rounded-md p-2 w-60 text-center ' onClick={() => setisVisible(!isVisible)}>
                        <Link to={'/get-watchList'} className=' flex items-center justify-center w-full text-gray-700 gap-1 outline-none'><span className=' text-red-600'><FaHeart /></span>Watch Your WishList</Link>
                    </div>


                </div>}
            </div>
        </div>
    )
}

export default ProfileSidebar
