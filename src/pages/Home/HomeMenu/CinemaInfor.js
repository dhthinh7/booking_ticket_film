import { Tabs } from "antd";
import React, { memo, useEffect, useState } from "react";
import { renderLichChieuTheoPhim } from "../../../utils/helperFilm";
import moment from "moment";
const { TabPane } = Tabs;

function CinemaInfor(props) {

  let [tabPositionParent, setTabPositionParent] = useState();

  let listCinemaDetail = props.listCinemaDetail;

  const handleChangeTabPosition = (e) => {
    let screenSize = e.target.innerWidth;
    screenSize <= 768 ? setTabPositionParent('top') : setTabPositionParent('left');
  }

  useEffect(() => {
    window.innerWidth <= 768 ? setTabPositionParent('top') : setTabPositionParent('left');
    window.addEventListener('resize', handleChangeTabPosition);
    return () => window.removeEventListener('resize', handleChangeTabPosition);
  }, [])

  const renderCinemaDetail = () => {
    return listCinemaDetail.map((item, index) => {
      let checkNullCumRap = item.lstCumRap.find(cumRap => cumRap.danhSachPhim.find(filmItem => filmItem.lstLichChieuTheoPhim.find(ngaychieu => moment(ngaychieu.ngayChieuGioChieu) >= moment())));

      return <TabPane tab={<img src={item.logo} className="w-12" alt="xyz" />} key={index} onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/75/75" }}>
        {checkNullCumRap ? <Tabs className="bk-tabChild" tabPosition="left">
          {item.lstCumRap.map((listGroupCinema, index) => {
            // If there is any film that has ngayChieuGioChieu > current time then render them
            let checkDate = listGroupCinema.danhSachPhim.find(filmItem => filmItem.lstLichChieuTheoPhim.find(ngaychieu => moment(ngaychieu.ngayChieuGioChieu) >= moment()));
            return checkDate ? <TabPane tab={
              <div className="bk-cinema-item flex items-center">
                <div className="bk-cinema-logo w-8">
                  <img src={listGroupCinema.hinhAnh} alt={listGroupCinema.tenCumRap} className="w-8 h-8" onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/75/75" }} />
                </div>
                <div className="bk-cinema-infor text-left pl-3">
                  <p className="bk-cinema-name m-0">{listGroupCinema.tenCumRap}</p>
                  <p className="bk-cinema-address m-0">{listGroupCinema.diaChi.slice(0, 40)} {listGroupCinema.diaChi.length > 40 ? <span> ...</span> : ''}</p>
                </div>
              </div>
            } key={index}>
              {listGroupCinema.danhSachPhim.map((filmItem, index) => {
                // Don't show the film that has a date older current
                let checkListFilms = filmItem.lstLichChieuTheoPhim.filter(ngaychieu => moment(ngaychieu.ngayChieuGioChieu) >= moment());
                filmItem = {...filmItem, lstLichChieuTheoPhim: checkListFilms}
                return filmItem.lstLichChieuTheoPhim.length ? <div className="film-item mb-4" key={index}>
                  <div className="film-name flex items-center font-medium mb-2">
                    <img src={filmItem.hinhAnh} alt='xxx' className="w-11 h-11 mr-4"  onError={(e) => { e.target.onerror = null; e.target.src = `https://picsum.photos/id/${index}/75/75`}} />
                    <p className="m-0 text-lg">{filmItem.tenPhim}</p>
                  </div>
                  <div className="show-time max-w-full mx-0">
                    {renderLichChieuTheoPhim(filmItem.lstLichChieuTheoPhim)}
                  </div>
                </div>: ""
              })}
            </TabPane> : ''
          })}
        </Tabs> : 'Hệ thống rạp chưa có phim mới'}
      </TabPane>
    })
  }

  return <div className="bk-cinema mt-3 px-2 py-5">
    <Tabs className="bk-tabParent" tabPosition={tabPositionParent}>
      {renderCinemaDetail()}
    </Tabs>
  </div>;
}

export default memo(CinemaInfor);