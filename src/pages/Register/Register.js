import React from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { regExPhone } from '../../utils/config';
import { withFormik } from 'formik';
import { userRegisterAction } from '../../redux/actions/UserManageAction';
function Register(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="container" style={{ height: window.innerHeight }} >
      <div className="d-flex flex-column justify-content-center align-items-center w-1/4 mx-auto" style={{ height: '100%' }} >
        <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>Create Account</h3>
        <div className="d-flex mt-3 w-full" >
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="taiKhoan" size="large" placeholder="Tài khoản" prefix={<UserOutlined />} />
        </div>
        <div className="text-danger">{errors.taiKhoan}</div>

        <div className="d-flex mt-3 w-full" >
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="hoTen" size="large" placeholder="Họ tên" prefix={<UserOutlined />} />
        </div>
        <div className="text-danger">{errors.hoTen}</div>

        <div className="d-flex mt-3 w-full">
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="phoneNumber" name="soDt" size="large" placeholder="Số điện thoại" prefix={<PhoneOutlined />} />
        </div>
        <div className="text-danger">{errors.soDt}</div>

        <div className="d-flex mt-3 w-full">
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="password" name="matKhau" size="large" placeholder="Mật khẩu" prefix={<LockOutlined />} />
        </div>
        <div className="text-danger">{errors.matKhau}</div>

        <div className="d-flex mt-3 w-full">
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="password" name="matKhauConfirm" size="large" placeholder="Nhập lại mật khẩu" prefix={<LockOutlined />} />
        </div>
        <div className="text-danger">{errors.matKhauConfirm}</div>

        <div className="d-flex mt-3 w-full" >
          <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="email" size="large" placeholder="Email" prefix={<MailOutlined />} />
        </div>
        <div className="text-danger text-left">{errors.email}</div>

        <div className="flex justify-between w-full">
          <Button htmlType="submit" size="large" style={{ minWidth: '100%', backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className="mt-5 border-0">Signup</Button>
        </div>
        <NavLink to="/login">Back to login <i className="fa fa-long-arrow-alt-left mt-3"></i></NavLink>
      </div>
    </form>
  )
}

const RegisterWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    taiKhoan: '',
    hoTen: '',
    soDt: '',
    matKhau: '',
    matKhauConfirm: '',
    email: '',
  }),
  validationSchema: Yup.object().shape({
    taiKhoan: Yup.string().required('Tài khoản is required'),
    hoTen: Yup.string().required('Name is required!'),
    soDt: Yup.string().required('Phone number is required!').matches(regExPhone, 'The phone number has wrong format').max(10, '10 digits'),
    matKhau: Yup.string().required().min(6, 'Password must have min 6 characters').max(32, 'Password  have max 32 characters'),
    matKhauConfirm: Yup.string().required('Re-confirmation is required').oneOf([Yup.ref('matKhau'), null], 'Passwords must match'),
    email: Yup.string().required('Email is required!').email('Email is invalid!')
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(userRegisterAction(values));
  },
  validateOnBlur: false,
  displayName: 'RegisterWithFormik',
})(Register);

export default connect()(RegisterWithFormik);