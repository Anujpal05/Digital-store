import React from 'react';
import { IoSearch } from "react-icons/io5";

function Filter({ filter, setfilter, setprice, setSearch }) {

    const handleCategory = (e) => {
        setfilter(e.target.value);
    }

    const handlePrice = (e) => {
        setprice(e.target.value);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    return (
        <div className=' flex py-5 '>
            <div className=' bg-gray-200 dark:bg-gray-800 px-5 lg:px-10 p-5 w-full rounded-md space-y-2'>
                <div className=' bg-gray-50 dark:bg-gray-700 flex rounded-md gap-2 lg:p-2 p-1 w-full '><IoSearch className=' text-2xl text-gray-400' /><input type="text" name="" placeholder='Search here' className=' outline-none bg-gray-50 dark:text-gray-100 dark:bg-gray-700 w-full' onChange={handleSearch} /></div>
                <div>  <h1 className=' text-xl font-semibold dark:text-gray-100'>Filters</h1> </div>
                <div className=' flex space-x-8'>
                    <select name="category" className=' lg:w-[20%] p-1 outline-none rounded-md dark:bg-gray-700 dark:text-white ' onChange={handleCategory}>
                        <option value="general">All</option>
                        <option value="phones">Phones</option>
                        <option value="clothes">Clothes</option>
                        <option value="books">Books</option>
                        <option value="toys">Toys</option>
                    </select>
                    {filter && filter != 'phones' && <select name="price" className=' lg:w-[20%] p-1 outline-none rounded-md dark:bg-gray-700 dark:text-white' onChange={handlePrice}>
                        <option value="0">Any Price</option>
                        <option value="100">less than 100</option>
                        <option value="500">less than 500</option>
                        <option value="1000">less than 1000</option>
                        <option value="2000">less than 2000</option>
                    </select>}
                    {filter && filter == 'phones' && <select name="price" className=' lg:w-[20%] p-1 outline-none rounded-md dark:bg-gray-700 dark:text-white' onChange={handlePrice}>
                        <option value="0">Any Price</option>
                        <option value="10000">less than 10000</option>
                        <option value="20000">less than 20000</option>
                        <option value="40000">less than 40000</option>
                        <option value="60000">less than 60000</option>
                    </select>}
                </div>
            </div>
        </div>
    )
}

export default Filter
