import { Button, DatePicker, Form, InputNumber, Select } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInforCinemaAction, getInforGroupOfCinemaAction } from "../../../redux/actions/CinemaAction";
import moment from 'moment';
import { taoLichChieuAction } from "../../../redux/actions/BookingTicketActions";

export default function ShowTime(props) {
  
  let film = {};
  const dispatch = useDispatch();

  let { listCinema } = useSelector(state => state.CinemaReducer);
  let { groupOfCinema } = useSelector(state => state.CinemaReducer);

  useEffect(()=>{
    dispatch(getInforCinemaAction());
  }, [])

  if (localStorage.getItem('filmParams')) {
    film = JSON.parse(localStorage.getItem('filmParams'));
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: ''
    },
    onSubmit: (values) => {
      dispatch(taoLichChieuAction(values));
    }
  })

  // Create option to choose HTR
  const convertSelectHTR = () => {
    return listCinema.map((item) => {
      return {label: item.tenHeThongRap, value: item.maHeThongRap}
    })
  }

  
  const handleChangeHeThongRap = (value) => {
    dispatch(getInforGroupOfCinemaAction(value));
  }
  
  const handleChangeCumRapOptions = () => {
    return groupOfCinema.length && groupOfCinema.map((item) => {
      return {label: item.tenCumRap, value: item.maCumRap}
    })
  }
  
  const handleChangeCumRap = (value) => {
    formik.setFieldValue('maRap', value);
  }
  
  const onChangeDate = (value) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))
  }

  const onchangeInputNumber = (value) => {
    formik.setFieldValue('giaVe', value)
  }

  return (
    <div className="container flex justify-around">
      <div className="image">
        <h3 className="text-2xl">Tạo lịch chiếu - {props.match.params.name}</h3>
        <img src={film.hinhAnh} alt='...' width={200} height={100}/>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onSubmitCapture={formik.handleSubmit}
        style={{maxWidth: '50%', flex: '0 0 50%'}}
      >
        <Form.Item label="Hệ thống rạp">
          <Select options={convertSelectHTR()} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
        </Form.Item>
        <Form.Item label="Cụm rạp">
          <Select options={handleChangeCumRapOptions()} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
        </Form.Item>
        <Form.Item label="Ngày chiếu giờ chiếu">
          <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate}/>
        </Form.Item>
        <Form.Item label="Giá vé">
          <InputNumber step={1000} onChange={onchangeInputNumber} />
        </Form.Item>
        <Form.Item label="Chức năng">
          <Button htmlType="submit">Tạo lịch chiếu</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
