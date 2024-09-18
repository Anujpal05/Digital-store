import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

const Salesman = () => {
    return (
        <div className=' md:p-4 p-2'>
            <div className=' flex justify-center items-center'>
                <div className='  grid grid-cols-2 text-center  w-full rounded-md'>
                    <div className='  text-gray-100 font-semibold max-[380px]:text-sm text-md md:text-xl w-full px-1 '>
                        <NavLink to={'all-salesman'} className={({ isActive }) =>
                            isActive ? "bg-gray-800 text-gray-200 py-2 md:px-10 px-1 text-center rounded-md  w-full block transition-all duration-300 " : "bg-gray-600 py-2 md:px-10 px-1 text-center rounded-md w-full block transition-all duration-300"
                        }>All Salesman Details</NavLink>
                    </div>
                    <div className='  text-gray-100 font-semibold max-[380px]:text-sm text-md md:text-xl w-full px-1'>
                        <NavLink to={'salesman-request'} className={({ isActive }) =>
                            isActive ? "bg-gray-800 text-gray-200 py-2 md:px-10 px-1 text-center rounded-md w-full block transition-all duration-300" : "bg-gray-600 py-2 md:px-10 px-1 text-center rounded-md w-full block transition-all duration-300"
                        }>Salesman request</NavLink>
                    </div>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Salesman
