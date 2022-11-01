import React from "react";
import { Route } from "react-router-dom";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";

export default function HomeTemplate(props) {
  const { Component, ...restParam } = props;

  return <Route {...restParam} render={(propsRoute) => {
    return <>
      <Header />
      <div className="mt-16"></div>
      <Component {...propsRoute}/>
      <Footer />
    </>
  }}/>
}
