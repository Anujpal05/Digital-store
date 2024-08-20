import React from 'react';
import Category from '../Components/Category';
import Filter from '../Components/Filter';
import LatestCollection from '../Components/LatestCollection';
import Hero from '../Components/Hero';
import Service from "../Components/Service"
import Footer from '../Components/Footer';


function Home() {

    return (
        <div className=' overflow-x-hidden'>
            <Hero />
            <div className=' pb-20 lg:px-16 px-5'>
                <Category />
                <Filter />
                <LatestCollection />
                <Service />
            </div>
            <Footer />
        </div>
    )
}

export default Home
