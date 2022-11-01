import { Tabs } from "antd";
import { CheckOutlined, CloseOutlined, UserOutlined, SmileOutlined, HomeOutlined } from '@ant-design/icons'
import React, { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import _ from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import history from '../../App'
import { TOKEN, USER_LOGIN } from "../../utils/config";
import './Style.scss';
import { datGheAction, datVeAction, layDanhSachPhongVeAction } from "../../redux/actions/BookingTicketActions";
import { BOOKING_TICKET, CHANGE_TAB_ACTIVE, GET_SEAT_OTHER_USER } from "../../redux/types/Type";
import { connection } from "../..";
import { accountInformationAction } from "../../redux/actions/UserManageAction";
import moment from 'moment';
import AccountDisplay from "../../components/AccountDisplay/AccountDisplay";

const { TabPane } = Tabs

export default function Checkout(props) {

  const dispatch = useDispatch();
  let { userLogin } = useSelector(state => state.UserManageReducer);
  let { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat, tabActive } = useSelector(state => state.BookingTicketReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(layDanhSachPhongVeAction(props.match.params.id, true));
  }, [])

  return <div className="m-5 relative">
    <Tabs defaultActiveKey="1" activeKey={tabActive} onChange={(key) => {
      dispatch({
        type: CHANGE_TAB_ACTIVE,
        number: key.toString()
      })
    }}>
      <TabPane tab={<div className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <NavLink to="/"><HomeOutlined style={{ marginLeft: 10, fontSize: 25 }} /></NavLink></div>} key="3">
      </TabPane>
      <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1" >
        <BookingTicket {...props} chiTietPhongVe={chiTietPhongVe} userLogin={userLogin} danhSachGheDangDat={danhSachGheDangDat} danhSachGheKhachDat={danhSachGheKhachDat} />
      </TabPane>
      <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
        <HistoryBooking {...props} />
      </TabPane>
    </Tabs>
    <div className="absolute right-0 top-0">
      <AccountDisplay />
    </div>
  </div>
}

const BookingTicket = (props) => {
  const dispatch = useDispatch();
  const { danhSachGhe, thongTinPhim } = props.chiTietPhongVe;
  const { danhSachGheDangDat, danhSachGheKhachDat } = props
  const { userLogin } = props;

  useEffect(() => {
    //Vừa vào trang load tất cả ghế của các người khác đang đặt
    connection.invoke('loadDanhSachGhe', props.match.params.id);

    // Có 1 client nào thực hiện việc đặt vé thành công mình sẽ load lại danh sách phòng vé của lịch chiếu đó
    connection.on('datVeThanhCong', () => {
      dispatch(layDanhSachPhongVeAction(props.match.params.id, false));
    })

    connection.on('loadDanhSachGheDaDat', (dsGheKhachDat) => {
      //Bước 1: Loại mình ra khỏi danh sách
      dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan);

      //Bước 2: Gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung 
      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);

        return [...result, ...arrGhe];
      }, []);

      // Đưa dữ liệu ghế khách đặt cập nhật redux
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, 'maGhe');

      // Đưa dữ liệu ghế khách đặt về redux
      dispatch({
        type: GET_SEAT_OTHER_USER,
        arrGheKhachDat
      })
    })

    // Cài đặt sự kiện khi reload trang
    window.addEventListener("beforeunload", clearGhe);

    return () => {
      // clearGhe();
      window.removeEventListener('beforeunload', clearGhe);
    }
  }, [])

  const clearGhe = function (event) {
    connection.invoke('huyDat', userLogin.taiKhoan, props.match.params.id);
  }

  const renderSeats = () => {
    return danhSachGhe?.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
      let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
      let classGheDangDat = '';
      let classGheKhachDat = '';
      let classGheDaDuocDat = '';
      //Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
      let indexGheDD = danhSachGheDangDat?.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);

      //Kiểm tra từng render xem có phải ghế khách đặt hay không
      let indexGheKD = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe);
      if (indexGheKD !== -1) {
        classGheKhachDat = 'gheKhachDat';
      }

      if (userLogin?.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = 'gheDaDuocDat';
      }

      if (indexGheDD !== -1) {
        classGheDaDat = 'gheDangDat';
      }

      return <Fragment key={index}>
        <button onClick={() => {
          dispatch(datGheAction(ghe, props.match.params.id));
        }} disabled={ghe.daDat || classGheKhachDat !== ''} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat} text-center`} key={index}>
          {ghe.daDat ? classGheDaDuocDat !== '' ? <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : <CloseOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : classGheKhachDat !== '' ? <SmileOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : ghe.stt}
        </button>

        {(index + 1) % 16 === 0 ? <br /> : ''}

      </Fragment>
    })
  }
  return <div className="bk-area min-h-screen">
    <div className="grid grid-cols-12">
      <div className="col-span-9">
        <div className="flex flex-col items-center mt-2">
          <div className="bg-black " style={{ width: '85%', height: 15 }}>
          </div>
          <div className="bk-screen text-center">
            <h3 className="mt-2 text-black text-lg">Màn hình</h3>
          </div>
          {/* Seat render */}
          <div>
            {renderSeats()}
          </div>
        </div>
        {/* Render seat information note */}
        <div className="mt-5 flex justify-center">
          <table className=" divide-y divide-gray-200 w-2/3">
            <thead className="bg-gray-50 p-5">
              <tr>
                <th>Ghế chưa đặt</th>
                <th>Ghế đang đặt</th>
                <th>Ghế vip</th>
                <th>Ghế đã đặt</th>
                <th>Ghế mình đặt</th>
                <th>Ghế khách đang đặt</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td><button className="ghe text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                <td><button className="ghe gheDangDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button> </td>
                <td><button className="ghe gheVip text-center"><CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button> </td>
                <td><button className="ghe gheDaDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                <td><button className="ghe gheDaDuocDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                <td><button className="ghe gheKhachDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-span-3">
        <h3 className="text-green-400 text-center text-4xl"> {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
          return tongTien += ghe.giaVe;
        }, 0).toLocaleString()} đ</h3>
        <hr />
        <h3 className="text-xl mt-2">{thongTinPhim?.tenPhim}</h3>
        <p>Địa điểm: {thongTinPhim?.tenCumRap} - {thongTinPhim?.tenRap}</p>
        <p>Ngày chiếu: {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}</p>
        <hr />
        <div className="flex flex-row my-3">
          <div className="w-4/5">
            <span className="text-red-400 text-lg">Ghế</span>

            {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
              return <span key={index} className="text-green-500 text-xl"> {gheDD.stt}</span>
            })}
          </div>
          <div className="text-right col-span-1">
            <span className="text-green-800 text-lg">
              {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                return tongTien += ghe.giaVe;
              }, 0).toLocaleString()}
            </span>
          </div>
        </div>
        <hr />
        <div className="my-3">
          <i>Email</i> <br />
          {userLogin.email}
        </div>
        <hr />
        <div className="my-3">
          <i>Phone</i> <br />
          {userLogin.soDT}
        </div>
        <hr />
        <div className="my-3 h-full flex flex-col items-center" style={{ marginBottom: 0 }}>
          <div onClick={() => {
            dispatch(datVeAction({
              maLichChieu: props.match.params.id,
              danhSachVe: danhSachGheDangDat
            }));

          }} className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer">
            ĐẶT VÉ
          </div>
        </div>
      </div>
    </div>
  </div>
}

const HistoryBooking = (props) => {
  let { accountInformation } = useSelector(state => state.UserManageReducer);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(accountInformationAction())
  }, []);

  const renderTicketItem = () => {
    return accountInformation.thongTinDatVe?.map((thongTinDatVeItem, index) => {
      const seats = _.first(thongTinDatVeItem.danhSachGhe);

      return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={thongTinDatVeItem.hinhAnh} />
          <div className="flex-grow">
            <h2 className="text-pink-500 title-font font-medium text-2xl">{thongTinDatVeItem.tenPhim}</h2>
            <p className="text-gray-500"><span className="font-bold">Giờ chiếu:</span> {moment(thongTinDatVeItem.ngayDat).format('hh:mm A')} - <span className="font-bold">Ngày chiếu:</span>{moment(thongTinDatVeItem.ngayDat).format('DD-MM-YYYY')} .</p>
            <p><span className="font-bold">Địa điểm: </span>{seats.tenHeThongRap}  </p>
            <p>
              <span className="font-bold">Tên rạp: </span>{seats.tenCumRap} - <span className="font-bold">Ghế:</span>  {thongTinDatVeItem.danhSachGhe.map((ghe, index) => { return <span className="text-green-500 text-xl" key={index}> [ {ghe.tenGhe} ] </span> })}
            </p>
          </div>
        </div>
      </div>
    })
  }

  return <section className="text-gray-600 body-font">
  <div className="container px-5 py-3 mx-auto">
    <div className="flex flex-col text-center w-full mb-5">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4  text-purple-600 ">Lịch sử đặt vé khách hàng</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy xem thông tin địa và thời gian để xem phim vui vẻ bạn nhé !</p>
    </div>
    <div className="flex flex-wrap -m-2">
      {renderTicketItem()}
    </div>
  </div>
</section>
}