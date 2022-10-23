import React from "react";
import CarouselFilms from "./CarouselFilms";
import CinemaInfor from "./CinemaInfor";
// import styleSlick from './MultipleRowSlick.module.css';
import './style.scss';

export default function HomeMenu() {

  return <div className="bk-home-menu">
    <div className="bk-menu-btn flex justify-center items-center">
      <button className="actived">Đang chiếu</button>
      <button>Sắp chiếu</button>
    </div>
    {/* Handle carousel list films */}
    <CarouselFilms />
    {/* Handle list cinema */}
    <CinemaInfor />
  </div>;
}
