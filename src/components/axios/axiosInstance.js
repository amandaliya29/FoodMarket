import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.3:8000/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default axiosInstance;
