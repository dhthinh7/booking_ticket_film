import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../src/assets/circle.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';
import { store } from './redux/configStore';

// Import signalR as websocket io
import * as signalR from '@aspnet/signalr';
import { DOMAIN } from './utils/config';

// Create connection to listen event from server
export const connection = new signalR.HubConnectionBuilder().withUrl(`https://movieapi.cyberlearn.vn/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();

export const history = createBrowserHistory()

connection.start().then(()=>{
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>  
      <Router history={history}>
          <App />
      </Router>
    </Provider>,
    // document.getElementById('root')
  );
}).catch(error => {
  // console.log("error socket", error);
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
