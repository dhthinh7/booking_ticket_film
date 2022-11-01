import React, { useState } from "react";
import { useSelector } from "react-redux";
import './Loading.scss';

export default function Loading() {
  let isVisible = useSelector(state => state.LoadingReducer.isVisible);

  return isVisible ? 
    <div className="wave-loading-bg">
      <div className="wave-loading"></div>
    </div> : ''
}