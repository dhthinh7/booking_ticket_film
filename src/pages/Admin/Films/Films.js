import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Button, Table } from 'antd';
import { deleteFilms, getListFilmsAction } from '../../../redux/actions/FilmMangeAction'
import { Input } from 'antd';
import { EditOutlined, SearchOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../..';
const { Search } = Input;

export default function Films() {

    const dispatch = useDispatch();
    let [searchText, setSearchText] = useState('');
    const refOnsearchChange = useRef(null);
    const { listFilms } = useSelector(state => state.FilmManageReducer);

    const dataTable = listFilms;

    useEffect(() => {
        dispatch(getListFilmsAction());
    }, [])

    const columns = [
        {
            key: 'maPhim',
            title: 'Mã phim',
            dataIndex: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend', 'ascend'],
            width: '15%'
            // sortOrder:'descend'
        },
        {
            key: 'hinhAnh',
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: (text, film, index) => {
                return <Fragment>
                    <img src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50` }} />
                </Fragment>
            },
            width: '15%'
        },
        {
            key: 'tenPhim',
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if (tenPhimA > tenPhimB) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['descend', 'ascend'],
            width: '25%'
        },
        {
            key: 'moTa',
            title: 'Mô tả',
            dataIndex: 'moTa',
            render: (text, film) => {
                return <Fragment>
                    {film.moTa.length > 50 ? film.moTa.substr(0, 50) + ' ...' : film.moTa}
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
            width: '25%'
        },
        {
            key: 'hanhDong',
            title: 'Hành động',
            render: (text, film) => {
                return <Fragment>
                    {/* Edit film */}
                    <NavLink key={1} className=" mr-2  text-2xl" to={`/admin/films/edit/${film.maPhim}`}><EditOutlined style={{ color: 'blue' }} /></NavLink>

                    {/* Delete film */}
                    <span style={{ cursor: 'pointer' }} key={2} className="text-2xl" onClick={() => {
                        if (window.confirm('Bạn có chắc muốn xoá phim ' + film.tenPhim)) {
                            dispatch(deleteFilms(film.maPhim, searchText));
                        }
                    }}><DeleteOutlined style={{ color: 'red' }} /></span>

                    {/* Showtime */}
                    <NavLink key={3} className=" mr-2 text-2xl" to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} onClick={() => {
                        localStorage.setItem('filmParams', JSON.stringify(film));
                    }}><CalendarOutlined style={{ color: 'green' }} /></NavLink>
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
            width: '25%'
        },
    ];

    function onChange(pagination, filters, sorter, extra) {
        // console.log('params', pagination, filters, sorter, extra);
    }

    const onSearchChange = (e) => {
        refOnsearchChange.current && clearTimeout(refOnsearchChange.current);

        refOnsearchChange.current = setTimeout(() => {
            setSearchText(e.target.value)
            dispatch(getListFilmsAction(e.target.value));
        }, 1000)
    }

    const handleSearch = (value) => {
        dispatch(getListFilmsAction(value));
    }

    return (
        <div>
            <h3 className="text-4xl">Quản lý Phim</h3>
            <Button className="mb-5" onClick={() => {
                history.push('/admin/films/addnew');
            }}>Thêm phim</Button>
            <Search
                className="mb-5"
                placeholder="input search text"
                enterButton={<SearchOutlined />}
                size="large"
                onChange={onSearchChange}
                onSearch={handleSearch}
            />
            <Table columns={columns} dataSource={dataTable} onChange={onChange} rowKey={'maPhim'} />
        </div>
    )
}
