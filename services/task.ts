import { api } from "@/lib/api";

export interface CreateTaskData {
  leadId: string;
  title: string;
  description?: string;
  type?: string;
  priority?: "low" | "medium" | "high";
  dueAt?: string;
  assignedTo?: string;
}

export const taskService = {
  // 1. Naya Task create karna - URL based workspaceId
  createTask: async (workspaceId: string, data: CreateTaskData) => {
    const response = await api.post(`/tasks/workspaces/${workspaceId}`, data);
    return response.data;
  },

  // 2. Tasks fetch karna (Filters ke saath)
  getTasks: async (workspaceId: string, params?: any) => {
    const response = await api.get(`/tasks/workspaces/${workspaceId}`, {
      params,
    });
    return response.data;
  },

  // 3. Task update karna
  updateTask: async (workspaceId: string, taskId: string, data: any) => {
    const response = await api.patch(`/tasks/workspaces/${workspaceId}/${taskId}`, data);
    return response.data;
  },

  // 4. Task delete karna
  deleteTask: async (workspaceId: string, taskId: string) => {
    const response = await api.delete(`/tasks/workspaces/${workspaceId}/${taskId}`);
    return response.data;
  },
};