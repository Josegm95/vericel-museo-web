import React, { useRef, useState, useEffect } from 'react';
import { usePrismicRequest } from '../../Requests/prismic';
import './slider.scss';

const Slider = () => {
  const [slider, sliderLoading] = usePrismicRequest(
    'my.slider.uid',
    'homeslider'
  );
  const [slide, setSlide] = useState(0);
  const [timer, setTimer] = useState(null);
  const myComponent = useRef(null);
  const slidesAmount = 4;

  const slideCarousel = slideNumber => {
    const size = myComponent.current.offsetWidth;
    myComponent.current.style.transform = `translateX(${-size *
      slideNumber}px)`;

    return slideNumber;
  };

  const previusImg = () => {
    if (slide > 0) {
      setSlide(slideCarousel(slide - 1));
    } else {
      setSlide(slideCarousel(slidesAmount - 1));
    }
  };

  const nextImg = () => {
    if (slide < slidesAmount - 1) {
      setSlide(slideCarousel(slide + 1));
    } else {
      setSlide(slideCarousel(0));
    }
  };

  useEffect(() => {
    clearTimeout(timer);

    setTimer(
      setTimeout(() => {
        nextImg();
      }, 5000)
    );
  }, [slide]);

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
      <div ref={myComponent} className="slider__images-container">
        {!sliderLoading && slider
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
        {!sliderLoading && slider
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
