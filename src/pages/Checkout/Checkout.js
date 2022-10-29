import { Tabs } from "antd";
import { CheckOutlined, CloseOutlined, UserOutlined, SmileOutlined, HomeOutlined } from '@ant-design/icons'
import React, { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import _ from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import history from '../../App'
import { TOKEN, USER_LOGIN } from "../../utils/config";
import './Style.scss';
import { datVeAction, layDanhSachPhongVeAction } from "../../redux/actions/BookingTicketActions";
import { BOOKING_TICKET } from "../../redux/types/Type";

const { TabPane } = Tabs

export default function Checkout(props) {

  const dispatch = useDispatch();
  let { userLogin } = useSelector(state => state.UserManageReducer);
  let { chiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.BookingTicketReducer);


  useEffect(() => {
    dispatch(layDanhSachPhongVeAction(props.match.params.id));
  }, [])

  const operations = <Fragment>
    {!_.isEmpty(userLogin) ?
      <div className="flex justify-center items-center">
        <button className="flex justify-center items-center focus: outline-none" onClick={() => {
          history.push('/')
        }}>
          <div style={{ width: 40, height: 40 }} className="text-2xl mr-1 rounded-full bg-red-200 leading-8">
            {userLogin.taiKhoan.substr(0, 1)}
          </div>
          <div className="font-medium text-green-500">Hello ! {userLogin.taiKhoan}</div>
        </button>
        <span className="mx-2">|</span>
        <button onClick={() => {
          localStorage.removeItem(USER_LOGIN);
          localStorage.removeItem(TOKEN);
          history.push('/home');
          window.location.reload();
        }} className="text-blue-800 font-medium">Đăng xuất</button>
      </div> : ''}
  </Fragment>

  return <div className="m-5 relative">
    <Tabs defaultActiveKey="1">
      <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1" >
        <BookingTicket {...props} chiTietPhongVe={chiTietPhongVe} userLogin={userLogin} danhSachGheDangDat={danhSachGheDangDat} />
      </TabPane>
      <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
        02 KẾT QUẢ ĐẶT VÉ
      </TabPane>
    </Tabs>
    <div className="absolute right-0 top-0">
      {operations}
    </div>
  </div>
}

const BookingTicket = (props) => {
  const dispatch = useDispatch();
  const { danhSachGhe, thongTinPhim } = props.chiTietPhongVe;
  const { danhSachGheDangDat } = props
  const { userLogin } = props;
  console.log("chiTietPhongVe children", props.chiTietPhongVe)

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
      // let indexGheKD = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe);
      // if (indexGheKD !== -1) {
      //   classGheKhachDat = 'gheKhachDat';
      // }
      if (userLogin?.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = 'gheDaDuocDat';
      }

      if (indexGheDD !== -1) {
        classGheDaDat = 'gheDangDat';
      }

      return <Fragment key={index}>
        <button onClick={() => {
          // const action = datGheAction(ghe, props.match.params.id);
          dispatch({
            type: BOOKING_TICKET,
            gheDuocChon: ghe
          });

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
