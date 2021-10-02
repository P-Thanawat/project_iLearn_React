import axios from 'axios'
import { getToken, removeToken } from '../services/localStorage'
import { API_URL } from './env'

axios.defaults.baseURL = API_URL

//? Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.authorization = 'Bearer ' + getToken();
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//? Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response && error.response.status === 401) { //? expire token
    removeToken();
    window.location.reload();
  }
  return Promise.reject(error);
});

export default axios