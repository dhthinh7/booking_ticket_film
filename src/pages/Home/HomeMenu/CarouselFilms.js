import React, { memo } from "react";
import Slider from "react-slick";
import { PlayCircleOutlined } from '@ant-design/icons'
import { history } from "../../..";

function CarouselFilms(props) {
  const settings = {
    // centerMode: true,
    infinite: true,
    // centerPadding: "60px",
    speed: 500,
    rows: 2,
    slidesToShow: 1,
    slidesPerRow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 992,
        settings: {
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesPerRow: 3,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesPerRow: 2,
        }
      },
    ]
  };

  let listFilms = props.listFilms;

  const renderFilm = () => {
    return listFilms?.map((item, index) => {
      return <div key={index}>
        <div className="bk-item">
          <div className="film-img" style={{ backgroundImage: `url(${item.hinhAnh}), url('https://picsum.photos/300/300')`}}>
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
            <button className="film-button" onClick={() => {
              history.push(`/detail/${item.maPhim}`)
            }}>ĐẶT VÉ</button>
          </div>
        </div>
      </div>
    })
  }
  return <div className="bk-carousel-menu">
    <Slider {...settings}>
      {renderFilm()}
    </Slider>
  </div>;
}

export default memo(CarouselFilms);
