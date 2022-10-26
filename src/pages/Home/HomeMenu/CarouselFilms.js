import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { PlayCircleOutlined } from '@ant-design/icons'

export default function CarouselFilms() {
  let { listFilms } = useSelector(state => state.FilmManageReducer)
  console.log("listFilms", listFilms)

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 4,
  };

  // Temp render film 
  const renderFilm = () => {
    return listFilms.map((item, index) => {
      return <div key={index}>
        <div className="bk-item">
          <div className="film-img" style={{ backgroundImage: `url(${item.hinhAnh})` }}>
            <div className="bk-overload"></div>
            <div className="trailer">
              <PlayCircleOutlined />
            </div>
          </div>
          <div className="film-content">
            <div className="film-name">
              <div className="name">
                {item.tenPhim}
              </div>
            </div>
            <button className="film-button">ĐẶT VÉ</button>
          </div>
        </div>

      </div>
    })
  }

  return <div className="bk-carousel-menu container mx-auto w-4/6">
    <Slider {...settings}>
      {/* {renderFilms()} */}
      {renderFilm()}
    </Slider>
  </div>;
}
