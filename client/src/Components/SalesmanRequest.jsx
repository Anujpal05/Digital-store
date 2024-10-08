import axios from 'axios'
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { ThreeDots } from 'react-loader-spinner';

const SalesmanRequest = () => {
    const [salesmans, setsalesmans] = useState();
    const [options, setoptions] = useState(-1);
    const [verify, setverify] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                const salesman = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/get-salesman-request`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
                setsalesmans(salesman?.data?.allUsers);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        if (options === -1) {
            fetch();
        }
    }, [options])

    const formatDate = (isodate) => {
        const date = new Date(isodate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const handleVerification = async (id) => {
        try {
            const data = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/update-verification`, { verify }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, id: id } });
            toast.success(data.data.message);
            setoptions(-1);
            setverify(false);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div>
            {
                !salesmans && <div className=' min-h-[50vh] min-w-full flex justify-center items-center'>
                    <ThreeDots
                        visible={true}
                        height="100"
                        width="100"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            }
            {salesmans && salesmans.length === 0 && <div className=' h-[60vh] md:flex justify-center items-center'>
                <h1 className='text-2xl md:text-3xl p-3 font-semibold text-gray-700 dark:text-gray-200'>No any request found</h1>
            </div>}
            {salesmans && salesmans.length > 0 && <div className=' px-3'>
                <h1 className=' text-3xl font-semibold text-gray-700 dark:text-gray-200 py-5'>Salesman Request </h1>
                <div className=' grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 lg:overflow-auto lg:dark:scrollbar dark:scrollbar-thumb-gray-700 '>
                    {salesmans.map((salesman, i) => (
                        <div className='bg-gray-200 dark:bg-gray-800 dark:text-gray-100 p-5 rounded-md shadow-sm shadow-gray-900 h-fit' key={i}>
                            <div className=' text-md font-semibold'>Salesman Id : <span className=' text-base text-gray-700 dark:text-gray-400'>{salesman._id}</span></div>
                            <div className=' text-md font-semibold'>Customer Name : <span className=' text-base text-gray-700 dark:text-gray-400'>{salesman.username}</span></div>
                            <div className=' text-md font-semibold'>Email : <span className=' text-base text-gray-700 dark:text-gray-400'>{salesman.email}</span></div>
                            {salesman.phone && <div className=' text-md font-semibold'>Phone no. <span className=' text-base text-gray-700 dark:text-gray-400'>{salesman.phone}</span></div>}
                            {salesman.address && <div className=' text-md font-semibold'>Address: <span className=' text-base text-gray-700 dark:text-gray-400'>{salesman.address}</span></div>}
                            <div className=' text-md font-semibold'>Registered Date : <span className=' text-base text-gray-700 dark:text-gray-400'>{formatDate(salesman.createdAt)}</span></div>
                            <div className=' flex items-center gap-5'>
                                <div className=' text-md font-semibold'>Verification: {salesman.verify == true ? <span className=' text-base text-green-700'>Verified</span> : <span className=' text-base text-red-600'>Unverified</span>}</div>
                                <p className={` text-blue-600 text-lg cursor-pointer ${options === i ? 'hidden' : "block"}`} onClick={() => setoptions(i)} ><FaEdit /></p>
                                <p className={` text-green-600 text-lg cursor-pointer ${options === i ? 'block' : "hidden"}`} onClick={() => handleVerification(salesman._id)} ><FaCheck /></p>
                            </div>
                            {options === i && <div>
                                <select name="verify" defaultValue={salesman.verify} onChange={(e) => setverify(e.target.value === 'true' ? true : false)} className=' outline-none bg-gray-100 dark:bg-gray-700 '>
                                    <option value={true}>Verified</option>
                                    <option value={false}>Unverified</option>
                                </select>
                            </div>}
                        </div>
                    ))}
                </div>
            </div>
            }
        </div>
    )
}

export default SalesmanRequest
