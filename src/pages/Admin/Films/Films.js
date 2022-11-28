import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Button, Table, Input } from 'antd';
import { deleteFilms, getListFilmsAction } from '../../../redux/actions/FilmMangeAction'
import { EditOutlined, SearchOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../..';
import { CHANGE_TAB_ACTIVE_ADMIN_TEMPLATE } from '../../../redux/types/Type';
import './Films.scss';
const { Search } = Input;

export default function Films() {

    const dispatch = useDispatch();
    let [searchText, setSearchText] = useState('');
    const refOnsearchChange = useRef(null);
    const { listFilmAll } = useSelector(state => state.FilmManageReducer);

    const dataTable = listFilmAll;

    useEffect(() => {
        dispatch(getListFilmsAction());
        dispatch({type: CHANGE_TAB_ACTIVE_ADMIN_TEMPLATE, selectedKeys: '/admin/films'});
    }, [])

    const columns = [
        {
            key: 'maPhim',
            title: 'Mã phim',
            dataIndex: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend', 'ascend'],
            width: '15%',
        },
        {
            key: 'hinhAnh',
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: (text, film, index) => {
                return <Fragment>
                    <img src={film.hinhAnh} alt={film.tenPhim} style={{width: '3rem', height: '3rem', margin: '0 auto'}}/>
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
        <div className='bk-adminFilms'>
            <h3 className="admin-films--title text-4xl">Quản lý Phim</h3>
            <Button className="admin-button--addFilm mb-5" onClick={() => {
                history.push('/admin/films/addnew');
                dispatch({type: CHANGE_TAB_ACTIVE_ADMIN_TEMPLATE, selectedKeys: '/admin/films/addnew'})
            }}>Thêm phim</Button>
            <Search
                className="admin-films--search mb-5"
                placeholder="input search text"
                enterButton={<SearchOutlined />}
                size="large"
                onChange={onSearchChange}
                onSearch={handleSearch}
            />
            <Table className='admin-film--table' columns={columns} dataSource={dataTable} onChange={onChange} rowKey={'maPhim'} />
        </div>
    )
}
