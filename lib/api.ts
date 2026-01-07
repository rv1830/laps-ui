import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Backend port
  withCredentials: true, // Zaroori hai cookies send/receive karne ke liye
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor: Agar 401 (Unauthorized) aaye toh login pe bhejne ke liye
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // localStorage.clear(); 
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);