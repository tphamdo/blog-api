import axios from 'axios';

const api = axios.create();

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    console.log("here inside interceptor");
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api
