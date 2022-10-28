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


export default function App() {
  return (
      <Switch>
        <HomeTemplate path="/" exact Component={Home} />;
        <HomeTemplate path="/home" exact Component={Home} />;
        <HomeTemplate path='/contact' exact Component={Contact}/>;
        <HomeTemplate path='/news' exact Component={News}/>;
        <HomeTemplate path='/apps' exact Component={Apply}/>;
        <HomeTemplate path='/detail/:id' exact Component={Detail}/>;
        <Route path='/login' exact component={Login}/>;
        <Route path='/register' exact component={Register}/>;
      </Switch>
  )
}

