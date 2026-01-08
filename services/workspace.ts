import { api } from '@/lib/api';

export const workspaceService = {
  getWorkspace: async (id: string) => {
    const response = await api.get(`/workspaces/${id}`);
    return response.data;
  },
  updateWorkspace: async (id: string, data: any) => {
    const response = await api.patch(`/workspaces/${id}`, data);
    return response.data;
  },
  deleteWorkspace: async (id: string) => {
    const response = await api.delete(`/workspaces/${id}`);
    return response.data;
  }
};