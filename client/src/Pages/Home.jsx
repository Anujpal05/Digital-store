import React, { useState } from 'react';
import Filter from '../Components/Filter';
import LatestCollection from '../Components/LatestCollection';
import Hero from '../Components/Hero';
import Service from "../Components/Service"
import Footer from '../Components/Footer';
import ExploreCategory from '../Components/ExploreCategory';


function Home() {
    const [filter, setfilter] = useState("general");
    const [price, setprice] = useState(0);
    const [search, setSearch] = useState("");

    return (
        <div className=' overflow-x-hidden'>
            <Hero />
            <div className=' pb-20 lg:px-16 px-5'>
                <ExploreCategory />
                <Filter filter={filter} setfilter={setfilter} setprice={setprice} setSearch={setSearch} />
                <LatestCollection filter={filter} price={price} search={search} />
                <Service />
            </div>
            <Footer />
        </div>
    )
}

export default Home
