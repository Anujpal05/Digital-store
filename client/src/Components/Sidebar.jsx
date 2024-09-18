import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Sidebar() {
    const role = useSelector(state => state.auth.role);
    return (
        <div className=' lg:h-screen bg-gray-200 grid grid-cols-2 text-center md:grid-cols-4 lg:flex lg:flex-col items-center lg:gap-8 lg:py-20 py-3 text-xl font-semibold text-gray-800' >
            <Link to={'add-product'} className=' p-2'>Add Product</Link>
            {role === 'admin' && <Link to={'salesman'} className=' p-2'>Salesman</Link>}
            <Link to={'all-orders'} className=' p-2'>All Orders</Link>
            {role === 'admin' && <Link to={`all-users`} className=' p-2'>All Users</Link>}
        </div>
    )
}

export default Sidebar
