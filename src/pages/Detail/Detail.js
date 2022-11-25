import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinLichChieuPhimAction } from "../../redux/actions/CinemaAction";
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import moment from 'moment';
import { Rate, Tabs } from "antd";
import { NavLink } from "react-router-dom";
import { renderLichChieuTheoPhim } from "../../utils/helperFilm";
import './Detail.scss';
import { remove } from "lodash";
const { TabPane } = Tabs;

export default function Detail(props) {
  const dispatch = useDispatch();
  let [tabPositionChild, setTabPositionChild] = useState();

  let { filmDetail } = useSelector(state => state.CinemaReducer);

  useEffect(() => {
    dispatch(layThongTinLichChieuPhimAction(props.match.params.id));
  }, [])

  const handleSetTabPosition = (e) => {
    const screenSize = e.target.innerWidth;
    screenSize <= 768 ? setTabPositionChild('top') : setTabPositionChild('left');
  }

  useEffect(() => {
    window.innerWidth <= 768 ? setTabPositionChild('top') : setTabPositionChild('left');
    window.addEventListener('resize', handleSetTabPosition);
    return () => window.removeEventListener('resize', handleSetTabPosition);
  }, []);

  window.scrollTo(0, 0);

  const isExistSchedule = () => {
    return filmDetail.heThongRapChieu?.find(heThongRap => heThongRap.cumRapChieu.find(cumRap => cumRap.lichChieuPhim.find(ngaychieu => moment(ngaychieu.ngayChieuGioChieu) >= moment())))
  }

  return <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundSize: '100%', backgroundPosition: 'center', minHeight: '100vh' }}>
    <CustomCard
      style={{ paddingTop: 150, minHeight: '100vh', backgroundColor: '#0000005c' }}
      effectColor="#0000005c" // required
      color="#fff" // default color is white
      blur={10} // default blur value is 10px
      borderRadius={0} // default border radius value is 10px
      className="bk-detail"
    >
      <div className="bk-top">
        <div className="bk-img" style={{ backgroundImage: `url(${filmDetail.hinhAnh})` }}>
        </div>
        <div className="bk-text">
          <p className="text-sm">Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
          <p className="text-4xl">{filmDetail.tenPhim}</p>
          <p>{filmDetail.moTa}</p>
        </div>
        <div className="bk-circle">
          <h1 >Đánh giá</h1>
          <h1 className="text-green-400 text-2xl"><Rate allowHalf value={filmDetail.danhGia / 2} style={{ color: '#78ed78', fontSize: 30 }} /></h1>
          <div className={`c100 p${filmDetail.danhGia * 10} big`}>
            <span className="text-white">
              {filmDetail.danhGia * 10}%
            </span>
            <div className="slice">
              <div className="bar"></div>
              <div className="fill"></div>
            </div>
          </div>
          <br />
        </div>
      </div>
      {/* Tab show time */}
      <div className="bk-tabs" >
        <Tabs defaultActiveKey="1" centered >
          <TabPane className="bk-showtime" tab="Lịch chiếu" key="1" style={{ minHeight: 300 }}>
            {isExistSchedule() ?
              <Tabs tabPosition={tabPositionChild}>
                {filmDetail.heThongRapChieu?.map((htr, index) => {
                  // Check htr is null or not null
                  let checkNullCumRap = htr.cumRapChieu?.find(cumRap => cumRap.lichChieuPhim.find(ngaychieu => moment(ngaychieu.ngayChieuGioChieu) >= moment()))
                  return checkNullCumRap ? <TabPane
                    tab={<div className="flex flex-row items-center justify-center">
                      <img src={htr.logo} className="rounded-full w-full" style={{ width: 50 }} alt="..." onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50` }} />
                      {tabPositionChild === 'left' ? <div className="text-center ml-2">
                        {htr.tenHeThongRap}
                      </div> : ''}
                    </div>}
                    key={index}>
                    {htr.cumRapChieu?.map((cumRap, index) => {
                      // Don't show the film that has a date older current
                      let checkListFilms = cumRap.lichChieuPhim.filter(ngaychieu => moment(ngaychieu.ngayChieuGioChieu) >= moment());
                      cumRap = { ...cumRap, lichChieuPhim: checkListFilms }
                      return cumRap.lichChieuPhim.length > 0 ? <div className="mt-3" key={index}>
                        <div className="bk-tabPaneInfor flex flex-row">
                          <img style={{ width: 60, height: 60 }} src={cumRap.hinhAnh} alt="..." />
                          <div className="bk-tabPaneText ml-2">
                            <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }} >{cumRap.tenCumRap}</p>
                            <p className="text-gray-400">{cumRap.diaChi}</p>
                          </div>
                        </div>
                        <div className="thong-tin-lich-chieu">
                          {renderLichChieuTheoPhim(cumRap.lichChieuPhim)}
                        </div>
                      </div> : ''
                    })}
                  </TabPane> : ''
                })}
              </Tabs> : <div className="bk-showTimeIsNull">Phim chưa có lịch chiếu</div>}
          </TabPane>
          <TabPane className="bk-showtime" tab="Thông tin" key="2" style={{ minHeight: 300 }}>
            <div className="bk-showTimeIsNull">Chưa hổ trợ tính năng này</div>
          </TabPane>
          <TabPane className="bk-showtime" tab="Đánh giá" key="3" style={{ minHeight: 300 }}>
            <div className="bk-showTimeIsNull">Chưa hổ trợ tính năng này</div>
          </TabPane>
        </Tabs>
      </div>
    </CustomCard>

  </div>
}
