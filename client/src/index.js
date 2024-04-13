import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import axios from 'axios';
// const baseURL = 'http://localhost:20000/api/'
const baseURL = 'https://securitytool.handsintechnology.in/api/'

axios.defaults.baseURL = baseURL
axios.interceptors.response.use(response => {
  return response.data;
},
  error => {
    console.log(error.response)
    return Promise.reject(error);
   
  }
);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider >
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);

