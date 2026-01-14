import { api } from "@/lib/api";

export const acceleratorService = {
  // Baki services ki tarah workspaceId ko URL mein pass karo
  save: async (workspaceId: string, data: any) => {
    const response = await api.post(`/accelerator/workspaces/${workspaceId}`, data);
    return response.data;
  },

  // Public data (Slug based) - Isme workspaceId ki zaroorat nahi hoti
  getPublicData: async (slug: string) => {
    const response = await api.get(`/accelerator/p/${slug}`);
    return response.data;
  },

  // Public lead submit
  submitLead: async (slug: string, submissionData: any) => {
    const response = await api.post(`/accelerator/p/${slug}/submit`, submissionData);
    return response.data;
  }
};