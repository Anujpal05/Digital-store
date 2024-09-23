import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const AllUsers = () => {
    const [users, setusers] = useState();

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/get-all-users`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
                if (data) {
                    setusers(data?.data?.allUsers);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetch();
    }, [])

    const formatDate = (isodate) => {
        const date = new Date(isodate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    return (
        <div className=' px-5 p-3'>
            <div>
                {users && <div>
                    {users.length === 0 && <div className=' text-3xl font-semibold text-gray-700'>Not found users</div>}
                    {users.length > 0 && <h1 className=' text-3xl font-semibold text-gray-700'>All Users Details</h1>}
                    <div className='  grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:max-h-[90vh] lg:overflow-scroll py-10 my-3'>
                        {users.length > 0 && users.map((user, i) => (
                            <div className='bg-gray-200 p-5 rounded-md shadow-sm shadow-gray-900 h-fit' key={i}>
                                <div className=' text-md font-semibold'>Customer Id : <span className=' text-base text-gray-700'>{user._id}</span></div>
                                <div className=' text-md font-semibold'>Customer Name : <span className=' text-base text-gray-700'>{user.username}</span></div>
                                <div className=' text-md font-semibold'>Email : <span className=' text-base text-gray-700'>{user.email}</span></div>
                                {user.phone && <div className=' text-md font-semibold'>Phone no. <span className=' text-base text-gray-700'>{user.phone}</span></div>}
                                {user.address && <div className=' text-md font-semibold'>Address: <span className=' text-base text-gray-700'>{user.address}</span></div>}
                                <div className=' text-md font-semibold'>Registered Date : <span className=' text-base text-gray-700'>{formatDate(user.createdAt)}</span></div>
                            </div>
                        ))}
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default AllUsers
