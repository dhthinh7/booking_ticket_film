import React from "react";
import HomeCarousel from "../../templates/Layout/Home/HomeCarousel";
import HomeMenu from "./HomeMenu/HomeMenu";
import './Home.scss';

export default function Home() {
  return <div className="bk-home">
    <HomeCarousel />
    <HomeMenu />
  </div>;
}
