import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux';
import './Footer.scss';

export default function Footer(props) {

  const { listCinemaDetail } = useSelector(state => state.CinemaReducer);
  const arrHeThongRap = _.map(listCinemaDetail, (heThongRap) => _.pick(heThongRap, ['maHeThongRap', 'tenHeThongRap', 'logo']));
  return (
    <footer className="bk-footer" style={{ backgroundColor: "#222222" }}>
      <div className="bk-content">
        <p className="bk-footer-tittle pb-1 text-lg font-medium text-white">PARTNER</p>
        <div className="bk-icons">
          {arrHeThongRap.map((htr, index) => {
            return <div key={index} className="bk-icon">
              <div key={index} className="flex justify-center">
                <img src={htr.logo} alt="xyz" />
              </div>
            </div>
          })}
        </div>
        <div className="bk-text">
          <span>©2021 All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}
