import React from 'react'
import Sidebar from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
    return (
        <div className=' min-h-screen w-screen flex'>
            <div className=' w-[20%]'>
                <Sidebar />
            </div>
            <div className=' w-[80%]'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
