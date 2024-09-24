import React from 'react'

function Footer() {
    return (
        <div className=' dark:text-gray-100'>
            <div className=' flex justify-around items-start bg-gray-200 dark:bg-gray-800 py-10'>
                <div>
                    <h1 className=' font-semibold'>Categories</h1>
                    <div className=' pt-2 text-sm text-gray-500 dark:text-gray-400'>
                        <p>General</p>
                        <p>Clothes</p>
                        <p>Phones</p>
                        <p>Books</p>
                        <p>Toys</p>
                    </div>
                </div>
                <div>
                    <h1 className=' font-semibold'> Service</h1>
                    <div className=' pt-2 text-sm text-gray-500 dark:text-gray-400'>
                        <p>Return Policy</p>
                        <p>About</p>
                        <p>Contact us</p>
                    </div>
                </div>
                <div>
                    <h1 className=' font-semibold'>Customer Service</h1>
                    <div className='pt-2 text-sm text-gray-500 dark:text-gray-400'>
                        <p>Privacy</p>
                        <p>Free Delivery</p>
                    </div>
                </div>

            </div>
            <div className=' bg-gray-300 dark:bg-gray-900 lg:p-4 p-1 text-center font-semibold text-md'>
                <p>Copyright &copy; - All rights reserved by PixelMart Ltd </p>
            </div>
        </div>
    )
}

export default Footer
