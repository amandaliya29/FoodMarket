import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:
    'https://a7d1-2402-a00-162-da1f-9d5e-ae0b-8efa-9ac8.ngrok-free.app/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const requestHandler = async request => {
  let idToken;
  const userDetails = await AsyncStorage.getItem('userDetails');
  if (userDetails) {
    const parsedDetails = JSON.parse(userDetails);
    idToken = parsedDetails.data.token;
  }
  request.headers.Authorization = 'Bearer ' + idToken;
  return request;
};

const responseHandler = response => {
  if (response.status == 401) {
    AsyncStorage.removeItem('userDetails');
  }
  return response;
};

const errorHandler = error => {
  if (error.response && error.response.status == 401) {
    AsyncStorage.removeItem('userDetails');
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(
  request => requestHandler(request),
  error => errorHandler(error),
);

axiosInstance.interceptors.response.use(
  response => responseHandler(response),
  error => errorHandler(error),
);
export default axiosInstance;
