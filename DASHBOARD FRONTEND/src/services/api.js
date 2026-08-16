import axios from 'axios';

// Base Axios instance configured for future Node.js/Express + JWT integration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.tensora.com/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    try {
      const authData = localStorage.getItem('tensora_auth_v1');
      if (authData) {
        const { token } = JSON.parse(authData);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Network communication error';
    return Promise.reject(new Error(message));
  }
);

export default api;
