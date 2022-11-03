import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Button, Table } from 'antd';
import { Input } from 'antd';
import { EditOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../..';
import { deleteUserAction, getListUserAction } from '../../../redux/actions/UserManageAction';
import { GET_ACCOUNT_USER_DETAIL } from '../../../redux/types/Type';
const { Search } = Input;

export default function Films() {

  const dispatch = useDispatch();
  let [searchText, setSearchText] = useState('');
  const refOnsearchChange = useRef(null);
  const { listUsers } = useSelector(state => state.UserManageReducer);
  
  let dataTable = listUsers;
  dataTable = dataTable.map((item, index) => {
    return {...item, stt: index}
  })

  useEffect(() => {
    dispatch(getListUserAction());
  }, [])

  const columns = [
    {
      key: 'stt',
      title: 'STT',
      dataIndex: 'stt',
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend', 'ascend'],
      width: '8%',
      // sortOrder:'descend'
    },
    {
      key: 'taiKhoan',
      title: 'Tài Khoản',
      dataIndex: 'taiKhoan',
    },
    {
      key: 'hoTen',
      title: 'Họ Tên',
      dataIndex: 'hoTen',
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: 'soDt',
      title: 'Số điện thoại',
      dataIndex: 'soDt',
    },
    {
      key: 'hanhDong',
      title: 'Hành động',
      render: (text, record) => {
        return <Fragment>
          {/* Edit user */}
          <NavLink key={1} className=" mr-2  text-2xl" to={`/admin/users/edit`}><EditOutlined style={{ color: 'blue' }} onClick={()=>{
            dispatch({
              type: GET_ACCOUNT_USER_DETAIL,
              accountUser: record
            })
          }}/></NavLink>

          {/* Delete user */}
          <span style={{ cursor: 'pointer' }} key={2} className="text-2xl" onClick={() => {
            if (window.confirm('Bạn có chắc muốn xoá tài khoản ' + record.taiKhoan)) {
              dispatch(deleteUserAction(record.taiKhoan, searchText))
            }
          }}><DeleteOutlined style={{ color: 'red' }} /></span>
        </Fragment>
      },
      sortDirections: ['descend', 'ascend'],
      width: '15%'
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    // console.log('params', pagination, filters, sorter, extra);
  }
  
  const onSearchChange = (e) => {
    refOnsearchChange.current && clearTimeout(refOnsearchChange.current);

    refOnsearchChange.current = setTimeout(() => {
      setSearchText(e.target.value);
      dispatch(getListUserAction(e.target.value));
    }, 300)
  }

  const handleSearch = (value) => {
    dispatch(getListUserAction(value));
  }

  return (
    <div>
      <h3 className="text-4xl">Quản lý người dùng</h3>
      <Button className="mb-5" onClick={() => {
        // history.push('/admin/films/addnew');
      }}>Thêm người dùng</Button>
      <Search
        className="mb-5"
        placeholder="Nhập vào tài khoản hoặc họ tên người dùng"
        enterButton={<SearchOutlined />}
        size="large"
        onChange={onSearchChange}
        onSearch={handleSearch}
      />
      <Table columns={columns} dataSource={dataTable} onChange={onChange} rowKey={'stt'} />
    </div>
  )
}
