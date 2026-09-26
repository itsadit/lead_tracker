// src/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getLeads = async (search?: string) => {
  const response = await api.get("/leads", {
    params: search ? { search } : {},
  });
  return response.data;
};

export const createLead = async (leadData: {
  name: string;
  email: string;
  phone: string;
  status?: string;
}) => {
  const response = await api.post("/leads", leadData);
  return response.data;
};

export const updateLeadStatus = async (id: string, status: string) => {
  const response = await api.patch(`/leads/${id}/status`, { status });
  return response.data;
};

export default api;
