import { api } from '@/lib/api';

export const authService = {
  register: async (data: any) => {
    const response = await api.post('/register', data);
    return response.data;
  },

  login: async (data: any) => {
    const response = await api.post('/login', data);
    return response.data;
  },

  checkStatus: async () => {
    const response = await api.get('/check-status');
    return response.data;
  },

  setupProfile: async (data: any) => {
    const response = await api.post('/setup-profile', data);
    return response.data;
  }
};