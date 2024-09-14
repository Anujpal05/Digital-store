import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className=' h-screen w-[50%] bg-gray-200 flex flex-col items-center gap-8 py-20 text-xl font-semibold text-gray-800' >
            <Link to={'/add-product'} >Add Product</Link>
            <p>Add Salesman</p>
            <p>All Orders</p>
            <p>All Users</p>
        </div>
    )
}

export default Sidebar
