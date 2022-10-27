import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { PlayCircleOutlined } from '@ant-design/icons'
import { getListFilmsAction } from "../../../redux/actions/FilmMangeAction";

export default function CarouselFilms() {
  const dispatch = useDispatch();
  let { listFilms } = useSelector(state => state.FilmManageReducer)

  useEffect(()=>{
    dispatch(getListFilmsAction());
  }, [])

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

  const renderFilm = () => {
    return listFilms?.map((item, index) => {
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
      {renderFilm()}
    </Slider>
  </div>;
}
