import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { getListBannersAction } from "../../../redux/actions/FilmMangeAction";
import './style.scss';

export default function HomeCarousel() {
  const dispatch = useDispatch();
  const { listBanner } = useSelector(state => state.FilmManageReducer)

  useEffect(() => {
    dispatch(getListBannersAction());
  }, [])

  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    dots: true,
  };

  const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',

  };

  const renderBanner = () => {
    return listBanner?.map((item, index) => {
      return <div key={index}>
        <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})`}} className="mx-1">
        </div>

      </div>
    })
  }

  return <div className="bk-home-carousel w-full mx-auto bg-slate-200">
    <Slider {...settings}>
      {renderBanner()}
    </Slider>
  </div>
}
