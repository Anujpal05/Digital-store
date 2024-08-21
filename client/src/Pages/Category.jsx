import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../Components/Card';

const Category = () => {
    const { category } = useParams();
    const [product, setproduct] = useState();
    const title = category ? category.charAt(0).toUpperCase() + category.slice(1) : "";

    useEffect(() => {

        const fetch = async () => {
            if (category != 'general') {
                const data = await axios.get("http://localhost:8080/api/v1/product/product-category-wise", { headers: { category: category } });
                if (data) {
                    setproduct(data?.data?.product);
                }
            } else {
                const data = await axios.get("http://localhost:8080/api/v1/product/getallproduct");
                if (data) {
                    setproduct(data?.data?.products);
                }
            }

        }
        fetch();
    }, [product])



    return (
        <div className=' px-16 py-7'>
            <h1 className=' text-2xl font-semibold p-3'><span className=' py-[2px] border-b-4 border-pink-700'>Our {title && title.slice(0, 3)}</span>{title.slice(3)} Collections</h1>
            <div className=' grid grid-cols-4'>
                {product && product.map((item, i) => (
                    <div key={i}><Card item={item} /></div>
                ))}
            </div>
        </div>
    )
}

export default Category
