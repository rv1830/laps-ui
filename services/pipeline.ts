import {api} from "@/lib/api";

export const pipelineService = {
  // Board ke columns (Stages) fetch karna
  getStages: async (workspaceId: string) => {
    const response = await api.get(`/pipeline/workspaces/${workspaceId}/stages`);
    return response.data; // Sorted by 'order'
  },

  // Naya column add karna
  createStage: async (workspaceId: string, stageData: { name: string; color?: string; order?: number }) => {
    const response = await api.post(`/pipeline/workspaces/${workspaceId}/stages`, stageData);
    return response.data;
  },

  // Stage rename ya reorder karna
  updateStage: async (workspaceId: string, stageId: string, updates: any) => {
    const response = await api.patch(`/pipeline/workspaces/${workspaceId}/stages/${stageId}`, updates);
    return response.data;
  },

  // Stage delete karna
  deleteStage: async (workspaceId: string, stageId: string) => {
    const response = await api.delete(`/pipeline/workspaces/${workspaceId}/stages/${stageId}`);
    return response.data;
  }
};