import axios from "axios";
import { getEnvVariables } from '../helpers/';

const {VITE_APP_BASE_URL} = getEnvVariables();

const chatApi = axios.create({
  baseURL: VITE_APP_BASE_URL
});


// Interceptores

chatApi.interceptors.request.use(config => {

  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token') || ''
  }

  return config;
})

export default chatApi;

