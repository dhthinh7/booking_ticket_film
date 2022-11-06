import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux';

export default function Footer(props) {

  const { listCinemaDetail } = useSelector(state => state.CinemaReducer);
  const arrHeThongRap = _.map(listCinemaDetail, (heThongRap) => _.pick(heThongRap, ['maHeThongRap', 'tenHeThongRap', 'logo']));
  return (
    <footer className="" style={{ backgroundColor: "#222222" }}>
      <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50 mt-3 container px-5 py-5 mx-auto w-4/6">
        <div className="grid grid-cols-1">
          <div className="col-span-12 text-center md:col-span-12 justify-center">
            <p className="pb-1 text-lg font-medium text-white">PARTNER</p>
            <div className="grid grid-cols-3 justify-center" style={{ color: '#fff' }}>
              {arrHeThongRap.map((htr, index) => {
                return <div key={index} className="flex justify-center">
                  <img src={htr.logo} style={{ width: 50 }} alt="xyz" />
                </div>
              })}
            </div>
          </div>
        </div>
        <div className="grid justify-center pt-6 lg:justify-between text-white">
          <div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
            <span>©2021 All rights reserved</span>
          </div>
          <div className="">
          </div>
        </div>
      </div>
    </footer>
  )
}
