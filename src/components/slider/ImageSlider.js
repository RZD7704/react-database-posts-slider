import React, {useState} from 'react';
import {SliderData} from './SliderData';
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'; 

import './Slider.scss';

const ImageSlider = ({slides}) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    } 

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    } 

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    return (
        <section className="slider">
            <FaArrowAltCircleLeft className="slider__left-arrow" onClick={prevSlide}/>
            <FaArrowAltCircleRight className="slider__right-arrow" onClick={nextSlide}/>
            {
                SliderData.map((slide, index) => {
                    return (
                        <div className={index === current ? 'slider__slide active' : 'slider__slide'} key={index}>
                            {
                                index === current && (
                                    <img className="slider__image" src={slide.image} alt="travel image"/>
                                )
                            }
                        </div>
                    )
                })
            }
            <span className="slider__counter">{current + 1}/{length}</span>
        </section>
    )
}

export default ImageSlider;
