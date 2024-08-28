import React, { useRef } from 'react';
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";
import hero5 from "../assets/hero5.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";

function Hero() {
    const sliderRef = useRef(null);
    const nextSlide = () => {
        sliderRef.current.slickNext();
    }

    const prevSlide = () => {
        sliderRef.current.slickPrev();
    }
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 4000,
        pauseOnHover: false,
    };
    return (
        <div>
            <div>
                <div className=' relative'>
                    <Slider ref={sliderRef} {...settings}>
                        <div><img src={hero1} alt="hero1" loading='lazy' className=' h-48 lg:h-96 w-screen ' /></div>
                        <div><img src={hero2} alt="hero2" loading='lazy' className=' h-48 lg:h-96 w-screen' /></div>
                        <div><img src={hero3} alt="hero3" loading='lazy' className=' h-48 lg:h-96 w-screen ' /></div>
                        <div><img src={hero4} alt="hero4" loading='lazy' className=' h-48 lg:h-96 w-screen ' /></div>
                        <div><img src={hero5} alt="hero5" loading='lazy' className=' h-48 lg:h-96 w-screen ' /></div>
                    </Slider>
                    <div className='absolute px-1 lg:p-2  rounded-md bg-gray-500 opacity-45 top-16 lg:top-36 hover:opacity-90 hover:scale-105 left-2 ' onClick={prevSlide}><button ><TbPlayerTrackPrevFilled /></button></div>
                    <div className=' absolute px-1 lg:p-2 rounded-md bg-gray-500 lg:top-36 top-16 opacity-45 hover:opacity-90 hover:scale-105 right-6' onClick={nextSlide}> <button ><TbPlayerTrackNextFilled /></button></div>
                </div>
            </div>
        </div>
    )
}

export default Hero
