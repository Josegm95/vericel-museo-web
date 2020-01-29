import React, { useRef, useState, useEffect } from 'react';
import { prismicRequest } from '../../Requests/prismic';
import './slider.scss';

const Slider = () => {
  const [slider, setSlider] = useState(null);
  const [amount, setAmount] = useState(null);
  const [slide, setSlide] = useState(0);
  const sliderContainer = useRef(null);

  const slideCarousel = slideNumber => {
    const size = sliderContainer.current.offsetWidth;
    sliderContainer.current.style.transform = `translateX(${-size *
      slideNumber}px)`;

    return slideNumber;
  };

  const previusImg = () => {
    if (slide > 0) {
      setSlide(slideCarousel(slide - 1));
    } else {
      setSlide(slideCarousel(amount - 1));
    }
  };

  const nextImg = () => {
    if (slide < amount - 1) {
      setSlide(slideCarousel(slide + 1));
    } else {
      setSlide(slideCarousel(0));
    }
  };

  useEffect(() => {
    prismicRequest('my.slider.uid', 'homeslider', data => {
      setSlider(data);
      setAmount(data.results[0].data.imagenesurl.length);
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImg();
    }, 3000);

    return () => clearInterval(intervalId);
  });

  return (
    <div className="slider-container">
      <button
        className="slider__icon-left"
        onClick={() => {
          previusImg();
        }}
      >
        <i className="fas fa-chevron-left " />
      </button>
      <div ref={sliderContainer} className="slider__images-container">
        {slider
          ? slider.results[0].data.imagenesurl.map((imageUrl, index) => (
              <img src={imageUrl.text} alt="" key={index} />
            ))
          : null}
      </div>
      <button
        className="slider__icon-right"
        onClick={() => {
          nextImg();
        }}
      >
        <i className="fas fa-chevron-right " />
      </button>
      <div className="slider__dots-container">
        {slider
          ? slider.results[0].data.imagenesurl.map((item, index) => (
              <span
                key={index}
                className={`slider__dot ${
                  slide === index ? 'slider__dot--selected' : null
                }`}
                onClick={() => {
                  setSlide(slideCarousel(index));
                }}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Slider;
