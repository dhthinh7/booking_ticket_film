import React, { useEffect } from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import { connect, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withFormik } from 'formik';
import { GROUP, regExPhone } from '../../../../utils/config';
import { addNewUserAction, editUserAction, getListTyeOfUserAction } from '../../../../redux/actions/UserManageAction';
import { CHANGE_TAB_ACTIVE_ADMIN_TEMPLATE, HIDE_LOADING, SHOW_LOADING } from '../../../../redux/types/Type';
import { history } from '../../../..';
import './AddNewUser.scss';

function AddNewUser(props) {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListTyeOfUserAction());
  }, []);

  const handleSelection = () => {
    return props.listTypeOfUser?.map((item, index) => {

      return <option key={index} value={item.maLoaiNguoiDung}>{item.tenLoai}</option>
    })
  }

  return (
    <div className="bk-userAdd">
      <h3 className="bk-userAdd--title text-4xl">Thêm người dùng mới</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="bk-userAdd-form" style={{ height: window.innerHeight }} >
        <div className="bk-form-content">
          <div className="item-right">
            <div className="bk-form-item d-flex mt-3 w-full">
              <Input onChange={handleChange} name="taiKhoan" size="large" placeholder="Tài khoản" prefix={<UserOutlined />} />
            </div>
            <div className="text-danger h-5">{errors.taiKhoan}</div>

            <div className="bk-form-item mt-3 w-full" >
              <Input onChange={handleChange} name="hoTen" size="large" placeholder="Họ tên" prefix={<UserOutlined />} />
            </div>
            <div className="text-danger h-5">{errors.hoTen}</div>

            <div className="bk-form-item mt-3 w-full">
              <Input onChange={handleChange} type="phoneNumber" name="soDt" size="large" placeholder="Số điện thoại" prefix={<PhoneOutlined />} />
            </div>
            <div className="text-danger h-5">{errors.soDt}</div>

            <select className="mt-3 w-full form-control" name='maLoaiNguoiDung' onChange={handleChange}>
              {handleSelection()}
            </select>
            <div className="text-danger h-5">{errors.maLoaiNguoiDung}</div>

          </div>

          <div className="item-left">
            <div className="bk-form-item mt-3 w-full">
              <Input onChange={handleChange} type="password" name="matKhau" size="large" placeholder="Nhập mật khẩu" prefix={<LockOutlined />} />
            </div>
            <div className="text-danger h-5">{errors.matKhau}</div>

            <div className="bk-form-item mt-3 w-full">
              <Input onChange={handleChange} type="password" name="matKhauConfirm" size="large" placeholder="Nhập lại mật khẩu để xác nhận" prefix={<LockOutlined />} />
            </div>
            <div className="text-danger h-5">{errors.matKhauConfirm}</div>

            <div className="bk-form-item mt-3 w-full" >
              <Input onChange={handleChange} name="email" size="large" placeholder="Email" prefix={<MailOutlined />} />
            </div>
            <div className="text-danger h-5 text-left">{errors.email}</div>

            <div className="bk-addBtn mt-7">
              <Button className='mr-3' onClick={handleSubmit}>Submit</Button>
              <Button onClick={() => {
                dispatch({ type: SHOW_LOADING });
                history.push('/admin/users')
                dispatch({type: CHANGE_TAB_ACTIVE_ADMIN_TEMPLATE, selectedKeys: '/admin/users'})
                setTimeout(() => {
                  dispatch({ type: HIDE_LOADING });
                }, 300)
              }}>Cancel</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const AddNewUserFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return { ...props.accountUser, maNhom: GROUP }
  },
  validationSchema: (props) => Yup.object().shape({
    taiKhoan: Yup.string().required('Tài khoản không được để trống'),
    hoTen: Yup.string().required('Tên không được để trống'),
    soDt: Yup.string().required('SDT không được để trống').matches(regExPhone, 'SDT không đúng').max(10, '10 digits'),
    matKhau: Yup.string().required().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').max(32, 'Mật khẩu không được quá 32 ký tự'),
    matKhauConfirm: Yup.string().required().required('Mật khẩu cũ không được để trống').oneOf([Yup.ref('matKhau'), null], 'Mật khẩu không khớp'),
    email: Yup.string().required('Email không được để trống').email('Email không hợp lệ')
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(addNewUserAction(values));
  },
  validateOnBlur: false,
  displayName: 'EditUserFormik',
})(AddNewUser);

const mapStateToProps = (state) => {
  return {
    accountUser: state.UserManageReducer.accountUser,
    listTypeOfUser: state.UserManageReducer.listTypeOfUser
  }
}

export default connect(mapStateToProps)(AddNewUserFormik);