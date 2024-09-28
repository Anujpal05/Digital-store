import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import { useUser } from '../store/context';

const UpdateUser = () => {
    const [user, setuser] = useState();
    const [image, setImage] = useState(null);
    const [flag, setflag] = useState(true);
    const { profilePhoto, setprofilePhoto } = useUser();

    useEffect(() => {

        const fetch = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/get-user`, { headers: { userid: localStorage.getItem('userId'), Authorization: `Bearer ${localStorage.getItem('token')}` } });
                if (res) {
                    setuser(res.data.user);
                    setuser({
                        username: res.data.user.username,
                        email: res.data.user.email,
                        phone: res.data.user.phone,
                        address: res.data.user.address,
                        id: res.data.user._id,
                        avatar: res.data.user.avatar
                    })
                }

            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        if (flag === true) {
            fetch();
        }
    }, [flag])

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const fileInput = document.getElementById('fileInput');
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (file && !validImageTypes.includes(file.type)) {
            alert('Please upload a valid image file (JPEG, PNG, or GIF)');
            fileInput.value = ''; // Reset the input
        } else {
            setImage(file);
        }
    }

    const updateUserData = async (e) => {
        try {
            e.preventDefault();
            setflag(false)
            const formData = new FormData();
            formData.append('username', user.username);
            formData.append('phone', user.phone);
            formData.append("address", user.address);
            if (image) {
                formData.append('image', image)
            }
            const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/update-profile`, formData, { headers: { id: localStorage.getItem('userId'), Authorization: `Bearer ${localStorage.getItem('token')}`, "Content-Type": "multipart/form-data" } });
            if (res) {
                setflag(true)
            }
            toast.success("Profile updated successfully!");

            if (image) {
                const userData = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/get-user`, { headers: { userid: localStorage.getItem('userId'), Authorization: `Bearer ${localStorage.getItem('token')}` } });
                if (userData) {
                    setprofilePhoto(import.meta.env.VITE_SERVER_URL + userData.data.user.avatar);
                }
            }
        }
        catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setuser({ ...user, [name]: value });
    }


    return (
        <div className=' min-h-screen p-5 overflow-x-hidden py-20'>
            {!user && <div className=' min-h-[50vh] min-w-full flex justify-center items-center'>
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
            </div>}
            {user &&
                <div>
                    <h1 className=' text-3xl font-semibold text-gray-700 dark:text-gray-300 pb-5 text-center   '>User Information</h1>
                    <div className=' lg:flex justify-center'>
                        <form action="" className=' flex flex-col justify-center gap-3 lg:border-2 lg:bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 rounded-md xl:w-[50vw] lg:p-5 p-3' onSubmit={updateUserData}>
                            <div className=' w-full flex flex-col items-center justify-center p-5'>
                                <img src={profilePhoto} name='avatar' alt='avatar' className=' h-40 w-40 text-center rounded-full border-4 border-gray-900 dark:border-gray-200 ' />
                                <input type="file" name="image" id="fileInput" onChange={handleImageUpload} className=' dark:text-gray-400' accept='image/*' />

                            </div>
                            <div className=' text-lg font-semibold  '>
                                userId : <span className=' text-base px-1 text-gray-700 dark:text-gray-400'>{user.id}</span>
                            </div>
                            <div className=' text-lg font-semibold '>
                                email : <span className=' text-base px-1 text-gray-700 dark:text-gray-400 ' >{user.email}</span>
                            </div>
                            <div className=' text-lg font-semibold flex flex-col'>
                                <label htmlFor="username">Username :</label>
                                <input type="text" name='username' className=' border-2 text-gray-600 text-base px-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 p-1 rounded-md outline-none w-full ' value={user.username} onChange={handleChange} required />
                            </div>

                            <div className=' text-lg font-semibold flex flex-col'>
                                <label htmlFor="phone" >Phone :</label>
                                <input type="number" name='phone' className=' border-2 text-gray-600 text-base px-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 p-1 rounded-md outline-none w-full ' value={user.phone} onChange={handleChange} required />
                            </div>
                            <div className=' text-lg font-semibold flex flex-col'>
                                <label htmlFor="address">Address :</label>
                                <input type="text" name='address' className=' border-2 text-gray-600 text-base px-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 p-1 rounded-md outline-none w-full ' value={user.address} onChange={handleChange} required />
                            </div>
                            <div className=' w-full flex justify-center'><button className=' text-xl font-semibold p-2 px-4 bg-blue-500 dark:bg-blue-600 rounded-md text-center w-fit text-gray-900 outline-none '>Save</button></div>
                        </form>
                    </div>

                </div>}
        </div>
    )
}

export default UpdateUser
