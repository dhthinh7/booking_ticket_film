import React from "react";
import Slider from "react-slick";

export default function CarouselFilms() {

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        // className={`${className} ${styleSlick['slick-prev']}`}
        className={className}

        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
      </div>

    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        // className={`${className} ${styleSlick['slick-prev']}`}
        className={className}

        style={{ ...style, display: "block", left: '50px' }}
        onClick={onClick}
      >
      </div>
    );
  }

  const settings = {
    // // variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    speed: 500,
    rows: 2,
    slidesPerRow: 1
  };

  // Temp render film 
  const renderFilm = () => {
    let arrayFilms = []
    for (let index = 0; index < 12; index++) {
      arrayFilms.push(<div key={index} className="bk-item">
        <div className="bg-red-300 m-3 text-center">
          <h3 className="">{index}</h3>
        </div>
      </div>)
    }
    return arrayFilms
  }

  return <div className="bk-carousel-menu container px-5 py-10 mx-auto w-4/6 bg-slate-400">
    <Slider {...settings}>
      {/* {renderFilms()} */}
      {renderFilm()}
    </Slider>
  </div>;
}
