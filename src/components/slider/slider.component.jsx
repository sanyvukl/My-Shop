import { useState, useEffect } from 'react';
import { sliderData } from './slider.data';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./slider.styles.scss";

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoScroll, setAutoScroll] = useState(true);
    let sliderInterval;

    const onNextSlide = () => {
        if (currentSlide === sliderData.length - 1) {
            return setCurrentSlide(0);
        }
        if (currentSlide < sliderData.length) {
            return setCurrentSlide(currentSlide + 1);
        }
    }
    const onPreviousSlide = () => {
        if (currentSlide === 0) {
            return setCurrentSlide(sliderData.length - 1);
        }
        if (currentSlide > 0) {
            return setCurrentSlide(currentSlide - 1);
        }
    }
    const autoSlide = () => {
        sliderInterval = setInterval(onNextSlide, 5000);
    }

    useEffect(() => {
        if (autoScroll) {
            autoSlide();
        }
        return () => clearInterval(sliderInterval);
    }, [currentSlide]);

    return (
        <div className='slider'>
            <AiOutlineArrowLeft className="arrow prev" onClick={() => {
                onPreviousSlide();
                autoScroll && setAutoScroll(false);
            }} />
            {
                sliderData.map((slide, index) => {
                    const { image, heading, desc } = slide;
                    return (
                        <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
                            <img src={image} alt={heading} />
                            <div className="content">
                                <h2>{heading}</h2>
                                <p> {desc}</p>
                                <hr />
                                <a href="#products" style={{ cursor: "pointer" }} onClick={(e) => {
                                    e.preventDefault();
                                    const top = document.getElementById("products")?.getBoundingClientRect()?.top - 80;
                                    window.scrollTo({
                                        top: Number(top),
                                        behavior: "smooth"
                                    });
                                }} className='--btn --btn-primary'>
                                    Shop Now
                                </a>
                            </div>
                        </div>
                    )
                })
            }
            <AiOutlineArrowRight className="arrow next" onClick={() => {
                onNextSlide();
                autoScroll && setAutoScroll(false);
            }} />
        </div >
    );
};

export default Slider;