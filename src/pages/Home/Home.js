import React from "react";
import Footer from "../../templates/Layout/Footer/Footer";
import HomeCarousel from "../../templates/Layout/Home/HomeCarousel";
import HomeMenu from "./HomeMenu/HomeMenu";

export default function Home() {
  return <div className="bk-home">
    <HomeCarousel />
    <HomeMenu />
    <Footer />
  </div>;
}
