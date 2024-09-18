import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const SalesmanProducts = () => {
    const { id } = useParams();
    const [products, setproducts] = useState()
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/v1/product/get-salesman-products", { headers: { Authorization: `Bearer ${localStorage.getItem('toke')}`, id: id } });
                setproducts(res?.data?.products);
            } catch (error) {
                console.log(error.data.response.message)
            }
        }
        fetch()
    }, [])

    return (
        <div className=' h-screen p-5'>
            <div>
                <h1 className=' text-3xl font-semibold text-gray-700'>Salesman All Products</h1>
                <div>

                </div>
            </div>
        </div>
    )
}

export default SalesmanProducts
