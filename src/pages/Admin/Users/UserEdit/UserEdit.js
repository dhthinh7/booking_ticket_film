import React, { useEffect } from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import { connect, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withFormik } from 'formik';
import { GROUP, regExPhone } from '../../../../utils/config';
import { editUserAction, getListTyeOfUserAction } from '../../../../redux/actions/UserManageAction';
import { HIDE_LOADING, SHOW_LOADING } from '../../../../redux/types/Type';
import { history } from '../../../..';

function UserEdit(props) {
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
    <>
      <h3 className="text-4xl">Cập nhật thông tin người dùng</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="container" style={{ height: window.innerHeight }} >
        <div className="flex justify-around align-items-start w-4/5 mx-auto" style={{ height: '100%' }} >
          <div className="item-right" style={{ minWidth: '40%' }}>
            <div className="d-flex mt-3 w-full" >
              <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="taiKhoan" size="large" placeholder="Tài khoản" value={values.taiKhoan} prefix={<UserOutlined />} />
            </div>
            <div className="text-danger h-5">{errors.taiKhoan}</div>

            <div className="mt-3 w-full" >
              <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="hoTen" size="large" placeholder="Họ tên" value={values.hoTen} prefix={<UserOutlined />} />
            </div>
            <div className="text-danger h-5">{errors.hoTen}</div>

            <div className="mt-3 w-full">
              <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="phoneNumber" name="soDt" size="large" value={values.soDt} placeholder="Số điện thoại" prefix={<PhoneOutlined />} />
            </div>
            <div className="text-danger h-5">{errors.soDt}</div>

            <select className="mt-3 w-full form-control" name='maLoaiNguoiDung' value={values.maLoaiNguoiDung} onChange={handleChange}>
              {handleSelection()}
            </select>
            <div className="text-danger h-5">{errors.soDt}</div>

          </div>

          <div className="item-left" style={{ minWidth: '40%' }}>
            <div className="mt-3 w-full">
              <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="password" name="matKhauCu" size="large" placeholder="Mật khẩu cũ" prefix={<LockOutlined />} />
            </div>
            <div className="text-danger h-5">{errors.matKhauCu}</div>

            <div className="mt-3 w-full">
              <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="password" name="matKhau" size="large" placeholder="Nhập mật khẩu mới" prefix={<LockOutlined />} />
            </div>
            <div className="text-danger h-5">{errors.matKhau}</div>

            <div className="mt-3 w-full" >
              <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="email" size="large" value={values.email} placeholder="Email" prefix={<MailOutlined />} />
            </div>
            <div className="text-danger h-5 text-left">{errors.email}</div>

            <div className="editBtn mt-7">
              <NavLink to="/login"><i className="fa fa-long-arrow-alt-left"></i> Go Back</NavLink>
              <Button className='mx-3' onClick={handleSubmit}>Lưu</Button>

              <Button onClick={() => {
                dispatch({type: SHOW_LOADING});
                history.push('/admin/users')
                setTimeout(() => {
                  dispatch({type: HIDE_LOADING});
                }, 300)
              }}>Cancel</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

const EditUserFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return { ...props.accountUser, maNhom: GROUP }
  },
  validationSchema: (props) => Yup.object().shape({
    taiKhoan: Yup.string().required('Tài khoản is required'),
    hoTen: Yup.string().required('Name is required!'),
    soDt: Yup.string().required('Phone number is required!').matches(regExPhone, 'The phone number has wrong format').max(10, '10 digits'),
    matKhau: Yup.string().min(6, 'Password must have min 6 characters').max(32, 'Password  have max 32 characters'),
    matKhauCu: Yup.string().required('Old password is required').oneOf([props.accountUser.matKhau, null], 'Passwords must match'),
    email: Yup.string().required('Email is required!').email('Email is invalid!')
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(editUserAction(values));
  },
  validateOnBlur: false,
  displayName: 'EditUserFormik',
})(UserEdit);

const mapStateToProps = (state) => {
  return {
    accountUser: state.UserManageReducer.accountUser,
    listTypeOfUser: state.UserManageReducer.listTypeOfUser
  }
}

export default connect(mapStateToProps)(EditUserFormik);