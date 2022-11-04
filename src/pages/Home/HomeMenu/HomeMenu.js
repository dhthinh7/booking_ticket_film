import React from "react";
import { useDispatch } from "react-redux";
import { GET_LIST_PHIM_DC, GET_LIST_PHIM_SC } from "../../../redux/types/Type";
import CarouselFilms from "./CarouselFilms";
import CinemaInfor from "./CinemaInfor";
import './style.scss';
export default function HomeMenu() {
  
  const dispatch = useDispatch();
  const handleOnclick = (e) => {
    // Change tab active
    document.querySelectorAll('.actived')[0]?.classList.remove('actived');
    e.target.classList.add('actived');

    // Dispatch action to get list film
    [...e.target.classList].includes('phimDC') ? dispatch({type: GET_LIST_PHIM_DC}) : dispatch({type: GET_LIST_PHIM_SC})
  }

  return <div className="bk-home-menu my-10">
    <div className="bk-menu-btn flex justify-center items-center mb-10">
      <button className="phimDC actived" onClick={handleOnclick}>Đang chiếu</button>
      <button className="phimSC" onClick={handleOnclick}>Sắp chiếu</button>
    </div>
    {/* Handle carousel list films */}
    <CarouselFilms />
    {/* Handle list cinema */}
    <CinemaInfor />
  </div>;
}
