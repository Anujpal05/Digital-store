import React from 'react'
import Sidebar from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
    return (
        <div className=' min-h-screen w-screen flex flex-col lg:flex-row overflow-x-hidden py-16 lg:py-1'>
            <div className=' lg:w-[20%] w-full'>
                <Sidebar />
            </div>
            <div className=' lg:w-[80%]'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
