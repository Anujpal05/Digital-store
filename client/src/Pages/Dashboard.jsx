import React from 'react'
import Sidebar from '../Components/Sidebar'

function Dashboard() {
    return (
        <div className=' min-h-screen w-screen flex'>
            <div className=' w-[40%]'>
                <Sidebar />
            </div>
            <div className=' w-[60%]'>

            </div>
        </div>
    )
}

export default Dashboard
