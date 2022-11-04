import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { USER_LOGIN } from "../../utils/config";
import AccountDisplay from "../../components/AccountDisplay/AccountDisplay";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const AdminTemplate = (props) => { //path, exact, Component

  const { Component, ...restProps } = props;
  const { userLogin } = useSelector(state => state.UserManageReducer);
  const { selectedKeys } = useSelector(state => state.AdminTemplateReducer);
  let [ stateSelectedKeys, setStateSelectedKeys ] = useState(selectedKeys);
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  useEffect(()=>{
    setStateSelectedKeys(selectedKeys)
  }, [selectedKeys])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  if (!localStorage.getItem(USER_LOGIN)) {
    alert('Bạn không có quyền truy cập vào trang này !')
    return <Redirect to='/' />
  }

  if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
    alert('Bạn không có quyền truy cập vào trang này !')
    return <Redirect to='/' />
  }

  return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match
    return <Fragment>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo mt-3 ml-4 w-9">
            <img className="" src="https://movie-booking-project.vercel.app/img/headTixLogo.png" alt="logo" />
          </div>
          <Menu theme="dark" selectedKeys={stateSelectedKeys} mode="inline">
            <Menu.Item key="/admin/users" icon={<UserOutlined />}>
              <NavLink to="/admin/users" onClick={() => setStateSelectedKeys('/admin/users')}>Users</NavLink>
            </Menu.Item>
            <SubMenu key="Films" icon={<FileOutlined />} title="Films">
              <Menu.Item key="/admin/films" icon={<FileOutlined />}>
                <NavLink to="/admin/films" onClick={() => setStateSelectedKeys('/admin/films')}>Films</NavLink>
              </Menu.Item>
              <Menu.Item key="/admin/films/addnew" icon={<FileOutlined />}>
                <NavLink to="/admin/films/addnew" onClick={() => setStateSelectedKeys('/admin/films/addnew')}>Add new</NavLink>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="/admin/showtimes" icon={<DesktopOutlined />}>
              <NavLink to="/admin/users" onClick={() => setStateSelectedKeys('/admin/users')} className="hover:cursor-not-allowed">Showtime</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="bg-white" style={{ padding: 0 }} >
            <div className="flex justify-between pr-5">
            <NavLink to="/" className='ml-5 font-medium hover:text-red-500 duration-300'>Client side</NavLink>
              <AccountDisplay />
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: '50vh' }}>
              <Component {...propsRoute} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  }} />
}

export default AdminTemplate;