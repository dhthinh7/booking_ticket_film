import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../src/assets/circle.scss';
import App from './App';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';
import { store } from './redux/configStore';

// Import signalR as websocket io
import * as signalR from '@aspnet/signalr';

// Create connection to listen event from server
export const connection = new signalR.HubConnectionBuilder().withUrl(`https://movieapi.cyberlearn.vn/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();

export const history = createBrowserHistory()

connection.start().then(() => {
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
  console.log(error)
})
