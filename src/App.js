import { Switch } from "react-router-dom";
// React-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Ant-design
import 'antd/dist/antd.css';
import HomeTemplate from "./templates/HomeTemplate";
import Contact from "./templates/Layout/Contact/Contact";
import News from "./templates/Layout/News/News";
import Apply from "./templates/Layout/Apps/Apply";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import { Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Checkout from "./pages/Checkout/Checkout";
import Loading from "./components/Loading/Loading";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Films from "./pages/Admin/Films/Films";
import EditFilm from "./pages/Admin/EditFilm/EditFilm";
import ShowTime from "./pages/Admin/ShowTime/ShowTime";
import AddFilm from "./pages/Admin/Films/AddFilm/AddFilm";
import Users from "./pages/Admin/Users/Users";
import UserEdit from "./pages/Admin/Users/UserEdit/UserEdit";

export default function App() {
  return (
    <div className="App">
      <Loading />
      <Switch>
        <Route path='/checkout/:id' exact component={Checkout} />;
        <Route path='/login' exact component={Login} />;
        <Route path='/register' exact component={Register} />;
        <HomeTemplate path="/" exact Component={Home} />;
        <HomeTemplate path="/home" exact Component={Home} />;
        <HomeTemplate path='/contact' exact Component={Contact} />;
        <HomeTemplate path='/news' exact Component={News} />;
        <HomeTemplate path='/apps' exact Component={Apply} />;
        <HomeTemplate path='/detail/:id' exact Component={Detail} />;
        <AdminTemplate path='/admin' exact Component={Users}/>;
        <AdminTemplate path='/admin/films' exact Component={Films}/>;
        <AdminTemplate path='/admin/films/edit/:id' exact Component={EditFilm}/>;
        <AdminTemplate path='/admin/films/showtime/:id/:name' exact Component={ShowTime}/>;
        <AdminTemplate path='/admin/films/addnew' exact Component={AddFilm}/>;
        <AdminTemplate path='/admin/users' exact Component={Users}/>;
        <AdminTemplate path='/admin/users/edit' exact Component={UserEdit}/>;
      </Switch>
    </div>
  )
}

