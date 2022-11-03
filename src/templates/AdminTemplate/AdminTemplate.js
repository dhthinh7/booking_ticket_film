import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { history } from "../..";
import { TOKEN, USER_LOGIN } from "../../utils/config";
import AccountDisplay from "../../components/AccountDisplay/AccountDisplay";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



const AdminTemplate = (props) => { //path, exact, Component

  const { Component, ...restProps } = props;
  const { userLogin } = useSelector(state => state.UserManageReducer);

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

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
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
              <NavLink to="/admin/users">Users</NavLink>
            </Menu.Item>
            <SubMenu key="sub1" icon={<FileOutlined />} title="Films">
              <Menu.Item key="10" icon={<FileOutlined />}>
                <NavLink to="/admin/films">Films</NavLink>
              </Menu.Item>
              <Menu.Item key="11" icon={<FileOutlined />}>
                <NavLink to="/admin/films/addnew">Add new</NavLink>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="3" icon={<DesktopOutlined />}>
              <NavLink to="/admin/showtimes">Showtime</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="bg-white" style={{ padding: 0 }} >
            <div className="flex justify-end pr-5">
              <AccountDisplay />
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: '50vh' }}>
              <Component {...propsRoute} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Fragment>
  }} />

}


export default AdminTemplate;