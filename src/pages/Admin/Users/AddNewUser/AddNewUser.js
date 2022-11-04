import React, { useEffect } from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import { connect, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withFormik } from 'formik';
import { GROUP, regExPhone } from '../../../../utils/config';
import { addNewUserAction, editUserAction, getListTyeOfUserAction } from '../../../../redux/actions/UserManageAction';
import { HIDE_LOADING, SHOW_LOADING } from '../../../../redux/types/Type';
import { history } from '../../../..';

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
    <>
      <h3 className="text-4xl">Thêm người dùng mới</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="container" style={{ height: window.innerHeight }} >
        <div className="flex justify-around align-items-start w-4/5 mx-auto" style={{ height: '100%' }} >
          <div className="item-right" style={{ minWidth: '40%' }}>
            <div className="d-flex mt-3 w-full" >
              <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="taiKhoan" size="large" placeholder="Tài khoản" prefix={<UserOutlined />} />
            </div>
            <div className="text-danger h-5">{errors.taiKhoan}</div>

            <div className="mt-3 w-full" >
              <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="hoTen" size="large" placeholder="Họ tên" prefix={<UserOutlined />} />
            </div>
            <div className="text-danger h-5">{errors.hoTen}</div>

            <div className="mt-3 w-full">
              <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="phoneNumber" name="soDt" size="large" placeholder="Số điện thoại" prefix={<PhoneOutlined />} />
            </div>
            <div className="text-danger h-5">{errors.soDt}</div>

            <select className="mt-3 w-full form-control" name='maLoaiNguoiDung' onChange={handleChange}>
              {handleSelection()}
            </select>
            <div className="text-danger h-5">{errors.maLoaiNguoiDung}</div>

          </div>

          <div className="item-left" style={{ minWidth: '40%' }}>
            <div className="mt-3 w-full">
              <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="password" name="matKhau" size="large" placeholder="Nhập mật khẩu" prefix={<LockOutlined />} />
            </div>
            <div className="text-danger h-5">{errors.matKhau}</div>

            <div className="mt-3 w-full">
              <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="password" name="matKhauConfirm" size="large" placeholder="Nhập lại mật khẩu để xác nhận" prefix={<LockOutlined />} />
            </div>
            <div className="text-danger h-5">{errors.matKhauConfirm}</div>

            <div className="mt-3 w-full" >
              <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="email" size="large" placeholder="Email" prefix={<MailOutlined />} />
            </div>
            <div className="text-danger h-5 text-left">{errors.email}</div>

            <div className="editBtn mt-7">
              <NavLink to="/admin/users"><i className="fa fa-long-arrow-alt-left"></i> Go Back</NavLink>
              <Button className='mx-3' onClick={handleSubmit}>Submit</Button>

              <Button onClick={() => {
                dispatch({ type: SHOW_LOADING });
                history.push('/admin/users')
                setTimeout(() => {
                  dispatch({ type: HIDE_LOADING });
                }, 300)
              }}>Cancel</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

const AddNewUserFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return { ...props.accountUser, maNhom: GROUP }
  },
  validationSchema: (props) => Yup.object().shape({
    taiKhoan: Yup.string().required('Tài khoản is required'),
    hoTen: Yup.string().required('Name is required!'),
    soDt: Yup.string().required('Phone number is required!').matches(regExPhone, 'The phone number has wrong format').max(10, '10 digits'),
    matKhau: Yup.string().required().min(6, 'Password must have min 6 characters').max(32, 'Password  have max 32 characters'),
    matKhauConfirm: Yup.string().required().required('Old password is required').oneOf([Yup.ref('matKhau'), null], 'Passwords must match'),
    email: Yup.string().required('Email is required!').email('Email is invalid!')
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(values)
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