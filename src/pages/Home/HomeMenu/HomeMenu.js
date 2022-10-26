import React from "react";
import CarouselFilms from "./CarouselFilms";
import CinemaInfor from "./CinemaInfor";
// import styleSlick from './MultipleRowSlick.module.css';
import './style.scss';

export default function HomeMenu() {

  return <div className="bk-home-menu my-10">
    <div className="bk-menu-btn flex justify-center items-center mb-10">
      <button className="actived">Đang chiếu</button>
      <button>Sắp chiếu</button>
    </div>
    {/* Handle carousel list films */}
    <CarouselFilms />
    {/* Handle list cinema */}
    <CinemaInfor />
  </div>;
}
