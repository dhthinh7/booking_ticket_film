import React from "react";
import { Route } from "react-router-dom";
import Header from "./Layout/Header/Header";

export default function HomeTemplate(props) {
  const { Component, ...restParam } = props;
  console.log("restParam", restParam)

  return <Route {...restParam} render={(propsRoute) => {
    console.log("propsRoute", propsRoute)
    return <>
      <Header />
      <div className="mt-16"></div>
      <Component {...propsRoute}/>
    </>
  }} />
}
