import { NavLink } from "react-router-dom";
import moment from 'moment';

export const renderLichChieuTheoPhim = (listLichChieu) => {

  let showTimeArranged = listLichChieu.reduce((result, current, index) => {
    return !Object.keys(result).includes(current.ngayChieuGioChieu.slice(0, 10)) ? { ...result, [current.ngayChieuGioChieu.slice(0, 10)]: [current] } : { ...result, [current.ngayChieuGioChieu.slice(0, 10)]: [...result[current.ngayChieuGioChieu.slice(0, 10)], current] }
  }, {})

  return Object.keys(showTimeArranged).map((item, index) => {
    let dayOfWeek = moment(item).format("E")
    dayOfWeek = dayOfWeek === '1' ? 'Chủ nhật' : 'Thứ ' + dayOfWeek
    return <div key={index}>
      <div className="text-black-600 font-medium">{dayOfWeek} {moment(item).format("LL")}:</div>
      <div className="show-timeItem flex gap-1 flex-wrap px-2">
        {showTimeArranged[item].map((film, index) => {
          return <div key={index} className="m-1 py-1 px-3 bg-gray-200 text-center rounded hover:text-red-500 hover:duration-300">
            <NavLink className="text-green-600" to={`/checkout/${film.maLichChieu}`}>{moment(film.ngayChieuGioChieu).format("hh:mm:A")}</NavLink>
          </div>
        })}
      </div>
    </div>
  });
}