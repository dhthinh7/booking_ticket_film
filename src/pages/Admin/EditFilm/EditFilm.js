import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { editUpdatedAction, getFilmInformationAction } from '../../../redux/actions/FilmMangeAction';
import { GROUP } from '../../../utils/config';

const { Item } = Form;

const Edit = (props) => {
  const [componentSize, setComponentSize] = useState('default');
  const { filmInformation } = useSelector(state => state.FilmManageReducer);
  const [imgSrc, setImgSrc] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilmInformationAction(props.match.params.id));
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: filmInformation.maPhim,
      dangChieu: filmInformation.dangChieu,
      sapChieu: filmInformation.sapChieu,
      hot: filmInformation.hot,
      danhGia: filmInformation.danhGia,
      tenPhim: filmInformation.tenPhim,
      trailer: filmInformation.trailer,
      moTa: filmInformation.moTa,
      maNhom: GROUP,
      ngayKhoiChieu: filmInformation.ngayKhoiChieu,
      hinhAnh: null
    },

    onSubmit: (values) => {
      values.maNhom = GROUP;
      // Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== 'hinhAnh') {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append('File', values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      //Cập nhật phim upload hình
      dispatch(editUpdatedAction(formData));
    }
  })

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
  }

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    }
  }

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    }
  }

  const handleChangeFile = async (e) => {
    // Lấy file ra từ e
    let file = e.target.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
      // Đem dữ liệu file lưu vào formik
      await formik.setFieldValue('hinhAnh', file);
      // Tạo đối tượng để đọc file và render lên giao diện
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result); //Hình base 64
      }
      // setImgSrc(URL.createObjectURL(file))
    }
  }

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <h3>Thêm mới phim </h3>
        <Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Item>
        <Item label="Tên phim">
          <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
        </Item>
        <Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} />
        </Item>
        <Item label="Mô tả">
          <Input name="moTa" onChange={formik.handleChange} value={formik.values.moTa} />
        </Item>
        <Item label="Ngày khởi chiếu">
          <DatePicker onChange={handleChangeDatePicker} format="DD/MM/YYYY" value={moment(formik.values.ngayKhoiChieu)} allowClear={false}/>
        </Item>
        <Item label="Đang chiếu">
          <Switch name="dangChieu" onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
        </Item>
        <Item label="Sắp chiếu">
          <Switch name="sapChieu" onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
        </Item>
        <Item label="Hot">
          <Switch name="hot" onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
        </Item>
        <Item label="Số sao">
          <InputNumber onChange={handleChangeInputNumber('danhGia')} value={formik.values.danhGia} />
        </Item>
        <Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
          <br />
          <img width={100} height={100} src={imgSrc === '' ? filmInformation.hinhAnh : imgSrc} alt='xyz'/>
        </Item>
        <Item label="Button">
          <button type="submit" className="bg-blue-300 text-white p-2 hover:bg-blue-600 hover: duration-500">Cập nhật</button>
        </Item>
      </Form>
    </>
  );
};



export default Edit;



