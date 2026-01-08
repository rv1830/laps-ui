import {api} from "@/lib/api";

export const leadService = {
  // Saare leads fetch karna (Pagination & Filters)
  getLeads: async (workspaceId: string, params?: { page?: number; search?: string; stageId?: string }) => {
    const response = await api.get(`/leads/workspaces/${workspaceId}`, { params });
    return response.data; // Includes leads and pagination info
  },

  // Single lead fetch karna with activities
  getLeadDetails: async (workspaceId: string, leadId: string) => {
    const response = await api.get(`/leads/workspaces/${workspaceId}/${leadId}`);
    return response.data;
  },

  // Naya lead manually create karna
  createLead: async (workspaceId: string, leadData: any) => {
    const response = await api.post(`/leads/workspaces/${workspaceId}`, leadData);
    return response.data;
  },

  // Lead update karna (Stage change ya info update)
  updateLead: async (workspaceId: string, leadId: string, updates: any) => {
    const response = await api.patch(`/leads/workspaces/${workspaceId}/${leadId}`, updates);
    return response.data;
  },

  // Bulk Import (JSON/CSV logic backend pe hai)
  importLeads: async (workspaceId: string, leads: any[]) => {
    const response = await api.post(`/leads/workspaces/${workspaceId}/import`, { leads });
    return response.data;
  }
};