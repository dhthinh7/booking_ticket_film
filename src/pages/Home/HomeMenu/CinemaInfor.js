import { Tabs } from "antd";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShowTimeOfFilmAction } from "../../../redux/actions/CinemaAction";
import moment from 'moment';
import { NavLink } from "react-router-dom";
const { TabPane } = Tabs;

function CinemaInfor() {

  const dispacth = useDispatch()
  let { listCinemaDetail } = useSelector(state => state.CinemaReducer)

  useEffect(() => {
    dispacth(getShowTimeOfFilmAction())
  }, [])

  // Render cenema detail from API LayThongTinLichChieuHeThongRap
  const renderCinemaDetail = () => {
    return listCinemaDetail.map((item, index) => {
      return <TabPane tab={<img src={item.logo} className="w-12" />} key={index}>
        <Tabs tabPosition="left">
          {item.lstCumRap.splice(0, 8).map((listGroupCinema, index) => {
            return <TabPane tab={
              <div className="bk-cinema-item flex items-center">
                <div className="bk-cinema-logo w-8">
                  <img src={listGroupCinema.hinhAnh} alt={listGroupCinema.tenCumRap} className="rounded-full w-8 h-8" />
                </div>
                <div className="bk-cinema-infor text-left pl-3">
                  <p className="bk-cinema-name m-0">{listGroupCinema.tenCumRap}</p>
                  <p className="bk-cinema-address m-0">{listGroupCinema.diaChi.slice(0, 40)} {listGroupCinema.diaChi.length > 40 ? <span> ...</span> : ''}</p>
                </div>
              </div>
            } key={index}>
              {listGroupCinema.danhSachPhim.map((filmItem, index) => {
                return <div className="film-item mb-4" key={index}>
                  <div className="film-name flex items-center font-medium mb-2">
                    <img src={filmItem.hinhAnh} alt="xyz" className="w-11 h-11 mr-4" />
                    <p className="m-0 text-lg">{filmItem.tenPhim}</p>
                  </div>
                  <div className="show-time row max-w-full mx-0">
                    {filmItem.lstLichChieuTheoPhim.splice(0, 10).map((showTimeItem, index) => {
                      return <div key={index} className="show-timeItem col-3 p-0 ">
                        <div className="m-1 py-1 px-1 bg-gray-200 text-center rounded hover:text-red-500 hover:duration-300">
                          <NavLink className="text-green-600" to={`/checkout/${showTimeItem.maLichChieu}`}>{moment(showTimeItem.ngayChieuGioChieu).format("hh:mm:A")}</NavLink>
                        </div>
                      </div>
                    })}
                  </div>
                </div>
              })}
            </TabPane>
          })}
        </Tabs>
      </TabPane>
    })
  }

  return <div className="bk-cinema mt-3 container px-2 py-5 mx-auto w-4/6">
    <Tabs tabPosition="left">
      {renderCinemaDetail()}
    </Tabs>
  </div>;
}

export default memo(CinemaInfor);