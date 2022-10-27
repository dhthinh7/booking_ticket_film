import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShowTimeOfFilmAction } from "../../../redux/actions/CinemaAction";
const { TabPane } = Tabs;

export default function CinemaInfor() {

  const dispacth = useDispatch()
  let { listCinemaDetail } = useSelector(state => state.CinemaReducer)
  console.log(listCinemaDetail)

  useEffect(() => {
    dispacth(getShowTimeOfFilmAction)
  }, [])

  const renderCinemaDetail = () => {
    return listCinemaDetail.map((item, index) => {
      return <TabPane tab={<img src={item.logo} className="w-12" />} key={index}>
        <Tabs tabPosition="left">
          {item.lstCumRap.map((listGroupCinema, index) => {
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
            } key={index}>Child tab 1</TabPane>
          })}

        </Tabs>
      </TabPane>
    })
  }


  return <div className="bk-cinema mt-3 container px-5 py-5 mx-auto w-4/6">
    <Tabs tabPosition="left">
      {renderCinemaDetail()}
      {/* <TabPane tab="Tab 1" key="1">
        <Tabs tabPosition="left">
          <TabPane tab="Child Tab 1" key="1">Child tab 1</TabPane>
          <TabPane tab="Child Tab 1_2" key="2">Child tab 1_2</TabPane>
        </Tabs>
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        <Tabs tabPosition="left">
          <TabPane tab="Child Tab 2" key="2">Child tab 2</TabPane>
          <TabPane tab="Child Tab 2_3" key="3">Child tab 3</TabPane>
        </Tabs>
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        <Tabs tabPosition="left">
          <TabPane tab="Child Tab 3" key="3">Child tab 3</TabPane>
        </Tabs>
      </TabPane> */}
    </Tabs>
  </div>;
}
