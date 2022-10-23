import React from "react";
import Slider from "react-slick";
import './style.scss';

export default function HomeCarousel() {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none"}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none"}}
        onClick={onClick}
      />
    );
  }
  const settings = {
    // centerMode: true,  
    infinite: true,
    // centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    // variableWidth: true,
    dots: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return <div className="bk-home-carousel h-96 w-full mx-auto bg-slate-200">
      <Slider {...settings}>
        <div className="!flex justify-center">
          <img src="https://picsum.photos/300" alt="" />
        </div>
        <div className="!flex justify-center">
          <img src="https://picsum.photos/300" alt="" />
        </div>
        <div className="!flex justify-center">
          <img src="https://picsum.photos/300" alt="" />
        </div>
      </Slider>
  </div>
}
