import {api} from "@/lib/api";

export const integrationService = {
  // OAuth URL mangwana (Redirect user to HubSpot)
  getHubSpotAuthUrl: async (workspaceId: string) => {
    const response = await api.get(`/integrations/workspaces/${workspaceId}/hubspot/auth`);
    return response.data; // { url: '...' }
  },

  // HubSpot se direct contacts import trigger karna
  importHubSpotContacts: async (workspaceId: string) => {
    const response = await api.post(`/integrations/workspaces/${workspaceId}/hubspot/import`);
    return response.data;
  }
};