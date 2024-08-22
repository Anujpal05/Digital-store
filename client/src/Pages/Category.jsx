import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../Components/Card';
import { Hourglass } from "react-loader-spinner"
import Footer from '../Components/Footer';
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
        <div className=' lg:px-16 px-5 py-7'>
            <h1 className=' text-2xl font-semibold py-3'><span className=' py-[2px] border-b-4 border-pink-700'>Our {title && title.slice(0, 3)}</span>{title.slice(3)} Collections</h1>
            <div className=' grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
                {product && product.map((item, i) => (
                    <div key={i}><Card item={item} /></div>
                ))}
            </div>
            {!product && <div className=' min-h-screen min-w-full flex justify-center items-center'>
                <Hourglass
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['#306cce', '#72a1ed']}
                />
            </div>}
            <Footer />
        </div>
    )
}

export default Category
