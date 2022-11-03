import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Button, Table } from 'antd';
import { Input } from 'antd';
import { EditOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../..';
import { getListUserAction } from '../../../redux/actions/UserManageAction';
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
  console.log("dataTable", dataTable);


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
          {/* Edit film */}
          <NavLink key={1} className=" mr-2  text-2xl" to={`/admin/users/edit/1`}><EditOutlined style={{ color: 'blue' }} /></NavLink>

          {/* Delete film */}
          <span style={{ cursor: 'pointer' }} key={2} className="text-2xl" onClick={() => {
            if (window.confirm('Bạn có chắc muốn xoá phim ' + record.tenPhim)) {
              // action delete code 
            }
          }}><DeleteOutlined style={{ color: 'red' }} /></span>
        </Fragment>
      },
      sortDirections: ['descend', 'ascend'],
      width: '15%'
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }
  console.log("data")
  const onSearchChange = (e) => {
    refOnsearchChange.current && clearTimeout(refOnsearchChange.current);

    refOnsearchChange.current = setTimeout(() => {
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
